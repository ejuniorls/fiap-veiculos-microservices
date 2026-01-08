const mongoose = require('mongoose');

const veiculoSchema = new mongoose.Schema({
    marca: String,
    modelo: String,
    ano: Number,
    cor: String,
    preco: Number,
    placa: {
        type: String,
        unique: true
    },
    dataCadastro: Date,
    dataRecebimento: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

// Índices para melhor performance nas buscas
veiculoSchema.index({marca: 1});
veiculoSchema.index({ano: 1});
veiculoSchema.index({cor: 1});
veiculoSchema.index({dataCadastro: -1});

module.exports = mongoose.model('Veiculo', veiculoSchema);