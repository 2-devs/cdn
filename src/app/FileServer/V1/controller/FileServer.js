const fs = require('fs')
const path = require('path')
const resize = require('./../../../../middlewares/resize')

let req, res

class FileServer {
    constructor (_req, _res) {
        req = _req, res = _res
    }
    
    async readFile () {
        let { width, height, format } = req.query
        let params = []
        if (req.params.path1) params.push(req.params.path1)
        if (req.params.path2) params.push(req.params.path2)
        if (req.params.path3) params.push(req.params.path3)
        if (req.params.file) params.push(req.params.file)
        let file = path.resolve(`${__dirname}/../../../../public/${params.join('/')}`)
        if (!await fs.existsSync(file))
            return res.status(404).send('Not found')
        
        const stream = fs.createReadStream(file)
        
        let ext = path.extname(file).replace(/./, '')
        if ((ext === 'jpg' || ext === 'webp' || ext === 'png') && (width || height || format)) {
            return resize({ stream, width, height, format }).pipe(res)
        }
        
        return stream.pipe(res)
    }
}

module.exports = FileServer
