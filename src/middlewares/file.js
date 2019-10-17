const fs = require('fs')
const path = require('path')

exports.save = async ({ buffer, file, format, folder }) => {
    if (!format)
        format = `${path.extname(file.originalname).toLowerCase().replace(/\./, '')}`
    if (!folder)
        folder = '/'
    else 
        folder = `/${folder}/`

    let publicPath = `${path.resolve(`${__dirname}/../public/`)}${folder}`
    let filename = `${file.filename.split('.')[0]}.${format}`
    let fileSaved = `${publicPath}${filename}`
    
    if (!await fs.existsSync(publicPath)) {
        fs.mkdir(publicPath, { recursive: true }, err => {
            if (err)
                throw err
        })
    }
    
    if (buffer) {
        if (await fs.existsSync(file.path))
            await fs.unlinkSync(file.path)
        
        fs.writeFile(fileSaved, buffer, err => {
            if (err)
                throw err
        })
    } else {
        fs.rename(file.path, fileSaved, err => {
            if (err)
                throw err
        })
    }
    return `${folder}${filename}`
}
