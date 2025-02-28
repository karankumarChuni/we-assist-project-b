import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import ItemTypeForm from "./components/ItemTypeForm";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add-item" element={<ItemForm />} />
          <Route path="/types" element={<ItemTypeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
