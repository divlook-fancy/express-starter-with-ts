"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const less_middleware_1 = __importDefault(require("less-middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("@/middleware/logger"));
const routes_1 = __importDefault(require("@/routes"));
let app = express_1.default();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(less_middleware_1.default(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(logger_1.default('log'));
app.use(routes_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
mongoose_1.default.Promise = global.Promise;
mongoose_1.default
    .connect('mongodb://localhost:27017/fake', {
    useNewUrlParser: true,
})
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));
exports.default = app;
