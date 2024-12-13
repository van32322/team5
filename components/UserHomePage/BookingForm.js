// BookingForm.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./BookingForm.module.css"; // CSS cho form nhập liệu
import axios from 'axios'; // Dùng axios để gửi request tới backend
import Header from "./Header"
const BookingForm = () => {
    const { id } = useParams();
    const [facility, setFacility] = useState(null);
    const [patientInfo, setPatientInfo] = useState({
        name: "",
        phone: "",
        date: "",
        time: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Tìm cơ sở theo id
        const facilities = [
            {
                id: 1,
                name: "Cơ sở A",
                location: "Hà Nội",
                image: "https://via.placeholder.com/150",
                description: "Thông tin chi tiết về cơ sở A."
            },
            {
                id: 2,
                name: "Cơ sở B",
                location: "TP.HCM",
                image: "https://via.placeholder.com/150",
                description: "Thông tin chi tiết về cơ sở B."
            },
            {
                id: 3,
                name: "Cơ sở C",
                location: "Đà Nẵng",
                image: "https://via.placeholder.com/150",
                description: "Thông tin chi tiết về cơ sở C."
            }
        ];

        const selectedFacility = facilities.find(f => f.id === parseInt(id));
        setFacility(selectedFacility);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Gửi thông tin đến backend (dùng axios hoặc fetch)
        try {
            const response = await axios.post('/api/booking', patientInfo); // Giả sử API gửi dữ liệu đặt khám
            alert("Đặt khám thành công!");
            navigate("/"); // Điều hướng về trang chủ sau khi thành công
        } catch (error) {
            console.error("Đặt khám thất bại:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        }
    };

    const handleChange = (e) => {
        setPatientInfo({
            ...patientInfo,
            [e.target.name]: e.target.value
        });
    };

    if (!facility) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.bookingContainer}>
            <Header></Header>
            <div className={styles.DTHeader}>
                <img src={facility.image} alt={facility.name}></img>
                <div>
                    <div className={styles.inCB1Header}>
                        <h1>{facility.name}</h1>
                        <h2>{facility.location}</h2>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup2}>
                    <label htmlFor="name">Họ và tên:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={patientInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup2}>
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={patientInfo.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup2}>
                    <label htmlFor="date">Ngày khám:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={patientInfo.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup2}>
                    <label htmlFor="time">Giờ khám:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={patientInfo.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Xác nhận đặt khám</button>
            </form>
        </div>
    );
};

export default BookingForm;
