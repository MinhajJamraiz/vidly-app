import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="ps-5 navbar navbar-expand-lg navbar-light bg-light">
      <Link className=" nav-link " to="/">
        Vidly
      </Link>
      <div className="ms-5 navbar-nav">
        <NavLink className=" nav-link" to="/movies?">
          Movies
        </NavLink>

        <NavLink className=" nav-link" to="/customers">
          Customers
        </NavLink>

        <NavLink className=" nav-link" to="/rentals">
          Rentals
        </NavLink>

        <NavLink className=" nav-link" to="/loginForm">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
