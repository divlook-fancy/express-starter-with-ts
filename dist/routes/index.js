"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("@/routes/api"));
const web_1 = __importDefault(require("@/routes/web"));
const router = express_1.default.Router();
router.use('/api', api_1.default);
router.use('/', web_1.default);
exports.default = router;
