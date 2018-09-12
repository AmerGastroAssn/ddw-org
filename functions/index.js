require('dotenv').config();
const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const app = express();


// You might instead set these as environment variables
// I just want to make this example explicitly clear
const appUrl = process.env.appUrl;
const renderUrl = process.env.renderUrl;
const renderFullRendertronUrl = process.env.renderFullRendertronUrl;
const currentDate = new Date();
// Deploy your own instance of Rendertron for production
// const renderUrl = 'your-rendertron-url';


// Generates the URL
function generateUrl(request) {
    return url.format({
        protocol: request.protocol,
        host: appUrl,
        pathname: request.originalUrl
    });
}

// List of bots to target, add more if you'd like
function detectBot(userAgent) {

    const bots = [
        // search engine crawler bots
        'googlebot',
        'bingbot',
        'yandexbot',
        'duckduckbot',
        'slurp',
        // social media link bots
        'twitterbot',
        'facebookexternalhit',
        'linkedinbot',
        'embedly',
        'baiduspider',
        'pinterest',
        'slackbot',
        'vkshare',
        'facebot',
        'outbrain',
        'w3c_validator'
    ];


    // Return true if the user-agent header matches a bot namespace
    const agent = userAgent.toLowerCase();

    for (const bot of bots) {
        if (agent.indexOf(bot) > -1) {
            console.log('bot detected', bot, agent);
            return true
        }
    }

    console.log('no bots found');
    return false

}

app.get('*', (req, res) => {

    const isBot = detectBot(req.headers[ 'user-agent' ]);

    if (isBot) {

        const botUrl = generateUrl(req);
        // If Bot, fetch url via rendertron

        fetch(`${renderUrl}/${botUrl}`)
          .then(res => res.text())
          .then(body => {
              console.log('Bot hit at: ', currentDate);
              // Set the Vary header to cache the user agent, based on code from:
              // https://github.com/justinribeiro/pwa-firebase-functions-botrender
              res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
              res.set('Vary', 'User-Agent');

              return res.send(body.toString());

          })
          .catch((error) => console.log(error));

    } else {

        // Not a bot, fetch the regular Angular app
        // This is not an infinite loop because Firebase Hosting Priorities dictate index.html will be loaded first
        fetch(`https://${appUrl}`)
          .then(res => {
              return res.text();
          })
          .then(body => {
              console.log('Page hit at: ', currentDate);
              return res.send(body.toString());
          })
          .catch((error) => console.log(error));
    }

});

exports.app = functions.https.onRequest(app);
