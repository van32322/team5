import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch } from "react-redux";
import { setUserLoginInfo } from "../../redux/slice/accountSlice"; // Import action from Redux slice
import cc from "../../assets/images/cc.png";
import axios from "axios";
import styles from "./UserHP.module.css";

function Login2() {
    const [activesubTab, setActivesubTab] = useState("login2");
    const [setUser] = useState('');
    const navigate = useNavigate(); // Hook để điều hướng
    const [passwordVisible, setPasswordVisible] = useState({
        password1: false,
    });
    const [username, setUsername] = useState(""); // Changed to match API (username)
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const dispatch = useDispatch();  // Dispatch to call action in Redux

    const handlesubTabClick = (tab) => {
        if (tab !== activesubTab) {
            setActivesubTab(tab);
        }
    };

    // Handle the token refresh automatically if the access token expires
    const refreshAccessToken = async () => {
        try {
            const response = await axios.post("http://localhost:8081/v1/api/refresh-token", {}, {
                withCredentials: true, // Giữ cookie trong yêu cầu
            });
            if (response.status === 200) {
                localStorage.setItem("access_token", response.data.accessToken);
            }
        } catch (error) {
            console.error("Failed to refresh token", error);
            setErrorMessage("Phiên làm việc hết hạn. Vui lòng đăng nhập lại.");
            // Optional: Redirect to login page on token expiry
            navigate("/login");
        }
    };

    // Handle login submit and authentication
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8081/v1/api/login", {
                username: username, // API expects "username" instead of "email"
                password: password,
            });

            if (response.status === 200) {
                // Successful login
                const userData = response.data.user; // Assuming user data is returned in this format
                setUser(userData); // Set user data correctly
                localStorage.setItem("access_token", response.data.access_token); // Store token
                document.cookie = `refreshToken=${response.data.refreshToken}; HttpOnly; Path=/`;

                // Dispatch action to store user info in Redux
                dispatch(setUserLoginInfo(userData));

                // Check user role (assuming "role" is part of the response)
                const userRole = userData.role;  // Assuming role can be 'admin' or 'user'

                if (userRole === 'admin') {
                    navigate("/admin"); // Redirect to Admin page
                } else if (userRole === 'user') {
                    navigate("/user"); // Redirect to User page
                }

                setIsLoginModalOpen(true); // Open modal on successful login
            } else {
                setErrorMessage(response.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error sending request:", error);
            setErrorMessage("An error occurred while sending the request.");
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = (id) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle password visibility
        }));
    };

    // Automatically refresh the access token on page load
    useEffect(() => {
        // Check if the token is expired and refresh
        const token = localStorage.getItem("access_token");
        if (token) {
            const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
            const expTime = decoded.exp * 1000; // Token expiration time
            const currentTime = new Date().getTime();

            // If token is about to expire within 5 minutes
            if (expTime - currentTime < 5 * 60 * 1000) {
                refreshAccessToken(); // Refresh token before it expires
            }
        }
    }, []);

    return (
        <div>
            <form className={styles.form} onSubmit={handleLoginSubmit}>
                <div className={styles.phone}>
                    <label htmlFor="username">Email</label>
                    <input
                        type="text"
                        id="username" // Matches "username" in API
                        placeholder="Email........."
                        className={styles.inputField}
                        onChange={(e) => setUsername(e.target.value)} // Set "username"
                        name="username"
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Mật Khẩu</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={passwordVisible.password1 ? "text" : "password"}
                            id="password1"
                            placeholder="Nhập Mật Khẩu........."
                            className={styles.inputField}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility("password1")}
                            className={styles.togglePassword}
                        >
                            {passwordVisible.password1 ? "👁️" : "🙈"}
                        </button>
                    </div>
                    <div className={styles.options}>
                        <input type="checkbox" />
                        <label>Ghi nhớ mật khẩu</label>
                        <a
                            className={styles.forgotPassword}
                            onClick={() => handlesubTabClick("forgetpass")}
                        >
                            Quên mật khẩu?
                        </a>
                    </div>
                    <button type="submit" className={styles.LoginButton}>
                        Đăng nhập
                    </button>
                    <div className={styles.indicator3}></div>
                    <div className={styles.space}>
                        <div className={styles.text}>
                            <span>Chưa có tài khoản?</span>
                            <a onClick={() => handlesubTabClick("register")}>
                                Đăng ký ngay
                            </a>
                        </div>
                    </div>
                </div>
                {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}
                {isLoginModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.dangkiModalContent}>
                            <p>Đăng nhập thành công</p>
                            <img src={cc} alt="cc" />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Login2;
