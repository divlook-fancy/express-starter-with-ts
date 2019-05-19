import fs from 'fs'
import path from 'path'
import rfs from 'rotating-file-stream'
import logger from 'morgan'
import moment from 'moment-timezone'

let logDirectory = path.join(__dirname, '../../log')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

let accessLogStream = rfs('access.log', {
  size: '100M',
  interval: '1d',
  path: logDirectory,
  maxSize: '1G',
})

logger.token('date', (req, res, tz) => {
  return moment().tz(tz).format('YYYY-MM-DD HH:mm:ss')
})

logger.format('log', ':date[Asia/Seoul] :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms');

export default (format: string = 'log') => {
  return logger(format, { stream: accessLogStream })
}
