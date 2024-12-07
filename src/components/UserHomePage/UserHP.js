import React, { useState, useEffect, useRef } from "react";
import styles from "./UserHP.module.css"; // Import CSS module
import vector from "../../assets/images/Vector.png";
import ac from "../../assets/images/account_circle.png";
import { Link } from "react-router-dom";
import LichKham from "./LichKham";
import UserProfile from "./UserProfile";
import GeneralCheckup from "./GeneralCheckup";
import Login from "./Login"
import Homepage from "./homepage"
function UserHP() {
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");
    const [activeSubTab2, setActiveSubTab2] = useState("lichKham");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái mở/đóng menu
    const [ManageProfileOpen, setmanageProfileOpen] = useState(false);
    const outsideClickRef = useRef(null); // Tham chiếu cho ngoài vùng logo và menu
    const [activeTab, setActiveTab] = useState("homepage");
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                outsideClickRef.current &&
                !outsideClickRef.current.contains(event.target)
            ) {
                setmanageProfileOpen(false); // Đóng menu khi click ra ngoài
            }

        };
        document.addEventListener("mousedown", handleClickOutside);
        // Dọn dẹp sự kiện khi component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleTabClick = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
        }
        if (tab !== "manageProfile") {
            setActiveSubTab2("lichKham");
        }
    };
    const handleLogout = () => {
        // Cập nhật trạng thái khi đăng xuất
        setIsLoggedIn(false);
        setUserName("");
        setToken("");
        localStorage.removeItem("token");
        setActiveTab("homepage");
    };
    const handlesubTabClick2 = (tab) => {
        if (tab !== activeSubTab2) {
            setActiveSubTab2(tab);
        }
    };
    return (
        <div className={styles.UserHPContainer}>
            <div className={styles.UserHPHeader}>
                <div
                    className={styles.HeaderP}
                    onClick={() => handleTabClick("homepage")}
                >
                    <h1>MEDICAL</h1>
                    <h2>APPOINTMENT</h2>
                </div>

                {/* Đặt khám */}
                <div
                    className={styles.headComponent} // Áp dụng class quay khi menu mở
                    onClick={() => setIsOpen(!isOpen)} // Mở/đóng menu khi click vào logo
                    ref={outsideClickRef}
                >
                    Đặt khám
                    <img
                        src={vector}
                        alt="logo"
                        className={isOpen ? styles.Rotate : ""}
                    />
                </div>
                {/* Hiển thị menu khi isOpen = true */}
                {isOpen && (
                    <div className={styles.Menu}>
                        <ul>
                            <li onClick={() => handleTabClick("coSo")}>Khám theo cơ sở</li>
                            <li onClick={() => handleTabClick("chuyenKhoa")}>
                                Khám theo chuyên khoa
                            </li>
                            <li onClick={() => handleTabClick("bacSi")}>Khám theo bác sĩ</li>
                            <li onClick={() => handleTabClick("tongQuat")}>Khám tổng quát</li>
                        </ul>
                    </div>
                )}
                <div className={styles.headComponent}>Tư vấn trực tuyến</div>
                <div className={styles.headComponent}>Store</div>
                <div className={styles.headComponent}>Tin y tế</div>
                <div className={styles.headComponent}>Dành cho nhân viên
                    <img
                        src={vector}
                        alt="logo"
                        className={isOpen ? styles.Rotate : ""}
                    />
                </div>
                {isLoggedIn && (
                    <div
                        className={styles.headComponent}
                        onClick={() => setmanageProfileOpen(!ManageProfileOpen)} // Mở/đóng menu khi click vào logo
                        ref={outsideClickRef}
                    >
                        <img className={styles.aclogo} src={ac} alt="logo" />
                        <span>{userName}</span>
                        {/* Menu dropdown cho Profile */}
                        {ManageProfileOpen && (
                            <div className={styles.manageMenu}>
                                <ul>
                                    <li
                                        className={`tab ${activeTab === "manageProfile" ? "active" : ""
                                            } `}
                                        onClick={() => handleTabClick("manageProfile")}
                                    >
                                        Chỉnh sửa profile{" "}
                                    </li>
                                    <li onClick={handleLogout}>Đăng xuất</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === "manageProfile" && (
                    <div className={styles.manageProfileContainer}>
                        <div className={styles.functionProfile}>
                            <ul>
                                <li
                                    className={activeSubTab2 === "lichKham" ? styles.active : ""}
                                    onClick={() => handlesubTabClick2("lichKham")}
                                >
                                    Lịch khám
                                </li>
                                <li
                                    className={activeSubTab2 === "hoSo" ? styles.active : ""}
                                    onClick={() => handlesubTabClick2("hoSo")}
                                >
                                    Hồ sơ
                                </li>
                                <li onClick={handleLogout}>Đăng xuất</li>
                            </ul>
                        </div>
                    </div>
                )}
                {activeSubTab2 === "lichKham" && activeTab === "manageProfile" && (
                    <div className={styles.lichkhamContainer}>
                        <LichKham></LichKham>
                    </div>
                )}
                {activeSubTab2 === "hoSo" && activeTab === "manageProfile" && (
                    <div className={styles.lichkhamContainer}>
                        <UserProfile></UserProfile>
                    </div>
                )}
                {!isLoggedIn && (
                    <div
                        className={`tab ${activeTab === "login" ? "active" : ""} ${styles.headComponentLogin
                            }`}
                        onClick={() => handleTabClick("login")}
                    >
                        Đăng nhập
                    </div>
                )}
            </div>
            {activeTab === "tongQuat" && (
                <>
                    <GeneralCheckup />
                </>
            )}
            {activeTab === "homepage" && (
                <>
                    <Homepage></Homepage>
                </>
            )}
            {activeTab === "login" && (
                <>
                    <Login></Login>
                </>
            )}
        </div>
    );
}

export default UserHP;