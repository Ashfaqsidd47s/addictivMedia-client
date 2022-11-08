import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "./pages/Input";
import Listing from "./pages/Listing";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/input" element={<Input />} />
          <Route path="/listing" element={<Listing />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

