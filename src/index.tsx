import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "@mui/material";
import { theme } from './themes/theme';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './app/i18n';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
