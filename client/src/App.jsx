import "../src/css/global.css";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; //bootstrap icons
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profiles from "./components/Profiles";
import Signin from "./components/Signin";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { loadUser } from "./actions/auth";
import { useEffect, useState } from "react";
import setAuthToken from "./utils/setAuthToken";
import Privateroute from "./components/routing/Privateroute";
import { LOGOUT } from "./actions/types";
import style from "../src/css/app.module.css";
import ProfilePage from "./components/ProfilePage";

function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <div className={style.container}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="signin" element={<Signin />} />
            <Route path="login" element={<Login />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route
              path="dashboard"
              element={<Privateroute component={Dashboard} />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
