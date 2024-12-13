import React, { useState } from "react";
import styles from "./TongQuat.module.css";
import imgkham from "../../assets/images/imgkham.png"
import khamcoban from "../../assets/images/khamcoban.png"
import khamvip from "../../assets/images/khamvip.png"
import khamnangcao from "../../assets/images/khamnangcao.png"
import khamnam from "../../assets/images/nam.png"
import khamnu from "../../assets/images/nu.png"
import CoBan from './CoBan.js'
import Header from './Header.js'
function TongQuat() {
    const [activeSubTab3, setActiveSubTab3] = useState('');
    const handlesubTabClick3 = (tab) => {
        if (tab !== activeSubTab3) {
            setActiveSubTab3(tab);
        }
    };
    return (
        <>
            <div className={styles.UserHPContainer}>
                <Header></Header>
                <div className={styles.container}>

                    {/* Tiêu đề */}<img className={styles.imgkham} src={imgkham} alt="kham"></img>
                    <h1 className={styles.title}>
                        Khám Tổng Quát
                    </h1>
                    {/* Tìm kiếm */}<div className={styles.sbContainer}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className={styles.searchInput}
                        />
                        <div className={styles.searchBox}>

                            <select className={styles.searchInput}>
                                <option>Khu vực</option>
                            </select>
                            <select className={styles.searchInput}>
                                <option>Danh mục</option>
                            </select>

                            <select className={styles.searchInput}>
                                <option>Mức giá</option>
                            </select>
                            <select className={styles.searchInput}>
                                <option>Cơ sở y tế</option>
                            </select>
                        </div>
                        <button className={styles.searchButton}>Tìm kiếm</button>
                    </div>

                    {/* Danh mục */}
                    <div className={styles.title2}>
                        Danh mục
                    </div>
                    <div className={styles.indicator}></div>
                    <div className={styles.categories}>
                        <div className={` ${activeSubTab3 === 'coBan' ? styles.activeSubTab3 : ''}`}
                            onClick={() => handlesubTabClick3('coBan')}
                        >
                            <img src={khamcoban} alt="khám cơ bản logo"></img>
                            <div className={styles.categoryItem}>Cơ bản</div>
                        </div>
                        <div className={` ${activeSubTab3 === 'Vip' ? styles.activeSubTab3 : ''}`}
                            onClick={() => handlesubTabClick3('Vip')}>
                            <img src={khamvip} alt="khám vip logo"></img>
                            <div className={styles.categoryItem}>Gói khám VIP</div>

                        </div>
                        <div className={` ${activeSubTab3 === 'nangCao' ? styles.activeSubTab3 : ''}`}
                            onClick={() => handlesubTabClick3('nangCao')}>
                            <img src={khamnangcao} alt="khám nâng cao logo"></img>
                            <div className={styles.categoryItem}>Nâng cao</div>
                        </div>
                        <div className={` ${activeSubTab3 === 'nam' ? styles.activeSubTab3 : ''}`}
                            onClick={() => handlesubTabClick3('nam')}
                        >
                            <img src={khamnam} alt="khám nam logo"></img>
                            <div className={styles.categoryItem}>Nam</div>
                        </div>
                        <div className={` ${activeSubTab3 === 'nu' ? styles.activeSubTab3 : ''}`}
                            onClick={() => handlesubTabClick3('nu')}
                        >
                            <img src={khamnu} alt="khám nữ logo"></img>
                            <div className={styles.categoryItem}>Nữ</div>
                        </div>
                    </div>
                    {activeSubTab3 === 'coBan' && (
                        <div className={styles.coBanContainer}>
                            <CoBan></CoBan>
                        </div>
                    )}
                    {/* Gói nổi bật */}
                    <div className={styles.title2}>
                        Gói nổi bật
                    </div>
                    <div className={styles.indicator}></div>
                    <div className={styles.featuredSection}>
                        <div className={styles.featuredList}>
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className={styles.featuredItem}>
                                    <p>Gói khám sức khỏe tổng quát cơ bản</p>
                                    <p>Giá: 2.000.000đ</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cơ sở y tế */}
                    <div className={styles.healthFacilities}>
                        <h2 className={styles.featuredTitle}>Cơ sở y tế</h2>
                        <div className={styles.facilityList}>
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className={styles.facilityItem}>
                                    Cơ sở {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TongQuat;
