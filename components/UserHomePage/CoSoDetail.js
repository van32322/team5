import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CoSoDetail.module.css";
import Header from './Header';
import test from '../../assets/images/test.png';

const CoSoDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [facility, setFacility] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // Dữ liệu cơ sở
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

    useEffect(() => {
        const selectedFacility = facilities.find(f => f.id === parseInt(id));
        if (selectedFacility) {
            setFacility(selectedFacility);
            setError(false);
        } else {
            setFacility(null);
            setError(true);
            navigate("/"); // Quay lại trang chủ nếu không tìm thấy cơ sở
        }
    }, [id, navigate]);

    if (error) {
        return <div className={styles.errorContainer}><h2>Cơ sở không tồn tại.</h2></div>;
    }

    if (!facility) {
        return <div>Loading...</div>;
    }

    // Điều hướng khi nhấn vào nút "Xác nhận đặt khám"
    const handleBookingClick = () => {
        navigate(`/booking/${facility.id}`);
    };

    return (
        <div className={styles.UserHPContainer}>
            <Header />
            <div className={styles.facilityItem}>
                <img
                    src={facility.image}
                    alt={facility.name}
                    className={styles.facilityImage}
                />
                <div className={styles.facilityInfo}>
                    <h3 className={styles.facilityName}>{facility.name}</h3>
                    <p className={styles.facilityLocation}>{facility.location}</p>
                </div>
            </div>
            <div className={styles.P}>Thông tin</div>
            <img src={test} alt="logologo" className={styles.imgtest}></img>
            <p className={styles.PPPP}>{facility.description}</p>
            <button className={styles.submitButton} onClick={handleBookingClick}>
                Xác nhận đặt khám
            </button>
        </div>
    );
};

export default CoSoDetail;
