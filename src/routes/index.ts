import fs from 'fs'
import path from 'path'
import express from 'express'

const router = express.Router()

setRoute(router, 'api')
setRoute(router, 'web', '/')

export default router

function setRoute(router, pathname, prefix = null) {
    let routePath = path.resolve(__dirname, pathname)
    if (!prefix) prefix = `/${pathname}`

    if (fs.existsSync(routePath)) {
        fs.readdirSync(routePath).forEach(row => {
            let filePath = path.join(routePath, row)
            let fileStat = fs.statSync(filePath)

            if (!/^index\.[jt]s$/.test(row)) {
                prefix += `/${row.replace(/\.[jt]s$/, '')}`
            }
            if (fileStat.isFile) {
                router.use(prefix, require(filePath).default)
            }
        })
    }
}
