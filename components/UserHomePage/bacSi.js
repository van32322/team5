import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import hook useNavigate
import Header from "./Header";
import styles from "./bacSi.module.css";
import background from "../../assets/images/background.png";
import Searchicon from "../../assets/images/SearchLogo.png";

const BacSi = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State để lưu giá trị tìm kiếm
    const [currentPage, setCurrentPage] = useState(1); // State để theo dõi trang hiện tại
    const doctorsPerPage = 5; // Số lượng bác sĩ hiển thị trên mỗi trang
    const navigate = useNavigate(); // Hook để điều hướng

    const mockDoctors = [
        {
            id: 1,
            name: "Dr. Nguyen A",
            specialty: "Cardiology",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
        },
        {
            id: 2,
            name: "Dr. Tran B",
            specialty: "Dermatology",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
        },
        {
            id: 3,
            name: "Dr. Le C",
            specialty: "Neurology",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
        },
        {
            id: 4,
            name: "Dr. Nguyen D",
            specialty: "Orthopedics",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
        },
        {
            id: 5,
            name: "Dr. Tran E",
            specialty: "Pediatrics",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
        },
        {
            id: 6,
            name: "Dr. Le F",
            specialty: "Gastroenterology",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
        },
        {
            id: 7,
            name: "Dr. Nguyen G",
            specialty: "Endocrinology",
            image: "https://via.placeholder.com/100",
            place: "228 Hoang VAn Thu",
        },
    ];

    useEffect(() => {
        setDoctors(mockDoctors);
        // Nếu muốn dùng fetch API, bạn có thể bật lại phần này:
        // fetch('/api/doctors')
        //   .then(response => response.json())
        //   .then(data => setDoctors(data))
        //   .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    const handleBookAppointment = (doctorId) => {
        navigate(`/bacSi/${doctorId}`); // Điều hướng tới tab bác sĩ chi tiết
    };

    // Hàm xử lý thay đổi tìm kiếm
    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Cập nhật giá trị tìm kiếm
    };

    // Lọc bác sĩ theo tên hoặc chuyên khoa
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Tính toán số trang
    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

    // Xác định bác sĩ cần hiển thị trên trang hiện tại
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    // Chuyển sang trang trước hoặc sau
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.UserHPContainer}>
            <Header />
            <div className={styles.midContainer1}>
                <img src={background} alt="logo" />
                <p>Nơi khởi nguồn sức khỏe</p>
                <div className={styles.SearchBar}>
                    <div className={styles.Searchinside}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm bác sĩ"
                            value={searchQuery}
                            onChange={handleSearch} // Gọi hàm xử lý khi thay đổi giá trị
                        />
                    </div>
                    <img src={Searchicon} alt="searchicon" />
                </div>
            </div>
            <div className={styles.title}>Bác sĩ</div>
            <div className={styles.doctorlist}>
                {currentDoctors.length > 0 ? (
                    currentDoctors.map((doctor) => (
                        <div key={doctor.id} className={styles.doctor}>
                            <img src={doctor.image} alt={doctor.name} />
                            <div className={styles.doctorInfo}>
                                <h3>{doctor.name}</h3>
                                <p>{doctor.specialty}</p>
                                <h4>{doctor.place}</h4>
                            </div>
                            <div
                                className={styles.button}
                                onClick={() => handleBookAppointment(doctor.id)} // Gọi hàm điều hướng
                            >
                                Đặt khám
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không tìm thấy bác sĩ phù hợp.</p>
                )}
            </div>

            {/* Phân trang */}
            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Trang trước
                </button>
                <span>{`Trang ${currentPage} của ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default BacSi;
