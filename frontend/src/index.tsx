import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Routes from './routes';



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
