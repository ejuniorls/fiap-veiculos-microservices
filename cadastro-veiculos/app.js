const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const veiculosRouter = require('./routes/veiculos');
const messageService = require('./services/messageService');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/api/veiculos', veiculosRouter);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB (Cadastro)'))
    .catch(err => console.error('Erro MongoDB:', err));

// Conexão com RabbitMQ
messageService.connect().catch(console.error);

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
        service: 'cadastro-veiculos',
        timestamp: new Date()
    });
});

module.exports = app;