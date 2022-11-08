import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Input from "./pages/Input";
import Listing from "./pages/Listing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Input />} />
          <Route path="/input" element={<Input />} />
          <Route path="/listing" element={<Listing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
