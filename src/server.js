const Hapi = require('@hapi/hapi')

const books = require('./api/books')
const BookService = require('./services/memory/BooksService')
const BooksValidator = require('./validator/books')

const init = async () => {
  const booksService = new BookService()

  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register({
    plugin: books,
    options: {
      service: booksService,
      validator: BooksValidator
    }
  })

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
