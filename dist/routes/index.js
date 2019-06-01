"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
setRoute(router, 'api');
setRoute(router, 'web', '/');
exports.default = router;
function setRoute(router, pathname, prefix = null) {
    let routePath = path_1.default.resolve(__dirname, pathname);
    if (!prefix)
        prefix = `/${pathname}`;
    if (fs_1.default.existsSync(routePath)) {
        fs_1.default.readdirSync(routePath).forEach(row => {
            let filePath = path_1.default.join(routePath, row);
            let fileStat = fs_1.default.statSync(filePath);
            if (!/^index\.[jt]s$/.test(row)) {
                prefix += `/${row.replace(/\.[jt]s$/, '')}`;
            }
            if (fileStat.isFile) {
                router.use(prefix, require(filePath).default);
            }
        });
    }
}
