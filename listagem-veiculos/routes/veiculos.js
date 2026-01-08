const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

/**
 * @swagger
 * /api/veiculos:
 *   get:
 *     summary: Lista veículos com filtros
 *     tags: [Veículos]
 *     parameters:
 *       - in: query
 *         name: marca
 *         schema:
 *           type: string
 *         description: Filtrar por marca
 *       - in: query
 *         name: ano
 *         schema:
 *           type: integer
 *         description: Filtrar por ano
 *       - in: query
 *         name: cor
 *         schema:
 *           type: string
 *         description: Filtrar por cor
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite por página
 *     responses:
 *       200:
 *         description: Lista de veículos
 */
router.get('/', veiculoController.listar);

/**
 * @swagger
 * /api/veiculos/{placa}:
 *   get:
 *     summary: Busca veículo por placa
 *     tags: [Veículos]
 *     parameters:
 *       - in: path
 *         name: placa
 *         required: true
 *         schema:
 *           type: string
 *         description: Placa do veículo
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *       404:
 *         description: Veículo não encontrado
 */
router.get('/:placa', veiculoController.buscarPorPlaca);

/**
 * @swagger
 * /api/veiculos/estatisticas:
 *   get:
 *     summary: Obtém estatísticas dos veículos
 *     tags: [Veículos]
 *     responses:
 *       200:
 *         description: Estatísticas
 */
router.get('/estatisticas/geral', veiculoController.estatisticas);

module.exports = router;