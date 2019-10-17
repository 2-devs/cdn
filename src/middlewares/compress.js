const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

exports.compress = async ({ file, size, quality, format }) => {
    if (!format)
        format = `${path.extname(file.originalname).toLowerCase().replace(/\./, '')}`
    if (!quality)
        quality = 80
    else 
        quality = parseInt(quality)
    if (size) {
        if (size.indexOf('x') > -1)
            size = { width: parseInt(size.split('x')[0]), height: parseInt(size.split('x')[1]) }
        else if (size.indexOf('w') > -1)
            size = { width: parseInt(size.replace(/w/, '')) }
        else if (size.indexOf('h') > -1)
            size = { height: parseInt(size.replace(/h/, '')) }
        else 
            size = parseInt(size)
    }
    
    let buffer = sharp(file.path).resize(size).toFormat(format)
    
    if (format === 'webp')
        buffer.webp({ quality })
    if (format === 'jpg' || format === 'jpeg')
        buffer.jpeg({ quality })
    if (format === 'png')
        buffer.png({ quality, progressive: true, compressionLevel: 9, nearLossless: true })
        
    return buffer.toBuffer()
}
