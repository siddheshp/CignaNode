import React from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import './NavBar.css';

const NavBar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Employee Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Employee List
              </Link>
            </li>
            {authState.isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Employee
                </Link>
              </li>
            )}
            {authState.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    Hello, {authState.idToken?.claims?.name || 'User'}
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light nav-link" onClick={() => oktaAuth.signOut()}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light nav-link" onClick={() => oktaAuth.signInWithRedirect()}>
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
