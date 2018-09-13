import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';
require('dotenv').config();


export const render = functions
.runWith({ memory: '1GB' })
.https.onRequest(async (request, response) => {

    // Launch a browser
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Pass a URL via a query param
    const requestURL = request.query.requestURL;

    // Visit the page a get content
    const page = await browser.newPage();

    await page.goto(requestURL, { waitUntil: 'networkidle0' });

    const content = await page.content();

    // Send the response
    response.status(status).send(content);
});