const Joi = require('joi');

const veiculoSchema = Joi.object({
    marca: Joi.string()
        .required()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'Marca é obrigatória',
            'string.min': 'Marca deve ter pelo menos 2 caracteres',
            'string.max': 'Marca deve ter no máximo 50 caracteres'
        }),

    modelo: Joi.string()
        .required()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'Modelo é obrigatório',
            'string.min': 'Modelo deve ter pelo menos 2 caracteres',
            'string.max': 'Modelo deve ter no máximo 50 caracteres'
        }),

    ano: Joi.number()
        .integer()
        .required()
        .min(1900)
        .max(new Date().getFullYear() + 1)
        .messages({
            'number.base': 'Ano deve ser um número',
            'number.min': 'Ano mínimo é 1900',
            'number.max': 'Ano não pode ser futuro',
            'any.required': 'Ano é obrigatório'
        }),

    cor: Joi.string()
        .required()
        .min(3)
        .max(30)
        .messages({
            'string.empty': 'Cor é obrigatória',
            'string.min': 'Cor deve ter pelo menos 3 caracteres',
            'string.max': 'Cor deve ter no máximo 30 caracteres'
        }),

    preco: Joi.number()
        .required()
        .min(0)
        .positive()
        .messages({
            'number.base': 'Preço deve ser um número',
            'number.min': 'Preço não pode ser negativo',
            'any.required': 'Preço é obrigatório'
        }),

    placa: Joi.string()
        .required()
        .pattern(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/)
        .uppercase()
        .messages({
            'string.empty': 'Placa é obrigatória',
            'string.pattern.base': 'Placa inválida (formato: ABC1D23)',
            'any.required': 'Placa é obrigatória'
        })
});

const validateVeiculo = (data) => {
    return veiculoSchema.validate(data, { abortEarly: false });
};

module.exports = { validateVeiculo };