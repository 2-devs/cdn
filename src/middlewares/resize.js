const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

module.exports = function resize({ stream, width, height, format }) {
    let transform = sharp()

    if (format)
        transform.toFormat(format)
    if (width)
        width = parseInt(width)
    if (height)
        height = parseInt(height)
    transform.resize(width, height)
    
    return stream.pipe(transform)
}
