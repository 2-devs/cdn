const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${path.resolve(__dirname)}/../upload/`)
    }, filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname).toLowerCase()}`)
    }
})

const upload = multer({ storage })

module.exports = upload
