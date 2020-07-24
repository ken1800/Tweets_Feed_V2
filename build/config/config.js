"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.configDb = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = express_1.default();
exports.configDb = require("./db");
exports.db = exports.configDb.db;
