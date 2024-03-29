import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Index from './pages/Index/App';
import Login from './pages/Login/login';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Index />} />
            <Route path='login' element={<Login />} />        
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Routers />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
