const express = require('express')
const router = express.Router()
const upload = require('../../../middlewares/upload')
const Compress = require('../../../middlewares/compress')
const File = require('../../../middlewares/file')
const { images } = require(`../../../config/mimestype`)

router.post('/', upload.single('file'), async (req, res) => {
    let { file } = req
    let { quality, format, size, folder } = req.body
    
    if (file) {
        if (images.find(format => format === file.mimetype)) {
            let buffer = await Compress.compress({ file, format, quality, size })
            file = await File.save({ file, buffer, format, folder })
        } else {
            file = await File.save({ file, folder })
        }
    }
    return res.status(200).send({ success: true, file })
})

module.exports = app => app.use('/upload', router)
