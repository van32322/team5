import React, { useState } from 'react';
import './HomePage.css';
import logo from '../../assets/images/logo.png';
import ThreeDotsIcon from "./ThreeDotsIcon";
import DonutChart from "./DonutChartt";
import searchlogo from "../../assets/images/search-normal.png";
import notification from "../../assets/images/notification.png";
import up from "../../assets/images/arrow-up.png";
import PatientVisitChart from './PatientVisitChart';
import SortBy from './SortBy';
import PatientTable from './PatientTable';
import { Link } from 'react-router-dom';
import AppointmentsTable from './AppointmentsTable';
import CardList from './CardList'
import star from '../../assets/images/Star1.png'
import dblogo from '../../assets/images/element-3.png'
import aplogo from '../../assets/images/note.png'
import melogo from '../../assets/images/Medical-Kit.png'
import stlogo from '../../assets/images/setting-2.png'
import palogo from '../../assets/images/people.png'
import mslogo from '../../assets/images/chart-2.png'
import cclogo from '../../assets/images/credit-card.png'
function HomePage() {
    const handleDeleteCard = (index) => {
        const newCards = cards.filter((card, cardIndex) => cardIndex !== index);
        setCards(newCards);
    };
    const [cards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Tạo URL tạm thời từ ảnh người dùng chọn
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    // Hàm thêm thẻ
    const addCard = () => {
        if (selectedImage) {
            if (cards.length < 10) { // Giới hạn tối đa 10 thẻ
                setCards([...cards, selectedImage]);
                setIsModalOpen(false);
                setSelectedImage(null);
            } else {
                alert("Đã đạt giới hạn số thẻ.");
            }
        } else {
            alert("Vui lòng chọn một ảnh!");
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    // Hàm đóng modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [inputValue, setInputValue] = useState("");
    const [activeMenu, setActiveMenu] = useState('#dashboard'); // Trạng thái cho menu đang chọn

    const handleMenuClick = (id) => {
        setActiveMenu(id); // Cập nhật trạng thái menu đang chọn
    };

    const handleSearchClick = () => {
        alert(`Searching for: ${inputValue}`);
        // Thực hiện bất kỳ chức năng tìm kiếm nào
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const [sortOption, setSortOption] = useState('monthly');

    const handleSortChange = (value) => {
        setSortOption(value);
        // Thực hiện hành động thay đổi dữ liệu biểu đồ theo `value` nếu cần
    };

    return (
        <>
            <div className="container-homepagemain">
                <div className="sidebar-left">
                    <div className="sidebar-header">
                        <img src={logo} alt="logo" />
                        <h2>Group 5</h2>
                    </div>
                    <ul className="sidebar-menu">
                        <li
                            className={`menu-item ${activeMenu === '#dashboard' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('#dashboard')}
                        >
                            <a href="#dashboard">
                                <img className="icon" src={dblogo} alt="dblogo"></img> Dashboard
                            </a>
                        </li>
                        <li
                            className={`menu-item ${activeMenu === '#appointment' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('#appointment')}
                        >
                            <a href="#appointment">
                                <img className="icon" src={aplogo} alt="aplogo"></img> Appointment
                            </a>
                        </li>
                        <li
                            className={`menu-item ${activeMenu === '#doctor' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('#doctor')}
                        >
                            <a href="#doctor">
                                <img className="icon" src={melogo} alt="melogo"></img> Doctor
                            </a>
                        </li>
                        <li
                            className={`menu-item ${activeMenu === '#patient' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('#patient')}
                        >
                            <a href="#patient">
                                <img className="icon" src={palogo} alt="palogo"></img> Patient
                            </a>
                        </li>
                        <li
                            className={`menu-item ${activeMenu === '#messages' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('#messages')}
                        >
                            <a href="#messages">
                                <img className="icon" src={mslogo} alt="mslogo"></img> Messages
                            </a>
                        </li>
                        <li
                            className={`menu-item ${activeMenu === '#setting' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('#setting')}
                        >
                            <a href="#setting">
                                <img className="icon" src={stlogo} alt="stlogo"></img> Setting
                            </a>
                        </li>
                        <li
                            className={`menu-item ${activeMenu === '#payment' ? 'active' : ''}`}
                            onClick={() => handleMenuClick('#payment')}
                        >
                            <a href="#payment">
                                <img className="icon" src={cclogo} alt="cclogo"></img> Payment
                            </a>
                        </li>
                    </ul>
                    <div className="profile-container">
                        <div className="divider3"></div>
                        <p>Profile</p>
                        <div className="in-profile-container">
                            <img src={logo} alt="logo"></img>
                            <div className="in-in-profile-container">
                                <h1>receptionist</h1>
                                <h2>test@gmail.com</h2>
                            </div>
                        </div>
                        <Link to="/AuthPage" className="logout-container">Log out</Link>
                    </div>
                </div>

                {/* Conditionally render main-container and sidebar-right */}
                {activeMenu === '#dashboard' && (
                    <>
                        <div className="main-containt">
                            <div className="Header">Dashboard
                                <input type="text" value={inputValue} className="Search" onChange={handleInputChange} placeholder="Search type of keywords" />
                                <img className="searchlogo" src={searchlogo} alt="searchlogo" onClick={handleSearchClick} />
                                <div className="notification-container">
                                    <img className="notification" src={notification} alt="notification" />
                                </div>
                            </div>
                            <div className="mid-container">
                                <div className="small-mid-container1">
                                    <div className="earning-logo" />
                                    <div className="mid-text1">Earning</div>
                                    <div className="super-small-container">
                                        <div className="mid-text2">$12,34</div>
                                        <img src={up} alt="up" className="up-logo" />
                                        <div className="mid-text3">+ 201</div>
                                    </div>
                                </div>
                                <div className="small-mid-container1">
                                    <div className="new-patient-logo" />
                                    <div className="mid-text1">New patient</div>
                                    <div className="super-small-container">
                                        <div className="mid-text2">$12,34</div>
                                        <img src={up} alt="up" className="up-logo" />
                                        <div className="mid-text3">+ 201</div>
                                    </div>
                                </div>
                                <div className="small-mid-container1">
                                    <div className="new-appointment-logo" />
                                    <div className="mid-text1">New Appointment</div>
                                    <div className="super-small-container">
                                        <div className="mid-text2">$12,34</div>
                                        <img src={up} alt="up" className="up-logo" />
                                        <div className="mid-text3">+ 201</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mid-mid-container">
                                <div className="sort-container">
                                    <SortBy onChange={handleSortChange} />
                                </div>
                                <PatientVisitChart sortOption={sortOption} />
                            </div>
                            <div className="mid-mid-container">
                                <PatientTable />
                            </div>
                        </div>

                        <div className="sidebar-right">
                            <img src={logo} alt="logo" className="img-sidebar-right" />
                            <h2 htmlFor="Username">Dr.dilip Anmangandla, MD</h2>
                            <div className="container-homepage">
                                <div className="small-container">
                                    <div className="text">Appointment</div>
                                    <div className="info">4015</div>
                                </div>
                                <div className="divider"></div>
                                <div className="small-container">
                                    <div className="text">Total Patients</div>
                                    <div className="info">32.1k</div>
                                </div>
                                <div className="divider"></div>
                                <div className="small-container">
                                    <div className="text">Rates</div>
                                    <div className="info">4.8</div>
                                </div>
                            </div>
                            <div className="divider2"></div>
                            <div className="small-container2">
                                <div className="text">Upcoming Appointment</div>
                                <ThreeDotsIcon />
                            </div>
                            <div className="small-container3">
                                <p>Nội dung 1</p>
                                <p>Nội dung 2</p>
                                <p>Nội dung 3</p>
                            </div>
                            <div className="small-container4">
                                <p>Patient Satisfaction</p>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <DonutChart />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {activeMenu === '#appointment' && (
                    <>
                        <div className="appointment-maincontainer">
                            <div className="appointment-header">
                                <p className="appointment-header-text">Manage Appointments</p>
                                <input type="text" value={inputValue} className="Search" onChange={handleInputChange} placeholder="Search" />
                                <img className="searchlogo" src={searchlogo} alt="searchlogo" onClick={handleSearchClick} />
                            </div>
                            <div>
                                <AppointmentsTable />
                            </div>
                        </div>
                    </>
                )}
                {activeMenu === '#payment' && (
                    <>
                        <div className="appointment-maincontainer">
                            <div className="appointment-header">
                                <p className="appointment-header-text">Bank available</p>
                                <input type="text" value={inputValue} className="Search" onChange={handleInputChange} placeholder="Search" />
                                <img className="searchlogo" src={searchlogo} alt="searchlogo" onClick={handleSearchClick} />
                            </div>
                            <div className="payment-container">
                                <CardList cards={cards} onDelete={handleDeleteCard} />
                            </div>

                            <div className="payment-function">
                                <div>
                                    <button className="Button-payment" onClick={openModal}>Add payment method</button>
                                </div>
                            </div>
                            {/* Modal chọn ảnh */}
                            {isModalOpen && (
                                <div className="payment-modal">
                                    <div className="payment-modal-content">
                                        <span className="payment-close-button" onClick={closeModal}>&times;</span>
                                        <h3>Chọn hình ảnh thẻ ngân hàng</h3>
                                        <div className="image-options">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload} // Gọi hàm xử lý ảnh khi chọn ảnh
                                            />


                                        </div>
                                        {selectedImage && (
                                            <div className="image-preview">
                                                <img src={selectedImage} alt="Selected" />
                                            </div>
                                        )}
                                        <button className="Add-button" onClick={addCard} disabled={!selectedImage}>Add payment method</button>
                                    </div>

                                </div>
                            )}

                        </div>
                    </>
                )}
                {activeMenu === '#doctor' && (
                    <>
                        <div className="appointment-maincontainer">
                            <div className="appointment-header">
                                <p className="appointment-header-text">List doctor</p>
                                <input type="text" value={inputValue} className="Search" onChange={handleInputChange} placeholder="Search" />
                                <img className="searchlogo" src={searchlogo} alt="searchlogo" onClick={handleSearchClick} />
                            </div>
                            <div className="listdoctor-container">
                                <div className="doctor-container">
                                    <div className="head-doctor-container" >
                                        <img className="doctor-img" src={logo} alt="logo"></img>
                                        <p>4.5</p>
                                        <img className="star" src={star} alt='star'></img>
                                    </div>
                                    <h1>Ronald Spector</h1>
                                    <div className="main-doctor-container">
                                        <div className="doctor-info1">
                                            <h1>Anthesiih</h1>
                                            <h2>MBBS,FCCB</h2>
                                        </div>
                                        <div className="doctor-info2">
                                            <h1>Sun-Fri</h1>
                                            <h2>10:00Am to 1:00PM</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="doctor-container">
                                    <div className="head-doctor-container" >
                                        <img className="doctor-img" src={logo} alt="logo"></img>
                                        <p>4.5</p>
                                        <img className="star" src={star} alt='star'></img>
                                    </div>
                                    <h1>Ronald Spector</h1>
                                    <div className="main-doctor-container">
                                        <div className="doctor-info1">
                                            <h1>Anthesiih</h1>
                                            <h2>MBBS,FCCB</h2>
                                        </div>
                                        <div className="doctor-info2">
                                            <h1>Sun-Fri</h1>
                                            <h2>10:00Am to 1:00PM</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {activeMenu === '#patient' && (
                    <>
                        <div className="appointment-maincontainer">
                            <div className="appointment-header">
                                <p className="appointment-header-text">Patients</p>
                                <input type="text" value={inputValue} className="Search" onChange={handleInputChange} placeholder="Search" />
                                <img className="searchlogo" src={searchlogo} alt="searchlogo" onClick={handleSearchClick} />
                            </div>
                        </div>
                    </>
                )}
                {activeMenu === '#setting' && (
                    <>
                        <div className="appointment-maincontainer">
                            <div className="appointment-header">
                                <p className="appointment-header-text">Setting</p>
                                <input type="text" value={inputValue} className="Search" onChange={handleInputChange} placeholder="Search" />
                                <img className="searchlogo" src={searchlogo} alt="searchlogo" onClick={handleSearchClick} />
                            </div>
                        </div>
                    </>
                )}
                {activeMenu === '#messages' && (
                    <>
                        <div className="appointment-maincontainer">
                            <div className="appointment-header">
                                <p className="appointment-header-text">Messages</p>
                                <input type="text" value={inputValue} className="Search" onChange={handleInputChange} placeholder="Search" />
                                <img className="searchlogo" src={searchlogo} alt="searchlogo" onClick={handleSearchClick} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default HomePage;
