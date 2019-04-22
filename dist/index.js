"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express = __importStar(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Api_1 = __importDefault(require("./Api"));
const PORT = process.env.PORT || 5000;
express
    .default()
    .use(body_parser_1.default.urlencoded({
    extended: true
}))
    .use(body_parser_1.default.json())
    .use(express.static(path_1.default.join(__dirname, 'public')))
    .set('views', path_1.default.join(__dirname, 'views'))
    .use(Api_1.default)
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
