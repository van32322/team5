import { useState, useRef, useEffect } from "react";
import styles from "./UserHP.module.css";
import cc from "../../assets/images/cc.png";

const Form = () => {
    const [passwordVisible, setPasswordVisible] = useState({
        password2: false,
        password3: false,
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedGender, setSelectedGender] = useState("Chọn giới tính");
    const [isOpenGender, setIsOpenGender] = useState(false);
    const [isdkModalOpen, setIsdkModalOpen] = useState(false);

    const genderRef = useRef(null);
    const dkRef = useRef(null);

    const genders = ["Male", "Female", "Other"];

    const togglePasswordVisibility = (id) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setIsOpenGender(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("gender", selectedGender);
        formData.append("phoneNumber", phone);

        try {
            const response = await fetch("http://localhost:8081/v1/api/register", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setIsdkModalOpen(true); // Show modal on success
            } else {
                alert("Đăng ký thất bại: " + result.EM);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Có lỗi xảy ra khi gửi yêu cầu.");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genderRef.current && !genderRef.current.contains(event.target)) {
                setIsOpenGender(false);
            }
            if (dkRef.current && !dkRef.current.contains(event.target)) {
                setIsdkModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <form className={styles.form2} onSubmit={handleSubmit}>
            <div className={styles.phone}>
                <label htmlFor="phone">Số Điện Thoại</label>
                <input
                    type="text"
                    id="phone"
                    placeholder="Số Điện Thoại........."
                    className={styles.inputField}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div className={styles.phone}>
                <label htmlFor="Username">Họ tên</label>
                <input
                    type="text"
                    id="hoten"
                    placeholder="Nhập họ tên........."
                    className={styles.inputField}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={styles.phone}>
                <label htmlFor="Email">Email</label>
                <input
                    type="text"
                    id="Email"
                    placeholder="Nhập email........."
                    className={styles.inputField}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password">Mật Khẩu</label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={passwordVisible.password2 ? "text" : "password"}
                        id="password2"
                        placeholder="Nhập Mật Khẩu........."
                        className={styles.inputField}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility("password2")}
                        className={styles.togglePassword}
                    >
                        {passwordVisible.password2 ? "👁️" : "🙈"}
                    </button>
                </div>

                <label htmlFor="confirmPassword">Mật Khẩu Xác Nhận</label>
                <div className={styles.passwordWrapper}>
                    <input
                        type={passwordVisible.password3 ? "text" : "password"}
                        id="password3"
                        placeholder="Nhập lại Mật Khẩu........."
                        className={styles.inputField}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility("password3")}
                        className={styles.togglePassword}
                    >
                        {passwordVisible.password3 ? "👁️" : "🙈"}
                    </button>
                </div>
            </div>

            <div className={styles.option2}>
                {/* Gender Select */}
                <div ref={genderRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpenGender(!isOpenGender)}
                    >
                        {selectedGender}
                    </button>
                    {isOpenGender && (
                        <div className={styles.dropdownMenu}>
                            {genders.map((gender, index) => (
                                <div
                                    key={index}
                                    className={styles.dropdownItem}
                                    onClick={() => handleGenderSelect(gender)}
                                >
                                    {gender}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <button type="submit" className={styles.RegisterButton}>
                Đăng ký
            </button>

            {isdkModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.dangkiModalContent}>
                        <p>Dăng ký thành công</p>
                        <img src={cc} alt="cc" />
                    </div>
                </div>
            )}
        </form>
    );
};

export default Form;
