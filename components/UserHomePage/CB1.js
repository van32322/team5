
import React, { useState } from 'react';
import styles from './CB1.module.css';
import h1 from '../../assets/images/imgkhamcoban.png'
import cm from "../../assets/images/cm.png"
import hh from "../../assets/images/hh.png"
import axios from 'axios';
const CB1 = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        phone: '',
        email: '',
        birthYear: '',
        city: '',
        district: '',
        address: '',
        reason: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Các dữ liệu cần gửi về BE, không bao gồm ảnh
        const data = {
            fullName: formData.fullName,
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            birthYear: formData.birthYear,
            city: formData.city,
            district: formData.district,
            address: formData.address,
            reason: formData.reason,
            image: cm,  // Đây là ảnh bạn đã nhận từ BE, sử dụng trực tiếp mà không phải gửi lại.
        };

        try {
            const response = await axios.post('http://localhost:5000/api/create-clinic', data);
            console.log('Response:', response.data);
        } catch (err) {
            console.error('Error:', err);
        }
    };
    return (
        <>
            <div className={styles.CB1Container}>
                <div className={styles.CB1Header}>
                    <img src={h1} alt="logo"></img>
                    <div>
                        <div className={styles.inCB1Header}>
                            <h1>Đặt lịch khám</h1>
                            <h2>Tầm soát bệnh tiêu chuẩn cho nam và nữ (DC2)</h2>
                            <div style={{ display: 'flex' }}>
                                <img style={{ width: '22px', height: '22px' }} src={cm} alt="logo"></img>
                                <h3>07:00 - 07:30 - Thứ 7 - 16/11/2024</h3>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <img style={{ width: '22px', height: '22px' }} src={hh} alt="logo"></img>
                                <h4>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn</h4>
                            </div>
                            <h5>429 Tô Hiến Thành, Phường 14, Quận 10, Tp. Hồ Chí Minh</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.priceContainer}>
                    <div className={styles.logo}></div>
                    <div>
                        <h1>Giá khám</h1>
                        <h1>1.950.000</h1>
                    </div>
                </div>

            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Họ Tên"
                    className={styles.fullNameInput}
                    required
                />
                <p>Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú</p>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={styles.genderSelect}
                    required
                >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Số Điện Thoại"
                    className={styles.phoneInput}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={styles.emailInput}
                    required
                />
                <input
                    type="number"
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleChange}
                    placeholder="Năm Sinh"
                    className={styles.birthYearInput}
                    required
                />
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Thành Phố"
                    className={styles.cityInput}
                    required
                />
                <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Quận/Huyện"
                    className={styles.cityInput}
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Địa chỉ cụ thể"
                    className={styles.cityInput}
                    required
                />
                <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Lý do khám"
                    className={styles.reasonTextarea}
                    required
                />
                <button type="submit" className={styles.submitButton}>Xác nhận đặt khám</button>
            </form>
            <div className={styles.thanhToan}>
                <div className={styles.logo}></div>
                <h1>Thanh toán sau tại cơ sở y tế</h1>
            </div>
            <div className={styles.hoaDonContainer}>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div>Giá Khám </div>
                    <div style={{ marginLeft: '340px', textAlign: 'right' }}>1.950.000đ</div>
                </div>
                <div style={{ display: 'flex', paddingBottom: '20px', borderBottom: '1px solid black' }}>
                    <div>Phí đặt lịch </div>
                    <div style={{ marginLeft: '330px', textAlign: 'right' }}>Miễn phí</div>
                </div>
                <div style={{ display: 'flex', paddingTop: '20px' }}>
                    <div>Tổng cộng </div>
                    <div style={{ marginLeft: '330px', textAlign: 'right' }}>1.950.000đ</div>
                </div>
            </div>
            <p className={styles.pa}>Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm thủ tục khám</p>
            <div className={styles.luuYContainer}>
                <h1>LƯU Ý</h1>
                <h1>
                    Thông tin anh/chị cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông tin anh/chị vui lòng:

                </h1>
                <ul style={{
                    textAlign: 'left',
                    fontSize: '15px',
                    fontWeight: 'bold',
                }}>
                    <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"</li>
                    <li>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần Văn Phú</li>
                </ul>
            </div>
            <div className={styles.dieuKhoanContainer}>
                Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với Điều khoản sử dụng dịch vụ của chúng tôi.
            </div>
        </>
    );
};


export default CB1;