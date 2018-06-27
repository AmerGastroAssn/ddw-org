# DDW.org

New version of ddw.org

Built with Angular 6 and Firebase.

**To Use: **

    git clone git@github.com:AmerGastroAssn/ddw-org.git

Install dependencies:

    npm install

Create env files and add variables for:

`/src/environments/environment.prod.ts`

and

`/src/environments/environment.ts`


Or include your own.

should be something like this (with your own values):

```javascript
export const environment = {
    production: false,
    firebase: {
        apiKey: 'key',
        authDomain: 'app-name.firebaseapp.com',
        databaseURL: 'https://app-name.firebaseio.com',
        projectId: 'app-name',
        storageBucket: 'app-name.appspot.com',
        messagingSenderId: 'senderIDNumber'
    }
};
```

Setup/install Firebase Function dependencies:

    cd functions

Install files:

    npm install