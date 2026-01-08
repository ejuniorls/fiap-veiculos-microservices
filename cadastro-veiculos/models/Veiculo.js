const mongoose = require('mongoose');

const veiculoSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: [true, 'Marca é obrigatória'],
        trim: true
    },
    modelo: {
        type: String,
        required: [true, 'Modelo é obrigatório'],
        trim: true
    },
    ano: {
        type: Number,
        required: [true, 'Ano é obrigatório'],
        min: [1900, 'Ano mínimo é 1900'],
        max: [new Date().getFullYear() + 1, 'Ano não pode ser futuro']
    },
    cor: {
        type: String,
        required: [true, 'Cor é obrigatória'],
        trim: true
    },
    preco: {
        type: Number,
        required: [true, 'Preço é obrigatório'],
        min: [0, 'Preço não pode ser negativo']
    },
    placa: {
        type: String,
        required: [true, 'Placa é obrigatória'],
        unique: true,
        uppercase: true,
        trim: true,
        match: [/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida']
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Veiculo', veiculoSchema);