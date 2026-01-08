const Veiculo = require('../models/Veiculo');
const messageService = require('../services/messageService');
const { validateVeiculo } = require('../validators/veiculoValidator');

class VeiculoController {
    async cadastrar(req, res) {
        try {
            // Validação dos dados
            const { error, value } = validateVeiculo(req.body);

            if (error) {
                const errors = error.details.map(detail => detail.message);
                return res.status(400).json({
                    success: false,
                    errors
                });
            }

            // Verificar se placa já existe
            const veiculoExistente = await Veiculo.findOne({ placa: value.placa });

            if (veiculoExistente) {
                return res.status(409).json({
                    success: false,
                    message: 'Já existe um veículo cadastrado com esta placa'
                });
            }

            // Criar veículo
            const veiculo = await Veiculo.create(value);

            // Publicar evento
            await messageService.publish({
                event: 'VEICULO_CADASTRADO',
                data: veiculo.toObject(),
                timestamp: new Date()
            });

            res.status(201).json({
                success: true,
                message: 'Veículo cadastrado com sucesso',
                data: veiculo
            });

        } catch (error) {
            console.error('Erro ao cadastrar veículo:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    async listar(req, res) {
        try {
            const veiculos = await Veiculo.find().sort({ dataCadastro: -1 });

            res.json({
                success: true,
                count: veiculos.length,
                data: veiculos
            });
        } catch (error) {
            console.error('Erro ao listar veículos:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor.'
            });
        }
    }
}

module.exports = new VeiculoController();