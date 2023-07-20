import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import Alert from "./Alert";
import { connect } from 'react-redux';
import { setAlert } from "../actions/alert";
import { login } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import style from '../css/app.module.css';

const Login = ({ setAlert, login, isAuthenticated }) => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault(); 
        login(email, password);
    };

    return (
        <section className="d-flex justify-content-center align-items-center">
            <form className={`card ${style.form}`} onSubmit={onSubmit}>
                <h3>Log In!</h3>
                <Alert/>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email"   
                        className="form-control" 
                        id="email" 
                        aria-describedby="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        placeholder="Password"
                        minLength="6"
                        value={password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className={`btn btn-primary ${style.link}`} value="Login">Submit</button>
            </form>
        </section>
    );
};

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
 
export default connect(mapStateToProps, { setAlert, login })(Login);
