const { AddBookPayloadSchema, EditBookPayloadSchema } = require('./schema')

const BooksValidator = {
  validateAddBookPayload: (payload) => {
    const validationResult = AddBookPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new Error(validationResult.error.message)
    }
  },
  validateEditBookPayload: (payload) => {
    const validationResultEdit = EditBookPayloadSchema.validate(payload)
    if (validationResultEdit.error) {
      throw new Error(validationResultEdit.error.message)
    }
  }
}

module.exports = BooksValidator
