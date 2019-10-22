const fs = require('fs')
const path = require('path')

exports.save = async ({ buffer, file, format, folder, name }) => {
    if (!format)
        format = `${path.extname(file.originalname).toLowerCase().replace(/\./, '')}`
    if (!folder)
        folder = '/'
    else 
        folder = `/${folder}/`
    let filename
    if (name) {
        filename = `${slugify(name)}.${format}`
    } else {
        filename = `${file.filename.split('.')[0]}.${format}`
    }

    let publicPath = `${path.resolve(`${__dirname}/../public/`)}${folder}`
    let fileSaved = `${publicPath}${filename}`
    
    if (!await fs.existsSync(publicPath))
        await fs.mkdirSync(publicPath, { recursive: true })
    
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

function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}
