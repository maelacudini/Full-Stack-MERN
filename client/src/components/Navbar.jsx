import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import style from "../css/app.module.css";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <nav className={`navbar navbar-expand-lg ${style.nav}`}>
      <h3 className="m-0 p-0 ">Connect!</h3>
      <button
        className={`navbar-toggler ${style.navToggler} ${style.link}`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-list"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <Link
            className={`nav-link ${style.navLink}`}
            aria-current="page"
            to="/"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <Link className={`nav-link ${style.navLink}`} to="dashboard">
              Profile
            </Link>
          ) : (
            <Link className={`nav-link ${style.navLink}`} to="login">
              Log In
            </Link>
          )}
          {isAuthenticated ? (
            <Link className={`nav-link ${style.navLink}`} onClick={logout}>
              Log Out
            </Link>
          ) : (
            <Link className={`nav-link ${style.navLink}`} to="signin">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
