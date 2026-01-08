const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const veiculosRouter = require('./routes/veiculos');
const consumerService = require('./services/consumerService');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/api/veiculos', veiculosRouter);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB (Listagem)'))
    .catch(err => console.error('Erro MongoDB:', err));

// Iniciar consumidor
setTimeout(() => {
    consumerService.connect().catch(console.error);
}, 5000); // Aguardar RabbitMQ iniciar

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
    });
});

// Rota de saúde
app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        service: 'listagem-veiculos',
        timestamp: new Date()
    });
});

module.exports = app;