import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UserHP.module.css";
import vector from "../../assets/images/Vector.png";
import ac from "../../assets/images/account_circle.png";
import { jwtDecode } from "jwt-decode"; // Sử dụng jwtDecode thay vì jwt_decode

const Header = () => {
    const [isOpen, setIsOpen] = useState(false); // Menu "Đặt khám"
    const [ManageProfileOpen, setManageProfileOpen] = useState(false); // Menu Profile
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const outsideClickRef = useRef(null);
    const navigate = useNavigate();

    // Hàm giải mã và lấy tên người dùng từ token
    const getUserInfoFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token); // Sử dụng jwtDecode để giải mã token
                setUserName(decoded.name); // Giả sử token chứa thông tin người dùng trong trường 'name'
                setIsLoggedIn(true); // Đặt trạng thái đã đăng nhập
            } catch (error) {
                console.error("Invalid token", error);
            }
        } else {
            setIsLoggedIn(false); // Nếu không có token thì người dùng chưa đăng nhập
        }
    };

    // Kiểm tra thông tin người dùng khi component được mount
    useEffect(() => {
        getUserInfoFromToken();
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName("");
        localStorage.removeItem("token");
        navigate("/"); // Điều hướng về trang chủ
    };

    return (
        <div className={styles.container}>
            <div className={styles.UserHPHeader}>
                {/* Logo */}
                <div className={styles.HeaderP} onClick={() => navigate("/")}>
                    <h1>MEDICAL</h1>
                    <h2>APPOINTMENT</h2>
                </div>
                {/* Đặt khám */}
                <div
                    className={styles.headComponent}
                    onClick={() => setIsOpen(!isOpen)}
                    ref={outsideClickRef}
                >
                    Đặt khám
                    <img
                        src={vector}
                        alt="logo"
                        className={isOpen ? styles.Rotate : ""}
                    />
                </div>
                {isOpen && (
                    <div className={styles.Menu}>
                        <ul>
                            <li>
                                <Link to="/CoSo">Khám theo cơ sở</Link>
                            </li>
                            <li>
                                <Link to="/ChuyenKhoa">Khám theo chuyên khoa</Link>
                            </li>
                            <li>
                                <Link to="/BacSi">Khám theo bác sĩ</Link>
                            </li>
                            <li>
                                <Link to="/TongQuat">Khám tổng quát</Link>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Các phần khác */}
                <div className={styles.headComponent}>
                    <Link to="/tuVan">Tư vấn trực tuyến</Link>
                </div>
                <div className={styles.headComponent}>
                    <Link to="/store">Store</Link>
                </div>
                <div className={styles.headComponent}>
                    <Link to="/tinYTe">Tin y tế</Link>
                </div>
                <div className={styles.headComponent}>
                    <Link to="/nhanVien">Dành cho nhân viên</Link>
                </div>

                {/* Menu Profile */}
                {isLoggedIn ? (
                    <div
                        className={styles.headComponent}
                        onClick={() => setManageProfileOpen(!ManageProfileOpen)}
                        ref={outsideClickRef}
                    >
                        <img className={styles.aclogo} src={ac} alt="logo" />
                        <span>{userName}</span> {/* Hiển thị tên người dùng */}
                        {ManageProfileOpen && (
                            <div className={styles.manageMenu}>
                                <ul>
                                    <li>
                                        <Link to="/profile">Chỉnh sửa profile</Link>
                                    </li>
                                    <li onClick={handleLogout}>Đăng xuất</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div
                        className={`${styles.headComponentLogin}`}
                        onClick={() => navigate("/login")}
                    >
                        Đăng nhập
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
