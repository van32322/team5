import { useState, useRef, useEffect } from "react";
import styles from "./UserHP.module.css";
import OTPInput from "./OTPInput";
function ForgetPass() {
    useEffect(() => {
        const handleClickOutside = (event) => {
        };
        document.addEventListener("mousedown", handleClickOutside);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const [activesubTab, setActivesubTab] = useState("login2");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("Chọn quốc gia");
    const handleGửiOTPClick = () => {
        setIsModalOpen(true);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onOtpSubmit = (otp) => {
        alert("Đăng nhập thành công với mã otp: " + otp);
    };
    const handlesubTabClick = (tab) => {
        if (tab !== activesubTab) {
            setActivesubTab(tab);
        }
    };
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const countries = [
        "Vietnam (+84)",
        "United States (+1)",
        "Canada (+1)",
        "Australia (+61)",
        "Japan (+81)",
    ];
    return (
        <form className={styles.form}>
            <div className={styles.phone}>
                <label htmlFor="phoneRegister">Số Điện Thoại</label>
                <div className={styles.phone2}>
                    <div
                        className={styles.chooseCountry}
                        onClick={toggleDropdown}
                    >
                        {selectedCountry}
                    </div>
                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            {countries.map((country, index) => (
                                <div
                                    key={index}
                                    className={styles.dropdownItem}
                                    onClick={() => handleCountrySelect(country)}
                                >
                                    {country}
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        type="text"
                        id="phoneRegister"
                        placeholder="Số Điện Thoại........."
                        className={styles.inputField}
                    />
                </div>
            </div>
            <h1>Mã OTP sẽ được gửi đến số điện thoại này</h1>

            <div className={styles.options2}>
                <input type="checkbox" />
                <label>
                    Tôi đã đọc và đồng ý các điều khoản điều kiện sử dụng
                </label>
            </div>
            <div className={styles.OTPButton} onClick={handleGửiOTPClick}>
                Gửi OTP
                {/* Modal for OTP input */}
            </div>
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button
                            onClick={handleCloseModal}
                            className={styles.closeButton}
                        >
                            X
                        </button>
                        <h2>Nhập mã OTP vừa gửi đến số</h2>
                        <OTPInput length={6} onOtpSubmit={onOtpSubmit} />
                        <button className={styles.ttButton} type="submit">
                            Tiếp tục
                        </button>
                        <div className={styles.modalText}>
                            <span>Không nhân được mã? </span>
                            <a href="#">Thử lại</a>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.indicator3}></div>
            <div className={styles.space}>
                <div className={styles.text}>
                    <span>Đã có tài khoản?</span>
                    <a onClick={() => handlesubTabClick("login2")}>
                        Đăng nhập
                    </a>
                </div>
            </div>
        </form>
    )
}
export default ForgetPass;