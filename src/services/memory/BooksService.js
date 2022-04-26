const { nanoid } = require('nanoid')

class BooksService {
  constructor () {
    this._books = []
  }

  addBook ({ name, year, author, summary, publisher, pageCount, readPage, reading }) {
    const id = nanoid(16)
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const newBook = {
      id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    }
    this._books.push(newBook)

    const isSuccess = this._books.filter((book) => book.id === id).length > 0
    if (!isSuccess) {
      throw new Error('Buku gagal ditambahkan')
    }
    return id
  }

  getBook () {
    return this._books
  }

  getBookById (id) {
    const book = this._books.filter((n) => n.id === id)[0]
    if (!book) {
      throw new Error('Buku tidak ditemukan')
    }
    return book
  }

  editBookById (id, { name, year, author, summary, publisher, pageCount, readPage, reading }) {
    const index = this._books.findIndex((book) => book.id === id)

    if (index === -1) {
      throw new Error('Gagal memperbarui buku. Id tidak ditemukan')
    }

    const updatedAt = new Date().toISOString()
    this._books[index] = {
      ...this._books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
  }

  deleteBookById (id) {
    const index = this._books.findIndex((book) => book.id === id)

    if (index === -1) {
      throw new Error('Buku gagal dihapus. Id tidak ditemukan')
    }

    this._books.splice(index, 1)
  }
}

module.exports = BooksService
