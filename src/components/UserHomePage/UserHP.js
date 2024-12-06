import React, { useState, useEffect, useRef } from 'react';
import styles from './UserHP.module.css';  // Import CSS module
import vector from '../../assets/images/Vector.png';
import ac from '../../assets/images/account_circle.png'
import background from '../../assets/images/background.png'
import Searchicon from '../../assets/images/SearchLogo.png'
import AIlogo from '../../assets/images/image.png'
import m1 from '../../assets/images/m1.png'
import hoslogo from '../../assets/images/hospital2.png'
import acl from '../../assets/images/acl.png'
import acr from '../../assets/images/acr.png'
import doc from '../../assets/images/image3.png'
import adn from '../../assets/images/image4.png'
import kt from '../../assets/images/image5.png'
import acl2 from '../../assets/images/acl2.png'
import acr2 from '../../assets/images/acr2.png'
import hos1 from '../../assets/images/hos1.png'
import hos2 from '../../assets/images/hos2.png'
import hos3 from '../../assets/images/hos3.png'
import hos4 from '../../assets/images/hos4.png'
import hos5 from '../../assets/images/hos5.png'
import ad from '../../assets/images/ad.png'
import ll from '../../assets/images/loginlogo.png'
import { Link } from 'react-router-dom'
import OTPInput from './OTPInput'
import cc from '../../assets/images/cc.png'
import LichKham from './LichKham'
import UserProfile from './UserProfile'
import GeneralCheckup from './GeneralCheckup';
function UserHP() {
    const onOtpSubmit = (otp) => {
        alert("Đăng nhập thành công với mã otp: " + otp)
    };
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeSubTab2, setActiveSubTab2] = useState('lichKham');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);  // Quản lý trạng thái mở/đóng menu
    const [ManageProfileOpen, setmanageProfileOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isdkModalOpen, setIsdkModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const outsideClickRef = useRef(null); // Tham chiếu cho ngoài vùng logo và menu
    const [activeTab, setActiveTab] = useState('homepage');
    const [activesubTab, setActivesubTab] = useState('login2');
    const [passwordVisible, setPasswordVisible] = useState({
        password1: false,
        password2: false,
        password3: false
    });
    const [token, setToken] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOpenGender, setIsOpenGender] = useState(false);
    const [isOpenRole, setIsOpenRole] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("Chọn quốc gia");
    const [selectedGender, setSelectedGender] = useState("Chọn giới tính");
    const [selectedRole, setSelectedRole] = useState("Chọn vai trò");
    const [userName, setUserName] = useState('');
    const togglePasswordVisibility = (id) => {
        setPasswordVisible(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Đảo trạng thái của input tương ứng
        }));
    };
    const handleGửiOTPClick = () => {
        setIsModalOpen(true); // Open the OTP modal
    };
    const genders = ["Nam", "Nữ", "Khác"];
    const roles = ["Bác sĩ", "Bệnh nhân", "Giáo sư"];
    // Ref để kiểm tra click ngoài dropdown
    const genderRef = useRef(null);
    const dkRef = useRef(null);
    const roleRef = useRef(null);
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the OTP modal
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                outsideClickRef.current &&
                !outsideClickRef.current.contains(event.target)
            ) {
                setmanageProfileOpen(false);  // Đóng menu khi click ra ngoài
            }
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
        };


        document.addEventListener('mousedown', handleClickOutside);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);
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

    const handleTabClick = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
        }
        if (tab !== 'manageProfile') {
            setActiveSubTab2('lichKham');
        }
    };
    const handlesubTabClick = (tab) => {
        if (tab !== activesubTab) {
            setActivesubTab(tab);
        }
    };
    const countries = [
        "Vietnam (+84)",
        "United States (+1)",
        "Canada (+1)",
        "Australia (+61)",
        "Japan (+81)",
    ];
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleLoginSuccess = async (phone, password) => {
        try {
            const response = await fetch('https://your-api-url.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone,
                    password: password,
                }),
            });

            const result = await response.json();

            // Kiểm tra nếu đăng nhập thành công
            if (result.status === 'success') {
                setIsLoggedIn(true);
                setUserName(result.data.userName); // Lưu tên người dùng
                setToken(result.data.token); // Lưu token (nếu cần)
                localStorage.setItem('token', result.data.token); // Lưu token vào localStorage (nếu cần)
            } else {
                // Xử lý khi đăng nhập thất bại
                alert(result.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    const handleLogout = () => {
        // Cập nhật trạng thái khi đăng xuất
        setIsLoggedIn(false);
        setUserName('');
        setToken('');
        localStorage.removeItem('token');
        setActiveTab('homepage');
    };
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsDropdownOpen(false);
    };
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setIsOpenGender(false);
    };
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
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
        formData.append("email", Email);
        formData.append("password", password);
        formData.append("gender", selectedGender);
        formData.append("roleid", selectedRole); // Sửa 'role' thành 'roleid' cho phù hợp với backend
        formData.append("phoneNumber", phone);
        formData.append("positionId", "defaultPositionId"); // Nếu có giá trị mặc định
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

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const data = {
            phone,
            password,
        };

        try {
            // Gửi dữ liệu đến backend (sử dụng fetch hoặc axios)
            const response = await fetch('https://your-api-url.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Đăng nhập thành công
                setIsLoginModalOpen(true);
                setIsLoggedIn(true);
                handleLoginSuccess(phone, password) // Hiển thị modal khi đăng nhập thành công
            } else {
                // Đăng nhập thất bại, hiển thị thông báo lỗi
                setErrorMessage(result.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            setErrorMessage('Có lỗi xảy ra khi gửi yêu cầu.');
        }
    };
    const handlesubTabClick2 = (tab) => {
        if (tab !== activeSubTab2) {
            setActiveSubTab2(tab);
        }
    };

    return (
        <div className={styles.UserHPContainer}>
            <div className={styles.UserHPHeader}>
                <div className={styles.HeaderP} onClick={() => handleTabClick('homepage')}>
                    <h1>MEDICAL</h1>
                    <h2>APPOINTMENT</h2>
                </div>

                {/* Đặt khám */}
                <div
                    className={styles.headComponent}  // Áp dụng class quay khi menu mở
                    onClick={() => setIsOpen(!isOpen)}  // Mở/đóng menu khi click vào logo
                    ref={outsideClickRef}
                >
                    Đặt khám
                    <img src={vector} alt="logo" className={isOpen ? styles.Rotate : ''} />
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
                    <img src={vector} alt="logo" className={isOpen ? styles.Rotate : ''} />
                </div>

                {isLoggedIn && (

                    <div className={styles.headComponent} onClick={() => setmanageProfileOpen(!ManageProfileOpen)}  // Mở/đóng menu khi click vào logo
                        ref={outsideClickRef}>
                        <img className={styles.aclogo} src={ac} alt="logo" />
                        <span>{userName}</span>
                        {/* Menu dropdown cho Profile */}
                        {ManageProfileOpen && (
                            <div className={styles.manageMenu}>
                                <ul>
                                    <li className={`tab ${activeTab === 'manageProfile' ? 'active' : ''} `}
                                        onClick={() => handleTabClick('manageProfile')}
                                    >Chỉnh sửa profile </li>
                                    <li onClick={handleLogout}>Đăng xuất</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'manageProfile' && (
                    <div className={styles.manageProfileContainer}>
                        <div className={styles.functionProfile}>
                            <ul>
                                <li
                                    className={activeSubTab2 === 'lichKham' ? styles.active : ''}
                                    onClick={() => handlesubTabClick2('lichKham')}
                                >
                                    Lịch khám
                                </li>
                                <li
                                    className={activeSubTab2 === 'hoSo' ? styles.active : ''}
                                    onClick={() => handlesubTabClick2('hoSo')}
                                >
                                    Hồ sơ
                                </li>
                                <li onClick={handleLogout} >Đăng xuất</li>
                            </ul>
                        </div>
                    </div>
                )}
                {activeSubTab2 === 'lichKham' && activeTab === 'manageProfile' && (
                    <div className={styles.lichkhamContainer}>
                        <LichKham></LichKham>
                    </div>
                )}
                {activeSubTab2 === 'hoSo' && activeTab === 'manageProfile' && (
                    <div className={styles.lichkhamContainer}>
                        <UserProfile></UserProfile>
                    </div>
                )}
                {!isLoggedIn && (
                    <div
                        className={`tab ${activeTab === 'login' ? 'active' : ''} ${styles.headComponentLogin}`}
                        onClick={() => handleTabClick('login')}
                    /*onClick={() => setIsLoggedIn(true)}*/
                    >
                        Đăng nhập
                    </div>
                )}

            </div>
            {activeTab === 'tongQuat' && (
                <GeneralCheckup />
            )}
            {activeTab === 'homepage' && (
                <>
                    <div className={styles.midContainer1}>
                        <img src={background} alt="logo"></img>
                        <p>Nơi khởi nguồn sức khỏe</p>
                        <div className={styles.SearchBar}>
                            <div className={styles.Searchinside}>
                                <input
                                    type="text"
                                    placeholder="Đọc câu hỏi với trợ lý AI"
                                />
                            </div>
                            <img src={Searchicon} alt="searchicon"></img>
                        </div>
                        <img className={styles.AIlogo} src={AIlogo} alt="AIlogo"></img>
                        <div className={styles.SmallmidContainer1}>
                            <div className={styles.InSmallmidContainer1}>
                                <img src={m1} alt="m1logo"></img>
                                <div className={styles.ininmidcontainer1}>
                                    <h1>
                                        <span>Bị gan nhiễm mỡ có cần uống thuốc không ?</span>
                                        <span>Bị gan nhiễm mỡ có cần uống thuốc không ?</span>
                                    </h1>
                                </div>
                            </div>
                            <div className={styles.InSmallmidContainer1}>
                                <img src={m1} alt="m1logo"></img>
                                <div className={styles.ininmidcontainer1}>
                                    <h1>
                                        <span>Bị gan nhiễm mỡ có cần uống thuốc không ?</span>
                                        <span>Bị gan nhiễm mỡ có cần uống thuốc không ?</span>
                                    </h1>
                                </div>
                            </div>
                            <div className={styles.InSmallmidContainer1}>
                                <img src={m1} alt="m1logo"></img>
                                <div className={styles.ininmidcontainer1}>
                                    <h1>
                                        <span>Bị gan nhiễm mỡ có cần uống thuốc không ?</span>
                                        <span>Bị gan nhiễm mỡ có cần uống thuốc không ?</span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.midContainer2}>
                        <p>Dịch vụ toàn diện</p>
                        <div className={styles.inmidContainer2}>
                            <img src={acl} alt="acl"></img>
                            <div className={styles.ininmidContainer2}>
                                <h2>
                                    <span>
                                        <div className={styles.BoxContainer}>
                                            <img src={hoslogo} alt="hospital logo"></img>
                                            <h1>Đặt khám tại cơ sở</h1>
                                        </div>
                                        <div className={styles.BoxContainer}>
                                            <img src={doc} alt="doc"></img>
                                            <h1>Đặt khám theo bác sĩ</h1>
                                        </div>
                                        <div className={styles.BoxContainer}>
                                            <img src={adn} alt="adn"></img>
                                            <h1>Đặt lịch xét nghiệm</h1>
                                        </div>
                                        <div className={styles.BoxContainer}>
                                            <img src={kt} alt="kt logo"></img>
                                            <h1>Đặt lịch tiêm phòng</h1>
                                        </div>
                                    </span>
                                    <span>
                                        <div className={styles.BoxContainer}>
                                            <img src={hoslogo} alt="hospital logo"></img>
                                            <h1>Đặt khám tại cơ sở</h1>
                                        </div>
                                        <div className={styles.BoxContainer}>
                                            <img src={doc} alt="doc"></img>
                                            <h1>Đặt khám theo bác sĩ</h1>
                                        </div>
                                        <div className={styles.BoxContainer}>
                                            <img src={adn} alt="adn"></img>
                                            <h1>Đặt lịch xét nghiệm</h1>
                                        </div>
                                        <div className={styles.BoxContainer}>
                                            <img src={kt} alt="kt logo"></img>
                                            <h1>Đặt lịch tiêm phòng</h1>
                                        </div>
                                    </span>
                                </h2>
                            </div>
                            <img src={acr} alt="acr"></img>
                        </div>
                    </div>
                    <div className={styles.midContainer3}>
                        <p>Được tin tưởng hợp tác và đồng hành</p>
                        <div className={styles.inmidContainer3}>
                            <img src={acl2} alt="acl"></img>
                            <div className={styles.ininmidContainer3}>
                                <h3>
                                    <span>
                                        <img src={hos1} alt="hos1"></img>
                                        <img src={hos2} alt="hos2"></img>
                                        <img src={hos3} alt="hos3"></img>
                                        <img src={hos4} alt="hos4"></img>
                                        <img src={hos5} alt="hos5"></img>
                                    </span>
                                    <span>
                                        <img src={hos1} alt="hos1"></img>
                                        <img src={hos2} alt="hos2"></img>
                                        <img src={hos3} alt="hos3"></img>
                                        <img src={hos4} alt="hos4"></img>
                                        <img src={hos5} alt="hos5"></img>
                                    </span>
                                </h3>
                            </div>
                            <img src={acr2} alt="acr"></img>
                        </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        <img src={ad} alt="ad"></img>
                        <p>Cơ sở được đặt khám nhiều nhất</p>
                        <div className={styles.inbottomContainer}>
                            <div className={styles.ininbottomContainer}>

                            </div>
                        </div>
                    </div>
                </>
            )}
            {activeTab === 'login' && (
                <>
                    <div className={styles.LoginContainer}>
                        <img src={ll} alt="img"></img>
                        <div className={styles.inLoginContainer}>
                            <div className={styles.tabs2}>
                                <div
                                    className={`${activesubTab === 'login2' ? styles.active : ''} ${styles.intab}`}
                                    onClick={() => handlesubTabClick('login2')}
                                >
                                    Đăng nhập
                                </div>
                                <div
                                    className={`${activesubTab === 'register' ? styles.active : ''} ${styles.intab}`}
                                    onClick={() => handlesubTabClick('register')}
                                >
                                    Đăng ký
                                </div>
                                {/* Đường indicator di chuyển */}
                                <div
                                    className={`${styles.indicator2} ${activesubTab === 'login2' ? styles.left : styles.right}`}
                                ></div>
                            </div>
                            {activesubTab === 'login2' && (
                                <form className={styles.form} onSubmit={handleLoginSubmit}>
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
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="password">Mật Khẩu</label>
                                        <div className={styles.passwordWrapper}>
                                            <input
                                                type={passwordVisible.password1 ? "text" : "password"}
                                                id="password1"
                                                placeholder="Nhập Mật Khẩu........."
                                                className={styles.inputField}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('password1')}
                                                className={styles.togglePassword}
                                            >
                                                {passwordVisible.password1 ? "👁️" : "🙈"}
                                            </button>
                                        </div>
                                        <div className={styles.options}>
                                            <input type="checkbox" />
                                            <label>
                                                Ghi nhớ mật khẩu
                                            </label>
                                            <a className={styles.forgotPassword} onClick={() => handlesubTabClick('forgetpass')}>
                                                Quên mật khẩu?
                                            </a>
                                        </div>
                                        <button type="submit" className={styles.LoginButton}>Đăng nhập</button>
                                        <div className={styles.indicator3}></div>
                                        <div className={styles.space}>
                                            <div className={styles.text}>
                                                <span>Chưa có tài khoản?</span><a onClick={() => handlesubTabClick('register')}>Đăng ký ngay</a></div>
                                        </div>
                                    </div>
                                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                                    {isLoginModalOpen && (
                                        <div className={styles.modalOverlay}>
                                            <div className={styles.dangkiModalContent}>
                                                <p>Đăng nhập thành công</p>
                                                <img src={cc} alt="cc" />
                                            </div>
                                        </div>
                                    )}
                                </form>

                            )}
                            {activesubTab === 'forgetpass' && (
                                <form className={styles.form}>
                                    <div className={styles.phone}>
                                        <label htmlFor="phoneRegister">Số Điện Thoại</label>
                                        <div className={styles.phone2}>
                                            <div className={styles.chooseCountry} onClick={toggleDropdown}>
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
                                    <div className={styles.OTPButton} onClick={handleGửiOTPClick}>Gửi OTP
                                        {/* Modal for OTP input */}

                                    </div>
                                    {isModalOpen && (
                                        <div className={styles.modalOverlay}>
                                            <div className={styles.modalContent}>
                                                <button onClick={handleCloseModal} className={styles.closeButton}>X</button>
                                                <h2>Nhập mã OTP vừa gửi đến số</h2>
                                                <OTPInput length={6} onOtpSubmit={onOtpSubmit}
                                                />
                                                <button className={styles.ttButton} type="submit">Tiếp tục</button>
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
                                            <span>Đã có tài khoản?</span><a onClick={() => handlesubTabClick('login2')}>Đăng nhập</a>

                                        </div>
                                    </div>
                                </form>
                            )}
                            {activesubTab === 'register' && (
                                <>
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
                                                    onClick={() => togglePasswordVisibility('password2')}
                                                    className={styles.togglePassword}
                                                >
                                                    {passwordVisible.password2 ? "👁️" : "🙈"}
                                                </button>
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label htmlFor="password">Mật Khẩu xác thực</label>
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
                                                        onClick={() => togglePasswordVisibility('password3')}
                                                        className={styles.togglePassword}
                                                    >
                                                        {passwordVisible.password3 ? "👁️" : "🙈"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.option2}>
                                            <div ref={genderRef}>
                                                <button type="button" onClick={() => setIsOpenGender(!isOpenGender)}>{selectedGender}</button>
                                                {isOpenGender && (
                                                    <div className={styles.dropdownMenu}>
                                                        {genders.map((gender, index) => (
                                                            <div key={index} className={styles.dropdownItem} onClick={() => handleGenderSelect(gender)}>

                                                                {gender}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div ref={roleRef}>
                                                <button type="button" onClick={() => setIsOpenRole(!isOpenRole)}>
                                                    {selectedRole}
                                                </button>
                                                {isOpenRole && (
                                                    <div className={styles.dropdownMenu}>
                                                        {roles.map((role, index) => (
                                                            <div key={index} className={styles.dropdownItem} onClick={() => handleRoleSelect(role)}>
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
                                                <img src={selectedImage} alt="Selected" style={{ border: "3px solid black", width: "100px", height: "100px", marginTop: "10px" }} />
                                            </div>
                                        )}
                                        <button type="submit" className={styles.RegisterButton} >Đăng ký</button>
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
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserHP;
