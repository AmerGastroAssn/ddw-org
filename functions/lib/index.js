"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
exports.render = functions
    .runWith({ memory: '1GB' })
    .https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    // Launch a browser
    const browser = yield puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    // Pass a URL via a query param
    const requestURL = request.query.requestURL;
    const appURL = process.env.appUrl;
    // Visit the page a get content
    const page = yield browser.newPage();
    yield page.goto(appURL, { waitUntil: 'networkidle0' });
    const content = yield page.content();
    // Send the response
    response.status(status).send(content);
}));
//# sourceMappingURL=index.js.map