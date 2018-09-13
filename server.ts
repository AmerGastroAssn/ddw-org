import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';

import { join } from 'path';
import 'reflect-metadata';
// These are important and needed before anything else
import 'zone.js/dist/zone-node';

// DOM libs required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'base6';

const {
          AppServerModuleNgFactory,
          LAZY_MODULE_MAP
      } = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();

const app = express();

// Set the engine
app.engine(
  'html',
  ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');

app.get('/**/*', (req, res) => {
    res.render(join(DIST_FOLDER, APP_NAME, 'index'), {
        req,
        res
    });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, APP_NAME));

// Static Assets
app.get('*.*', express.static(join(DIST_FOLDER, APP_NAME)));

// Point all routes to Universal
app.get('*', (req, res) => {
    res.render('index', { req });
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});

// DOM libs required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'base6';

const {
          AppServerModuleNgFactory,
          LAZY_MODULE_MAP
      } = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();

const app = express();

// Set the engine
app.engine(
  'html',
  ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');

app.get('/**/*', (req, res) => {
    res.render(join(DIST_FOLDER, APP_NAME, 'index'), {
        req,
        res
    });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, APP_NAME));

// Static Assets
app.get('*.*', express.static(join(DIST_FOLDER, APP_NAME)));

// Point all routes to Universal
app.get('*', (req, res) => {
    res.render('index', { req });
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
