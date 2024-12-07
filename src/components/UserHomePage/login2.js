import React, { useState } from "react";
import cc from "../../assets/images/cc.png";
import axios from "axios";
import styles from "./UserHP.module.css"
function Login2() {
    const [activesubTab, setActivesubTab] = useState("login2");
    const [setActiveTab] = useState("");
    const [setUser] = useState('');
    const [passwordVisible, setPasswordVisible] = useState({
        password1: false,
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const handlesubTabClick = (tab) => {
        if (tab !== activesubTab) {
            setActivesubTab(tab);
        }
    };
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/v1/api/login", {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                // Successful login
                const userData = response.data.user; // Assuming user data is returned in this format
                setUser(userData); // Set user data correctly
                localStorage.setItem("token", response.data.access_token);
                setIsLoginModalOpen(true);
                setActiveTab("homepage");
            } else {
                setErrorMessage(response.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error sending request:", error);
            setErrorMessage("An error occurred while sending the request.");
        }
    };
    const togglePasswordVisibility = (id) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Đảo trạng thái của input tương ứng
        }));
    };
    return (
        <div>
            <form className={styles.form} onSubmit={handleLoginSubmit}>
                <div className={styles.phone}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email........."
                        className={styles.inputField}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
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