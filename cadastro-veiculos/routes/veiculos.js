const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

/**
 * @swagger
 * /api/veiculos:
 *   post:
 *     summary: Cadastra um novo veículo
 *     tags: [Veículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - marca
 *               - modelo
 *               - ano
 *               - cor
 *               - preco
 *               - placa
 *             properties:
 *               marca:
 *                 type: string
 *                 example: "Toyota"
 *               modelo:
 *                 type: string
 *                 example: "Corolla"
 *               ano:
 *                 type: integer
 *                 example: 2023
 *               cor:
 *                 type: string
 *                 example: "Prata"
 *               preco:
 *                 type: number
 *                 example: 120000
 *               placa:
 *                 type: string
 *                 example: "ABC1D23"
 *     responses:
 *       201:
 *         description: Veículo cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Placa já cadastrada
 */
router.post('/', veiculoController.cadastrar);

/**
 * @swagger
 * /api/veiculos:
 *   get:
 *     summary: Lista todos os veículos cadastrados
 *     tags: [Veículos]
 *     responses:
 *       200:
 *         description: Lista de veículos
 */
router.get('/', veiculoController.listar);

module.exports = router;