import React from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const Header = () => {
  return (
    <header className="header">
      <div className="flex items-center gap-2">
        <Package size={24} color="#3498db" />
        <h1>We Assist Assignment</h1>
      </div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="btn">
              View Items
            </Link>
          </li>
          <li>
            <Link to="/add-item" className="btn btn-success">
              Add Items
            </Link>
          </li>
          <li>
            <Link to="/types" className="btn btn-warning">
              Manage Types
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
