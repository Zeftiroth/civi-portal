import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/clients-search">Search Clients</Link>
          </li>
          <li>
            <Link to="/add-client">Add Client</Link>
          </li>
          <li>
            <Link to="/cases">Cases</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
