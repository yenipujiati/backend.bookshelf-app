class BooksHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.addBookHandler = this.addBookHandler.bind(this)
    this.getAllBooksHandler = this.getAllBooksHandler.bind(this)
    this.getBookByIdHandler = this.getBookByIdHandler.bind(this)
    this.editBookByIdHandler = this.editBookByIdHandler.bind(this)
    this.deleteBookByIdHandler = this.deleteBookByIdHandler.bind(this)
  }

  addBookHandler (request, h) {
    try {
      this._validator.validateAddBookPayload(request.payload)
      const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
      // const bookId = this._service.addBook({ name, year, author, summary, publisher, pageCount, readPage, reading })

      if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
      } else {
        const bookId = this._service.addBook({ name, year, author, summary, publisher, pageCount, readPage, reading })
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId
          }
        })
        response.code(201)
        return response
      }
    } catch (e) {
      const response = h.response({
        status: 'fail',
        message: e.message
      })
      response.code(400)
      return response
    }
  }

  getAllBooksHandler () {
    const books = this._service.getBook()
    return {
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }))
      }
    }
  }

  getBookByIdHandler (request, h) {
    try {
      const { id } = request.params
      const book = this._service.getBookById(id)
      return {
        status: 'success',
        data: {
          book
        }
      }
    } catch (e) {
      const response = h.response({
        status: 'fail',
        message: e.message
      })
      response.code(404)
      return response
    }
  }

  editBookByIdHandler (request, h) {
    try {
      this._validator.validateEditBookPayload(request.payload)
      const { id } = request.params
      const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
      this._service.editBookById(id, { name, year, author, summary, publisher, pageCount, readPage, reading })

      if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
      } else {
        return {
          status: 'success',
          message: 'Buku berhasil diperbarui'
        }
      }
    } catch (e) {
      const response = h.response({
        status: 'fail',
        message: e.message
      })
      if (e.message === 'Gagal memperbarui buku. Id tidak ditemukan') {
        response.code(404)
      } else {
        response.code(400)
      }
      return response
    }
  }

  deleteBookByIdHandler (request, h) {
    try {
      const { id } = request.params
      this._service.deleteBookById(id)
      return {
        status: 'success',
        message: 'Buku berhasil dihapus'
      }
    } catch (e) {
      const response = h.response({
        status: 'fail',
        message: e.message
      })
      response.code(404)
      return response
    }
  }
}

module.exports = BooksHandler
