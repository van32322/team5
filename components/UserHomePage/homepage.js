import React from "react";
import styles from "./UserHP.module.css"
import background from "../../assets/images/background.png";
import Searchicon from "../../assets/images/SearchLogo.png";
import AIlogo from "../../assets/images/image.png";
import m1 from "../../assets/images/m1.png";
import hoslogo from "../../assets/images/hospital2.png";
import acl from "../../assets/images/acl.png";
import acr from "../../assets/images/acr.png";
import doc from "../../assets/images/image3.png";
import adn from "../../assets/images/image4.png";
import kt from "../../assets/images/image5.png";
import acl2 from "../../assets/images/acl2.png";
import acr2 from "../../assets/images/acr2.png";
import hos1 from "../../assets/images/hos1.png";
import hos2 from "../../assets/images/hos2.png";
import hos3 from "../../assets/images/hos3.png";
import hos4 from "../../assets/images/hos4.png";
import hos5 from "../../assets/images/hos5.png";
import ad from "../../assets/images/ad.png";
import Header from './Header'
function Homepage() {
    return (
        <div>
            <div className={styles.UserHPContainer}>
                <Header></Header>
                <div className={styles.midContainer1}>
                    <img src={background} alt="logo"></img>
                    <p>Nơi khởi nguồn sức khỏe</p>
                    <div className={styles.SearchBar}>
                        <div className={styles.Searchinside}>
                            <input type="text" placeholder="Đọc câu hỏi với trợ lý AI" />
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
                        <div className={styles.ininbottomContainer}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;