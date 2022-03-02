import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <React.StrictMode>
    <div className="max-w-screen-sm m-auto">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
