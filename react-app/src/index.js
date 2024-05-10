import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Countly from 'countly-sdk-web';

import App from './App';
import theme from './theme';

const countlyAppKey = process.env.REACT_APP_COUNTLY_APP_KEY;
const countlyUrl = process.env.REACT_APP_COUNTLY_URL;

if (window.location.hostname != "localhost") {
    window.Countly = Countly;
    Countly.init({
        app_key: countlyAppKey,
        url: countlyUrl,
        debug: false
    });

    Countly.q.push(['track_sessions']);
    Countly.q.push(['track_pageview']);
    Countly.q.push(['track_clicks']);
    Countly.q.push(['track_links']);
    Countly.q.push(["track_errors"]);
}
 else {
    console.log("Skip Countly on localhost");
 }

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
);