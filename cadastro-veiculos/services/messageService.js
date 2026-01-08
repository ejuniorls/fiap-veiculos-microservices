const amqp = require('amqplib');

class MessageService {
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

            console.log('Conectado ao RabbitMQ');
        } catch (error) {
            console.error('Erro ao conectar no RabbitMQ:', error);
            throw error;
        }
    }

    async publish(message) {
        try {
            if (!this.channel) {
                await this.connect();
            }

            const messageBuffer = Buffer.from(JSON.stringify(message));

            this.channel.sendToQueue(this.queueName, messageBuffer, {
                persistent: true
            });

            console.log('Mensagem publicada:', message);
        } catch (error) {
            console.error('Erro ao publicar mensagem:', error);
            throw error;
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

module.exports = new MessageService();