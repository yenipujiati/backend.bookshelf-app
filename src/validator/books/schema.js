const Joi = require('joi')

const AddBookPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Nama harus string',
    'string.empty': 'Gagal menambahkan buku. Mohon isi nama buku',
    'any.required': 'Gagal menambahkan buku. Mohon isi nama buku'
  }),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().required(),
  reading: Joi.boolean().required()
})

const EditBookPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Nama harus string',
    'string.empty': 'Gagal memperbarui buku. Mohon isi nama buku',
    'any.required': 'Gagal memperbarui buku. Mohon isi nama buku'
  }),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().required(),
  reading: Joi.boolean().required()
})

module.exports = { AddBookPayloadSchema, EditBookPayloadSchema }
