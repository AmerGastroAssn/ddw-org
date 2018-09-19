require('dotenv').config();
const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const app = express();
const admin = require('firebase-admin');
admin.initializeApp();
/*------------------------------------------------
     ROBOTRON HTML SANITIZER FUNCTION
------------------------------------------------*/

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

    // search engine crawler bots
    const bots = [
        'googlebot',
        'bingbot',
        'yandexbot',
        'duckduckbot',
        'slurp',
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

        console.log('renderUrl/botUrl', `${renderUrl}/${botUrl}`);
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
          .then(res => res.text())
          .then(body => {
              console.log('Page hit at: ', currentDate);
              return res.send(body.toString());
          })
          .catch((error) => console.log(error));
    }

});

exports.app = functions.https.onRequest(app);


/*------------------------------------------------
     CONTACT FORM EMAIL W/ SENDGRID
------------------------------------------------*/
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
const cors = require('cors')({ origin: true });

exports.firestoreEmail = functions.firestore
  .document('contactForm/{uid}')
  .onCreate((change, context) => {
      // const beforeData = change.before.data(); // data before the write
      // const afterData = change.after.data(); // data after the write

      const uid = context.params.uid;

      const db = admin.firestore();

      return db.collection('contactForm').doc(uid)
        .get()
        .then(doc => {
            // const contact = change.after.data(); // data after the write
            const contact = doc.data();
            console.log('contact', contact);

            const msg = {
                // to: contact.email,
                to: [
                    'cstodd@gastro.org',
                    'cstone@gastro.org',
                    'awhite@gastro.org',
                    'lhauver@gastro.org'
                ],
                from: 'contact@ddw.org',
                subject: 'New DDW.org Contact',
                // text: `Hey ${contact.firstName}. You have a new follower!!! `,
                html: `
                <h4 style="line-height:1.5em;"><u>From</u>:</h4>
                <p style="line-height:1.5em;">${contact.firstName} ${contact.lastName}</p>
                
                <h4 style="line-height:1.5em;"><u>Email</u>:</h4>
                <p style="line-height:1.5em;">${contact.email}</p>
                
                <h4 style="line-height:1.5em;"><u>Phone Number</u>:</h4>
                <p style="line-height:1.5em;">${contact.phoneNumber}</p>
                
                <h4 style="line-height:1.5em;"><u>Program</u>:</h4>
                <p style="line-height:1.5em;">${contact.programType}</p>
                
                <h4 style="line-height:1.5em;"><u>Subject</u>:</h4>
                <p>${contact.subject}</p>
                
                <h4 style="line-height:1.5em;"><u>Body</u>:</h4>
                <p>${contact.body}</p>
                `,

                // custom templates
                templateId: process.env.SENDGRID_LEGACY_TEMPLATE_ID,
                substitutionWrappers: [ '{{', '}}' ],
                substitutions: {
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    email: contact.email,
                    phoneNumber: contact.phoneNumber,
                    programType: contact.programType,
                    subject: contact.subject,
                    body: contact.body,

                    // and other custom properties here
                }
            };


            return sgMail.send(msg)
        })
        .then((msg) => console.log('email sent!: msg:', msg))
        .catch(err => console.log(err))

  });


