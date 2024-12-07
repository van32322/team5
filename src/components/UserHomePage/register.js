import { useState, useRef, useEffect } from "react";
import styles from "./UserHP.module.css";
import cc from "../../assets/images/cc.png";
function Form() {
    const [passwordVisible, setPasswordVisible] = useState({
        password2: false,
        password3: false,
    });
    const togglePasswordVisibility = (id) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Đảo trạng thái của input tương ứng
        }));
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const roleRef = useRef(null);
    const positionRef = useRef(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [selectedGender, setSelectedGender] = useState("Chọn giới tính");
    const [selectedRole, setSelectedRole] = useState("Chọn Role");
    const [selectedPositionId, setSelectedPositionId] = useState("Chọn vai trò");
    const [phone, setPhone] = useState("");
    const [name, setUser] = useState("");
    const [isOpenGender, setIsOpenGender] = useState(false);
    const [isOpenRole, setIsOpenRole] = useState(false);
    const [isOpenPositionId, setIsOpenPositionId] = useState(false);
    const [isdkModalOpen, setIsdkModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const genders = ["Male", "Female", "Other"];
    const positionId = ["Patient", "Doctor", "Professor"];
    const roleid = ["R1", "R2", "R3"];
    const genderRef = useRef(null);
    const dkRef = useRef(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImageFile(file); // Lưu file gốc để gửi lên server
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result); // URL xem trước ảnh
            };
            reader.readAsDataURL(file);
        }
    };
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setIsOpenGender(false);
    };
    const handlePositionIdSelect = (positionId) => {
        setSelectedPositionId(positionId);
        setIsOpenPositionId(false);
    };
    const handleRoleSelect = (roleid) => {
        setSelectedRole(roleid);
        setIsOpenRole(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        // Chuẩn bị dữ liệu trong FormData
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("gender", selectedGender);
        formData.append("roleid", selectedRole); // Sửa 'role' thành 'roleid' cho phù hợp với backend
        formData.append("phoneNumber", phone);
        formData.append("positionId", selectedPositionId); // Nếu có giá trị mặc định
        if (selectedImageFile) {
            formData.append("image", selectedImageFile); // Gửi file ảnh
        }

        try {
            const response = await fetch("http://localhost:8081/v1/api/register", {
                method: "POST",
                body: formData, // Gửi dữ liệu FormData
            });

            const result = await response.json();

            if (response.ok) {
                setIsdkModalOpen(true); // Hiển thị modal khi đăng ký thành công
            } else {
                alert("Đăng ký thất bại: " + result.EM);
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
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
            // Đóng menu vai trò nếu click ngoài
            if (roleRef.current && !roleRef.current.contains(event.target)) {
                setIsOpenRole(false);
            }
            if (positionRef.current && !positionRef.current.contains(event.target)) {
                setIsOpenPositionId(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Dọn dẹp sự kiện khi component unmount
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
                    onChange={(e) => setUser(e.target.value)}
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
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Mật Khẩu xác thực</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={
                                passwordVisible.password3 ? "text" : "password"
                            }
                            id="password3"
                            placeholder="Nhập lại Mật Khẩu........."
                            className={styles.inputField}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                togglePasswordVisibility("password3")
                            }
                            className={styles.togglePassword}
                        >
                            {passwordVisible.password3 ? "👁️" : "🙈"}
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.option2}>
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
                                    onClick={() =>
                                        handlePositionIdSelect(positionId)
                                    }
                                >
                                    {positionId}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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
            </div>
            <div className={styles.imgInput}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload} // Gọi hàm xử lý ảnh khi chọn ảnh
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
                <>
                    <div className={styles.modalOverlay}>
                        <div className={styles.dangkiModalContent}>
                            <p>Dăng ký thành công</p>
                            <img src={cc} alt="cc"></img>
                        </div>
                    </div>
                </>
            )}
        </form>
    );
}

export default Form;