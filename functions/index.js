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


exports.httpEmail = functions.https.onRequest((req, res) => {

    cors(req, res, () => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const programType = req.body.programType;
        const subject = req.body.subject;
        const body = req.body.body;

        const msg = {
            to: [ 'gastro.org@gmail.com', 'cbstodd@hotmail.com' ],
            from: 'contact@ddw.org',
            subject: `New DDW® Contact!`,
            text: `Program ${programType}`,
            html: `<h4>From:</h4>
                    <p>{{firstName}} {{lastName}}</p>
                
                    <h4>Phone Number:</h4>
                    <p>{{phoneNumber}}</p>
                
                    <h4>Program:</h4>
                    <p>{{programType}}</p>
                
                    <h4>Subject:</h4>
                    <p>{{subject}}</p>
                
                    <h4>Body:</h4>
                    <p>{{body}}</p>`,

            // custom templates
            templateId: process.env.SENDGRID_EMAIL_ID,
            substitutionWrappers: [ '{{', '}}' ],
            substitutions: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                programType: programType,
                subject: subject,
                body: body,

            }
        };

        return sgMail.send(msg)
          .then(() => res.status(200).send('email sent!'))
          .catch(err => res.status(400).send(err))

    });

});


/*------------------------------------------------
     CONTACT FORM EMAIL W/ SENDGRID VERSION 2.0
------------------------------------------------*/
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

            const msg = {
                // to: contact.email,
                to: 'cbstodd@me.com',
                from: 'contact@ddw.org',
                subject: 'New Contact',
                // text: `Hey ${toName}. You have a new follower!!! `,
                // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

                // custom templates
                templateId: process.env.SENDGRID_EMAIL_ID,
                substitutionWrappers: [ '{{', '}}' ],
                substitutions: {
                    name: contact.firstName
                    // and other custom properties here
                }
            };

            return sgMail.send(msg)
        })
        .then(() => console.log('email sent!'))
        .catch(err => console.log(err))

  });


