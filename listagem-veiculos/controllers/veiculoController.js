const Veiculo = require('../models/Veiculo');

class VeiculoController {
    async listar(req, res) {
        try {
            const {marca, ano, cor, page = 1, limit = 10} = req.query;

            const filtro = {};

            if (marca) {
                filtro.marca = new RegExp(marca, 'i');
            }

            if (ano) {
                filtro.ano = parseInt(ano);
            }

            if (cor) {
                filtro.cor = new RegExp(cor, 'i');
            }

            const pagina = parseInt(page);
            const limite = parseInt(limit);
            const skip = (pagina - 1) * limite;

            const [veiculos, total] = await Promise.all([
                Veiculo.find(filtro)
                    .sort({dataCadastro: -1})
                    .skip(skip)
                    .limit(limite),
                Veiculo.countDocuments(filtro)
            ]);

            res.json({
                success: true,
                count: veiculos.length,
                total,
                page: pagina,
                pages: Math.ceil(total / limite),
                data: veiculos
            });

        } catch (error) {
            console.error('Erro ao listar veículos:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    async buscarPorPlaca(req, res) {
        try {
            const {placa} = req.params;

            const veiculo = await Veiculo.findOne({placa: placa.toUpperCase()});

            if (!veiculo) {
                return res.status(404).json({
                    success: false,
                    message: 'Veículo não encontrado'
                });
            }

            res.json({
                success: true,
                data: veiculo
            });

        } catch (error) {
            console.error('Erro ao buscar veículo:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    async estatisticas(req, res) {
        try {
            const [totalVeiculos, veiculosPorMarca, veiculosPorAno] = await Promise.all([
                Veiculo.countDocuments(),
                Veiculo.aggregate([
                    {$group: {_id: "$marca", total: {$sum: 1}}},
                    {$sort: {total: -1}}
                ]),
                Veiculo.aggregate([
                    {$group: {_id: "$ano", total: {$sum: 1}}},
                    {$sort: {_id: -1}}
                ])
            ]);

            res.json({
                success: true,
                data: {
                    totalVeiculos,
                    veiculosPorMarca,
                    veiculosPorAno
                }
            });

        } catch (error) {
            console.error('Erro ao obter estatísticas:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }
}

module.exports = new VeiculoController();