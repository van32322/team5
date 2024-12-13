import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy tham số trong URL
import Header from "./Header"
import styles from "./DoctorDetailDetail.module.css"
import cm from "../../assets/images/cm.png"
import axios from 'axios';
const DoctorDetail = () => {
    const { id } = useParams(); // Lấy id bác sĩ từ URL
    const [doctor, setDoctor] = useState(null);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // Dữ liệu mock bác sĩ (thay thế bằng dữ liệu thực tế từ API nếu cần)
    const mockDoctors = [
        {
            id: 1,
            name: "Dr. Nguyen A",
            specialty: "Cardiology",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
            description: "Dr. Nguyen A has over 10 years of experience in cardiology.",
        },
        {
            id: 2,
            name: "Dr. Tran B",
            specialty: "Dermatology",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
            description: "Dr. Tran B is a leading dermatologist specializing in skin treatments.",
        },
        {
            id: 3,
            name: "Dr. Le C",
            specialty: "Neurology",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
            description: "Dr. Le C is an expert in neurology with years of experience.",
        },
    ];

    useEffect(() => {
        const selectedDoctor = mockDoctors.find((doctor) => doctor.id === parseInt(id));
        setDoctor(selectedDoctor);
    }, [id]);

    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.UserHPContainer}>
                <Header></Header>
                <div className={styles.DTHeader}>
                    <img src={doctor.image} alt={doctor.name}></img>
                    <div>
                        <div className={styles.inCB1Header}>
                            <h1>{doctor.name}</h1>
                            <h2>{doctor.specialty}</h2>

                            <h5>{doctor.place}</h5>
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
            </div>
            <div >

            </div>
        </>
    );
};

export default DoctorDetail;
