const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const logger = require('morgan')
const multer = require('multer')
const env = require('./config/env')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./app')(app)

const server = http.createServer(app)
server.listen(env.port, () => {
    console.log('\x1b[32m%s\x1b[0m', '[ Ok ]', `Env: ${env.env}, port: ${env.port}`)
})
