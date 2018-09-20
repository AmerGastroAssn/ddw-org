# DDW.org

New version of ddw.org

Built with Angular 6, Firebase (AngularFire 4), Bootstrap 4, ngx-bootstrap and Angular Material Design.

**To Use:**

Open up your terminal and clone the project:

    git clone git@github.com:AmerGastroAssn/ddw-org.git


Change/Move into project directory:

    cd ddw-org

Install dependencies:

    npm install

Create environment files:

`/src/environments/environment.prod.ts`

and

`/src/environments/environment.ts`


Add your firebase web-app variables:

It should be something like this (with your own values):

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

**Setup/install Firebase Function dependencies**

Install the Firebase command line tools. It will walk you through a handful of questions. (Follow instructions and/or search the web for more info to do that):

    npm install -g firebase-tools

Change directory into Firebase functions to install those dependencies:

    cd functions

Install Firebase Functions dependencies:

    npm install

Back out to main working directory:

    cd ..

Start Angular Server:

    ng serve

Open browser to [http://localhost:4200](http://localhost:4200)

