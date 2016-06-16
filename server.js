import path from 'path';
import express from 'express';
import favicon from 'express-favicon';
import compress from 'compression';
import colors from 'colors';
// React
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import DocMeta from 'react-doc-meta';
// Flux Alt library
import Iso from 'iso';
import alt from 'dgx-alt-center';
// Configuration
import appConfig from './appConfig.js';
import analytics from './analytics.js';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';
// API Routes
import apiRoutes from './src/server/ApiRoutes/ApiRoutes.js';
// Homepage App
import Application from './src/app/components/Application/Application.jsx';

const ROOT_PATH = __dirname;
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const VIEWS_PATH = path.resolve(ROOT_PATH, 'src/views');
const WEBPACK_DEV_PORT = appConfig.webpackDevServerPort || 3000;
const isProduction = process.env.NODE_ENV === 'production';
// Assign API Routes
const app = express();

app.use(compress());

// Disables the Server response from
// displaying Express as the server engine
app.disable('x-powered-by');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', VIEWS_PATH);

app.set('port', process.env.PORT || 3001);

app.use(express.static(DIST_PATH));

// For images
app.use('*/src/client', express.static(INDEX_PATH));

app.use('/', apiRoutes);

app.get('/', (req, res) => {
  const iso = new Iso();
  const hpApp = ReactDOMServer.renderToString(<Application />);

  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  iso.add(hpApp, alt.flush());

  // First parameter references the ejs filename
  res.render('index', {
    app: iso.render(),
    appTitle: appConfig.appTitle,
    favicon: appConfig.favIconPath,
    isProduction,
    gaCode: analytics.google.code(isProduction),
    webpackPort: WEBPACK_DEV_PORT,
    appEnv: process.env.APP_ENV || 'no APP_ENV available - using production',
    apiUrl: res.locals.data.completeApiUrl,
  });
});

const server = app.listen(app.get('port'), (error) => {
  if (error) {
    console.log(colors.red(error));
  }

  console.log(colors.yellow.underline(appConfig.appName));
  console.log(
    colors.green('Express server is listening at'),
    colors.cyan(`localhost:${app.get('port')}`)
  );
});

// This function is called when you want the server to die gracefully
// i.e. wait for existing connections
const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully.');
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit(0);
  });
  // if after
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting' +
      'down');
    process.exit();
  }, 1000);
};
// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);


/* Development Environment Configuration
 * -------------------------------------
 * - Using Webpack Dev Server
*/
if (!isProduction) {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With',
    },
  }).listen(3000, 'localhost', (error) => {
    if (error) {
      console.log(colors.red(error));
    }
    console.log(colors.magenta('Webpack Dev Server listening at'),
      colors.cyan('localhost3000'));
  });
}
