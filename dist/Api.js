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
const url_1 = __importDefault(require("url"));
const express = __importStar(require("express"));
const Analytics_1 = __importDefault(require("./Analytics"));
const router = express.Router();
exports.default = router.post('/api/analyze', async (req, res, next) => {
    const urls = req.body.urls
        .filter((urlString) => !!url_1.default.parse(urlString).hostname)
        .filter((urlString, index, arr) => arr.indexOf(urlString) === index);
    console.log(urls);
    const requests = [];
    for (let i = 0; i < urls.length; i++) {
        requests.push(Analytics_1.default.analyze(urls[i]));
    }
    const results = await Promise.all(requests);
    res.json(results);
});
