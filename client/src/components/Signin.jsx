import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import PropTypes from 'prop-types'
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import style from '../css/app.module.css';



const Signin = ({ setAlert, register, isAuthenticated }) => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: '', 
        email: '',
        password: '',
        password2: '',
        avatar: ''
    });

    const [inputValidity, setInputValidity] = useState({
        name: true, 
        email: true,
        password: true,
        password2: true,
        avatar: true
    });

    const {name, email, password, password2, avatar} = formData;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate]);

    const validateInput = (inputName) => {
        const updatedValidity = { ...inputValidity };
        switch (inputName) {
            case 'name':
                updatedValidity.name = formData.name.trim().length >= 3;
                break;
            case 'email':
                updatedValidity.email = formData.email.includes('@');
                break;
                case 'password':
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
                updatedValidity.password = passwordRegex.test(formData.password);
                break;                
            default:
                break;
        }
        setInputValidity(updatedValidity);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
          setAlert('Passwords do not match', 'danger');
        } else {
          register({ name, email, password, avatar });
          setFormData({
            name: '', 
            email: '',
            password: '',
            password2: '', 
            avatar: ''
          })
        }
    };


    return (
        <section className="d-flex justify-content-center align-items-center">
            <form className={`card ${style.form}`} onSubmit={onSubmit}>
                <h3 className="mb-3">Sign Up!</h3>
                <Alert/>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        placeholder="Name"
                        className={`form-control ${inputValidity.name ? '' : 'is-invalid'}`}                        
                        id="name" 
                        name="name"
                        aria-describedby="name"
                        value={name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onBlur={() => validateInput('name')}
                        required
                    />
                    {!inputValidity.name && (
                        <div className="invalid-feedback">Name must be at least 3 characters long.</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        placeholder="Email address"
                        className={`form-control ${inputValidity.email ? '' : 'is-invalid'}`}  
                        id="email" 
                        name="email"
                        aria-describedby="email"
                        value={email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onBlur={() => validateInput('email')}
                        required
                    />
                    {!inputValidity.email && (
                        <div className="invalid-feedback">Email must include '@'.</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        className={`form-control ${inputValidity.password ? '' : 'is-invalid'}`}   
                        id="password"
                        name="password"
                        minLength={6}
                        value={password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onBlur={() => validateInput('password')}
                        required
                        
                    />
                    {!inputValidity.password && (
                        <div className="invalid-feedback">Password must be at least 6 characters long, must contain at least one special character, a capital letter and at least one number.</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Password</label>
                    <input 
                        type="password"
                        placeholder="Confirm Password" 
                        className="form-control" 
                        id="password2"
                        name="password2"
                        minLength={6}
                        value={password2}
                        onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">Avatar</label>
                    <input 
                        type="url"
                        className="form-control" 
                        id="avatar"
                        name="avatar"
                        minLength={6}
                        value={avatar}
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" className={`btn btn-primary ${style.link}`}>Submit</button>
            </form>
        </section>
    );
};

Signin.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Signin);