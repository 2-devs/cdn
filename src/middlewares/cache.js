'use strict'

const fs = require('fs')
const Duplex = require('stream').Duplex
const Cache = require('memory-cache')

exports.cache = duration => {
    return (req, res, next) => {
        const key = `__express__${req.originalUrl || req.url}`
        const cached = Cache.get(key)
        
        if (cached) {
            let stream = new Duplex()
            stream.push(cached)
            stream.push(null)
            return stream.pipe(res)
        } else {
            res.cache = (data) => {
                Cache.put(key, data, (duration * 1000))
            }
        }
        return next()
    }
}
