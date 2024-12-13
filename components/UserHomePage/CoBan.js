import React, { useState } from "react";
import styles from "./CoBan.module.css";
import cobanimg from '../../assets/images/cobanimg.png'
import h1 from '../../assets/images/imgkhamcoban.png'
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css";
import cm from "../../assets/images/cm.png"
import cm2 from "../../assets/images/imgkham2.png"
import CB1 from "./CB1"
const CoBan = () => {
    const [startDate, setStartDate] = useState(new Date()); // Khởi tạo ngày hiện tại
    const [isOpen, setIsOpen] = useState(false);
    const [Subtab4, setSubtab4] = useState('');
    const toggleDropdown = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };
    const handleSubtabChange4 = (tab) => {
        setSubtab4(tab); // Cập nhật subtab hiện tại
    };
    return (
        <div className={styles.UserHPContainer}>
            {Subtab4 === '' && (
                <div className={styles.container}>
                    <img src={cobanimg} alt="logo"></img>
                    <div className={styles.allLichContainer}>
                        <div className={styles.lichContainer}>
                            <div className={styles.inLichContainer1}>
                                <img src={h1} alt="logo"></img>
                                <div className={styles.ininLichContainer1}>
                                    <h1 onClick={() => { handleSubtabChange4('CB1') }}>Tầm soát bệnh tiêu chuẩn cho nam và nữ (DC2)</h1>
                                    <h2>Chỉ với 60 phút, bạn sẽ được sẽ được đánh giá sức  khỏe ban đầu thông qua bộ câu hỏi sàng lọc, đo chỉ số BMI và thăm khám cùng bác sĩ nội khoa (15 phút). Thực hiện các cận lâm sàng đánh giá lên tới 10 bệnh lý phổ biến ở nam và nữ (30 phút). Cuối cùng, bạn sẽ được bác sĩ tư vấn kết quả và kế hoạch sống thọ (15 phút), giúp bạn bảo vệ sức khỏe dài lâu.</h2>
                                    <h3>Gói khám được thực hiện tại Trung Tâm Tầm Soát Bệnh Doctor</h3>
                                    <h4>Thành phố Hồ Chí Minh</h4>

                                </div>

                            </div>
                            <div className={styles.inLichContainer2}>
                                <h1 onClick={toggleDropdown} style={{ cursor: 'pointer', color: '#61C9F6', fontSize: '20px' }}>
                                    {startDate.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}
                                </h1>
                                {isOpen && (
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        minDate={new Date()} // Chỉ cho phép chọn ngày trong tương lai
                                        inline
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                )}
                                <div style={{ display: 'flex' }}>
                                    <img style={{ width: '30px', height: '30px', marginTop: '5px' }} src={cm} alt="logo"></img>
                                    <h1>Lịch gói</h1>
                                </div>
                                <div className={styles.lichKhaDung}>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                </div>
                                <h2 className={styles.title}>Chọn và đặt (Phí đặt lịch 0đ)</h2>
                                <h1 style={{ textAlign: 'left', fontSize: '20px', marginTop: '5px' }}>Địa chỉ gói</h1>
                                <h1 style={{ textAlign: 'left', fontSize: '20px' }}>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn</h1>
                                <h2 style={{ textAlign: 'left', fontSize: '20px', fontWeight: '500', paddingBottom: '20px', borderBottom: '1px solid #000000' }}>429 Tô Hiến Thành, Phường 14, Quận 10, Tp. Hồ Chí Minh</h2>
                                <div style={{ textAlign: 'left', fontSize: '20px', color: '#68E1FC' }}>Giá khám:1.950.000đ</div>
                            </div>
                        </div>
                        <div className={styles.lichContainer}>
                            <div className={styles.inLichContainer1}>
                                <img src={cm2} alt="logo"></img>
                                <div className={styles.ininLichContainer1}>
                                    <h1> Gói khám sức khỏe tổng quát cơ bản cho nữ (PKYD1F)</h1>
                                    <h2>Gói khám bao gồm: Khám lâm sàng, Xét nghiệm máu, xét nghiệm chức năng gan, thận, chức năng chuyển hóa, chụp Xquang, siêu âm ổ bụng, điện tim. Gói khám tại Phòng khám Bệnh viện Đại học Y dược.</h2>
                                    <h3>Gói khám dành cho đối tượng trên 15 tuổi.</h3>
                                    <h4>Thành phố Hồ Chí Minh</h4>
                                </div>

                            </div>
                            <div className={styles.inLichContainer2}>
                                <h1 onClick={toggleDropdown} style={{ cursor: 'pointer', color: '#61C9F6', fontSize: '20px' }}>
                                    {startDate.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}
                                </h1>
                                {isOpen && (
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        minDate={new Date()} // Chỉ cho phép chọn ngày trong tương lai
                                        inline
                                        onClick={(event) => event.stopPropagation()}
                                    />
                                )}
                                <div style={{ display: 'flex' }}>
                                    <img style={{ width: '30px', height: '30px', marginTop: '5px' }} src={cm} alt="logo"></img>
                                    <h1>Lịch gói</h1>
                                </div>
                                <div className={styles.lichKhaDung}>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                    <div className={styles.item}>07:00-07:30</div>
                                </div>
                                <h2 className={styles.title}>Chọn và đặt (Phí đặt lịch 0đ)</h2>
                                <h1 style={{ textAlign: 'left', fontSize: '20px', marginTop: '5px' }}>Địa chỉ gói</h1>
                                <h1 style={{ textAlign: 'left', fontSize: '20px' }}>Phòng khám Bệnh viện Đại học Y Dược</h1>
                                <h2 style={{ textAlign: 'left', fontSize: '20px', fontWeight: '500', paddingBottom: '20px', borderBottom: '1px solid #000000' }}>20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</h2>
                                <div style={{ textAlign: 'left', fontSize: '20px', color: '#68E1FC' }}>Giá khám:1.950.000đ</div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {Subtab4 === 'CB1' && (
                <CB1></CB1>
            )}
        </div>
    );
};

export default CoBan;