import React, { useState } from "react";
import styles from "./CoSo.module.css";
import Header from "./Header"
import Home from "../../assets/images/home.png"
import { useNavigate } from "react-router-dom";
const CoSo = () => {

    const navigate = useNavigate();
    const handleFacilityClick = (id) => {
        // Điều hướng đến trang chi tiết của cơ sở
        navigate(`/CoSo/${id}`);
    };
    const facilities = [
        {
            id: 1,
            name: "Cơ sở A",
            location: "Hà Nội",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 2,
            name: "Cơ sở B",
            location: "TP.HCM",
            image: "https://via.placeholder.com/150"
        },
        {
            id: 3,
            name: "Cơ sở C",
            location: "Đà Nẵng",
            image: "https://via.placeholder.com/150"
        }
    ];
    return (
        <div className={styles.UserHPContainer}>
            <Header />
            <div className={styles.Header} style={{ display: "flex" }}>
                <img src={Home} alt="logo"></img>
                <p>Đặt khám cơ sở</p>
            </div>
            <div className={styles.facilityList}>
                {facilities.map(facility => (
                    <div key={facility.id} className={styles.facilityItem}>
                        <img src={facility.image} alt={facility.name} className={styles.facilityImage} />
                        <div className={styles.facilityInfo}>
                            <h3
                                className={styles.facilityName}
                                onClick={() => handleFacilityClick(facility.id)} // Gọi hàm khi nhấn
                            >
                                {facility.name}
                            </h3>
                            <p className={styles.facilityLocation}>{facility.location}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
};
export default CoSo;