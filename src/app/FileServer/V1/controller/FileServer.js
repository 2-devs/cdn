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
        let buffer = []
        
        let ext = path.extname(file).replace(/./, '')
        if ((ext === 'jpg' || ext === 'webp' || ext === 'png') && (width || height || format)) {
            let image = resize({ stream, width, height, format })
            if (res.cache) {
                image.on('data', chunk => buffer.push(chunk))
                image.on('end', () => res.cache(Buffer.concat(buffer)))
            }
            return image.pipe(res)
        }
        if (res.cache) {
            stream.on('data', chunk => buffer.push(chunk))
            stream.on('end', () => res.cache(Buffer.concat(buffer)))
        }
        return stream.pipe(res)
    }
}

module.exports = FileServer
