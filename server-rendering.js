import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import Helmet from 'react-helmet';
import {StaticRouter} from 'react-router-dom';
import chalk from 'chalk';
// apollo tools
import {ApolloProvider, renderToStringWithData} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
// client: reactjs
import App from './client/app';
import config, {isProd, WEBPACK_PORT} from './config';

// SSR
const serverRendering = () => (req, res, next) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: `http://localhost:${config.port}/api`,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
      fetch,
    }),
    cache: new InMemoryCache(),
  })

  const context = {};
  const ssr = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ ApolloProvider>
  )

  renderToStringWithData(ssr)
  .then(content => {
    res.status(200);
    const html = <HTML content={content} client={client} />;
    res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
    res.end();
  })
  .catch(e => {
    console.log(
    chalk.black.bgRed.bold(`Error 500: Internal server error!`)
    );
    console.error('Server side rendering error : ', e);
    res.status(500);
    res.end();
  })
}

const wds = `http://localhost:${WEBPACK_PORT}`;

// html markup
const HTML = ({content, client: {cache}}) => {
  const head = Helmet.rewind();

  // assets from webpack manifest
  let assetsManifest;
  if (isProd) {
    try {
      assetsManifest = require('./build/client/manifest.json');
    } catch (err) {
    }
  }

  return <html>
    <head>
      {head.base.toComponent()}
      {head.title.toComponent()}
      {head.meta.toComponent()}
      {head.link.toComponent()}
      {head.script.toComponent()}
      {head.noscript.toComponent()}
      <link rel='stylesheet' href={isProd ? assetsManifest['app.css'] : `${wds}/app.css`}/>
      <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
      <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type='text/css'/>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{
        __html: `window.__STATE__=${JSON.stringify(cache.extract()).replace(/</g, '\\u003c')};`,
      }} />
      <script src={isProd ? assetsManifest['vendor.js'] :  `${wds}/vendor.bundle.js`}></script>
      <script src={isProd ? assetsManifest['app.js'] :  `${wds}/app.bundle.js`}></script>
    </body>
  </html>
}

export default serverRendering;