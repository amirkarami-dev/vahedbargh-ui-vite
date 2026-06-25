import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import "./styles/global.css"
import { Provider } from "react-redux"
import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import store from "./store"

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const app = (
  <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </ThemeProvider>
    </CacheProvider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()