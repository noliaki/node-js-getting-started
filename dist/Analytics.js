"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
class Analytics {
    static async analyze(path, option = {}) {
        const result = {
            pageUrl: path
        };
        const browser = await puppeteer_1.default.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        page.on('error', (error) => {
            console.log(error);
            if (!result.error) {
                result.error = [];
            }
            result.error.push(error);
        });
        page.on('pageerror', (pageError) => {
            console.log(pageError);
            if (!result.pageError) {
                result.pageError = [];
            }
            result.pageError.push(pageError);
        });
        page.on('response', async (response) => {
            if (response.ok()) {
                return;
            }
            if (!result.responseError) {
                result.responseError = [];
            }
            result.responseError.push({
                status: response.status(),
                url: response.url(),
                headers: response.headers()
            });
        });
        page.on('load', console.log);
        await page.goto(path).catch(err => {
            console.log(err);
        });
        result.meta = await page.$$eval('meta', meta => {
            const r = [];
            for (let i = 0; i < meta.length; i++) {
                const attrs = meta[i].attributes;
                const elObj = {};
                for (let j = 0; j < attrs.length; j++) {
                    elObj[attrs[j].name] = attrs[j].value;
                }
                r.push(elObj);
            }
            return r;
        });
        await browser.close();
        return result;
    }
}
exports.default = Analytics;
