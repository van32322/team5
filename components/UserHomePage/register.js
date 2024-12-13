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
    const [selectedRole, setSelectedRole] = useState("Chọn Role");
    const [selectedPositionId, setSelectedPositionId] = useState("Chọn vai trò");
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [isOpenGender, setIsOpenGender] = useState(false);
    const [isOpenRole, setIsOpenRole] = useState(false);
    const [isOpenPositionId, setIsOpenPositionId] = useState(false);
    const [isdkModalOpen, setIsdkModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const genderRef = useRef(null);
    const roleRef = useRef(null);
    const positionRef = useRef(null);
    const dkRef = useRef(null);

    const genders = ["Male", "Female", "Other"];
    const positionId = ["Patient", "Doctor", "Professor"];
    const roleid = ["R1", "R2", "R3"];

    const togglePasswordVisibility = (id) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setIsOpenGender(false);
    };

    const handleRoleSelect = (roleid) => {
        setSelectedRole(roleid);
        setIsOpenRole(false);
    };

    const handlePositionIdSelect = (positionId) => {
        setSelectedPositionId(positionId);
        setIsOpenPositionId(false);
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
        formData.append("roleid", selectedRole);
        formData.append("phoneNumber", phone);
        formData.append("positionId", selectedPositionId);
        if (selectedImageFile) {
            formData.append("image", selectedImageFile);
        }

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
            if (roleRef.current && !roleRef.current.contains(event.target)) {
                setIsOpenRole(false);
            }
            if (positionRef.current && !positionRef.current.contains(event.target)) {
                setIsOpenPositionId(false);
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

                {/* Role Select */}
                <div ref={roleRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpenRole(!isOpenRole)}
                    >
                        {selectedRole}
                    </button>
                    {isOpenRole && (
                        <div className={styles.dropdownMenu}>
                            {roleid.map((role, index) => (
                                <div
                                    key={index}
                                    className={styles.dropdownItem}
                                    onClick={() => handleRoleSelect(role)}
                                >
                                    {role}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Position Select */}
                <div ref={positionRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpenPositionId(!isOpenPositionId)}
                    >
                        {selectedPositionId}
                    </button>
                    {isOpenPositionId && (
                        <div className={styles.dropdownMenu}>
                            {positionId.map((positionId, index) => (
                                <div
                                    key={index}
                                    className={styles.dropdownItem}
                                    onClick={() => handlePositionIdSelect(positionId)}
                                >
                                    {positionId}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.imgInput}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

            {selectedImage && (
                <div className={styles.imgPre}>
                    <img
                        src={selectedImage}
                        alt="Selected"
                        style={{
                            border: "3px solid black",
                            width: "100px",
                            height: "100px",
                            marginTop: "10px",
                        }}
                    />
                </div>
            )}

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
