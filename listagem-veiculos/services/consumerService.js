const amqp = require('amqplib');
const Veiculo = require('../models/Veiculo');

class ConsumerService {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.queueName = process.env.QUEUE_NAME || 'veiculos_cadastrados';
    }

    async connect() {
        try {
            const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
            this.connection = await amqp.connect(rabbitmqUrl);
            this.channel = await this.connection.createChannel();

            await this.channel.assertQueue(this.queueName, {
                durable: true
            });

            console.log('Consumidor conectado ao RabbitMQ');

            // Iniciar consumo
            this.consumeMessages();

        } catch (error) {
            console.error('Erro ao conectar consumidor:', error);
            setTimeout(() => this.connect(), 5000); // Tentar reconectar
        }
    }

    async consumeMessages() {
        try {
            console.log('Aguardando mensagens...');

            this.channel.consume(this.queueName, async (message) => {
                if (message !== null) {
                    try {
                        const content = JSON.parse(message.content.toString());

                        if (content.event === 'VEICULO_CADASTRADO') {
                            await this.processarVeiculo(content.data);
                        }

                        // Confirma recebimento da mensagem
                        this.channel.ack(message);

                    } catch (error) {
                        console.error('Erro ao processar mensagem:', error);
                        // Rejeitar mensagem (não reenfileirar)
                        this.channel.nack(message, false, false);
                    }
                }
            });

        } catch (error) {
            console.error('Erro no consumidor:', error);
        }
    }

    async processarVeiculo(veiculoData) {
        try {
            // Verificar se veículo já existe
            const existe = await Veiculo.findOne({placa: veiculoData.placa});

            if (!existe) {
                const veiculo = new Veiculo(veiculoData);
                await veiculo.save();
                console.log('Veículo sincronizado:', veiculoData.placa);
            }
        } catch (error) {
            console.error('Erro ao salvar veículo:', error);
        }
    }

    async close() {
        try {
            if (this.channel) {
                await this.channel.close();
            }
            if (this.connection) {
                await this.connection.close();
            }
        } catch (error) {
            console.error('Erro ao fechar conexão:', error);
        }
    }
}

module.exports = new ConsumerService();