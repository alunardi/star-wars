const mongoose = require('mongoose')

require('dotenv').config()

mongoose.Promise = global.Promise
let mongoDB = process.env.MONGODB_URI

mongoose.connect(mongoDB, {useNewUrlParser: true})
mongoose.set('useFindAndModify', false)
mongoose.connection
    .once('open', () => console.log('Conectado!'))
    .on('error', (error) => {
        console.warn('Erro : ', error)
    })

beforeEach((done) => {
    mongoose.connection.collections.planets.drop(() => {
        done()
    })
})
