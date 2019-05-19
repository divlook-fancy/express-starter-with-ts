"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rotating_file_stream_1 = __importDefault(require("rotating-file-stream"));
const morgan_1 = __importDefault(require("morgan"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
let logDirectory = path_1.default.join(__dirname, '../../log');
fs_1.default.existsSync(logDirectory) || fs_1.default.mkdirSync(logDirectory);
let accessLogStream = rotating_file_stream_1.default('access.log', {
    size: '100M',
    interval: '1d',
    path: logDirectory,
    maxSize: '1G',
});
morgan_1.default.token('date', (req, res, tz) => {
    return moment_timezone_1.default().tz(tz).format('YYYY-MM-DD HH:mm:ss');
});
morgan_1.default.format('log', ':date[Asia/Seoul] :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms');
exports.default = (format = 'log') => {
    return morgan_1.default(format, { stream: accessLogStream });
};
