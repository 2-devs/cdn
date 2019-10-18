const express = require('express')
const compression = require('compression')
const router = express.Router()
const path = require('path')
const FileServer = require('./controller/FileServer')
const { cache } = require('../../../middlewares/cache')

router.use(compression())
router.use(cache(86400))

router.get('/:file', (req, res) => (new FileServer(req, res)).readFile())

router.get('/:path1/:file', (req, res) => (new FileServer(req, res)).readFile())

router.get('/:path1/:path2/:file', (req, res) => (new FileServer(req, res)).readFile())

router.get('/:path1/:path2/:path3/:file', (req, res) => (new FileServer(req, res)).readFile())

module.exports = app => app.use('/', router)
