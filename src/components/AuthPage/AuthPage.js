import React, { useState } from 'react';
import './AuthPage.css';
import hospitalImage from '../../assets/images/hospital.png';
import { Link } from 'react-router-dom';
function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');

    const togglePassword = (id) => {
        const passwordInput = document.getElementById(id);
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <img src={hospitalImage} alt="Hospital" className="image-slide-in" />

            <div className="form-container">
                <img src="https://inhoangkien.vn/wp-content/uploads/2020/04/Logo-B%E1%BB%99-Y-t%E1%BA%BF-01-e1585994422207-300x213.png"
                    alt="Logo" className="logo"
                />
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => handleTabClick('login')}
                    >
                        Login
                    </div>
                    <div
                        className={`tab ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => handleTabClick('register')}
                    >
                        Register
                    </div>
                    <div className="indicator" style={{ left: activeTab === 'login' ? '0%' : '50%' }}></div>
                </div>

                {activeTab === 'login' && (
                    <form className="form">
                        <label htmlFor="username">Username:</label>
                        <div className="input-box">
                            <input type="text" placeholder="Enter phone number or email" />
                        </div>

                        <label htmlFor="password">Password:</label>
                        <div className="input-box">
                            <input type="password" id="password" placeholder="Password" />
                            <span className="password-toggle" onClick={() => togglePassword('password')}>👁️</span>
                        </div>

                        <label htmlFor="adminId">ID Admin:</label>
                        <div className="input-box">
                            <input type="text" placeholder="Enter ID admin" />
                        </div>

                        <Link to="/HomePage" className="button" id="loginButton">Login</Link>

                        <div>
                            <label htmlFor="rememberPass">
                                <input type="checkbox" className="remember-pass" /> Remember pass
                            </label>
                            <Link to="/reset-password" className="forgot-password">Forgot password?</Link>
                        </div>
                    </form>
                )}

                {activeTab === 'register' && (
                    <form className="form">
                        <label htmlFor="username">Username:</label>
                        <div className="input-box">
                            <input type="text" placeholder="Enter your username" />
                        </div>

                        <label htmlFor="email">Email:</label>
                        <div className="input-box">
                            <input type="email" placeholder="Enter your email" />
                        </div>

                        <label htmlFor="password">Password:</label>
                        <div className="input-box">
                            <input type="password" id="registerPassword" placeholder="Password" />
                            <span className="password-toggle" onClick={() => togglePassword('registerPassword')}>👁️</span>
                        </div>

                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <div className="input-box">
                            <input type="password" id="confirmPassword" placeholder="Confirm your password" />
                            <span className="password-toggle" onClick={() => togglePassword('confirmPassword')}>👁️</span>
                        </div>

                        <div className="button" onClick={() => setActiveTab('code')}>Register</div>
                    </form>
                )}

                {activeTab === 'code' && (
                    <form className="form">
                        <p id="confirmationText">We have sent a confirmation code to your email (messages should be registered
                            with a phone number).</p>
                        <div className="input-box">
                            <input type="text" id="enterCode" placeholder="Enter your code" />
                        </div>

                        <div className="button" onClick={() => alert("Code submitted!")}>Submit Code</div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AuthPage;
