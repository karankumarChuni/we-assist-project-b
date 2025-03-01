import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import ItemTypeForm from "./components/ItemTypeForm";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add-item" element={<ItemForm />} />
          <Route path="/types" element={<ItemTypeForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
