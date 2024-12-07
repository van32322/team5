import React, { useState } from "react";
import Form from "./register"
import ForgetPass from "./forgetpass"
import ll from "../../assets/images/loginlogo.png";
import styles from "./UserHP.module.css"
import Login2 from "./login2"
function Login() {
    const [activesubTab, setActivesubTab] = useState("login2");
    const handlesubTabClick = (tab) => {
        if (tab !== activesubTab) {
            setActivesubTab(tab);
        }
    };
    return (
        <div>
            <div className={styles.LoginContainer}>
                <img src={ll} alt="img"></img>
                <div className={styles.inLoginContainer}>
                    <div className={styles.tabs2}>
                        <div
                            className={`${activesubTab === "login2" ? styles.active : ""
                                } ${styles.intab}`}
                            onClick={() => handlesubTabClick("login2")}
                        >
                            Đăng nhập
                        </div>
                        <div
                            className={`${activesubTab === "register" ? styles.active : ""
                                } ${styles.intab}`}
                            onClick={() => handlesubTabClick("register")}
                        >
                            Đăng ký
                        </div>
                        {/* Đường indicator di chuyển */}
                        <div
                            className={`${styles.indicator2} ${activesubTab === "login2" ? styles.left : styles.right
                                }`}
                        ></div>
                    </div>
                    {activesubTab === "login2" && (
                        <Login2></Login2>
                    )}
                    {activesubTab === "forgetpass" && (
                        <ForgetPass></ForgetPass>
                    )}
                    {activesubTab === "register" && (
                        <>
                            <Form></Form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;