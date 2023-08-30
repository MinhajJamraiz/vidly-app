import React from "react";
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="ps-5 navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand nav-link " to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
          <NavLink className=" nav-link" to="/registerForm">
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
