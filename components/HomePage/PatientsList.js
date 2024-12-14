// src/components/PatientsList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientList.module.css";  // Tạo CSS riêng cho bảng bệnh nhân
import logo from "../../assets/images/logo.png"; // Logo hoặc ảnh sử dụng trong modal

const PatientsList = () => {
    const [patients, setPatients] = useState([]);  // State chứa danh sách bệnh nhân
    const [loading, setLoading] = useState(true);  // Trạng thái tải dữ liệu
    const [selectedPatient, setSelectedPatient] = useState(null);  // Bệnh nhân đã chọn

    // Hàm gọi API để lấy danh sách bệnh nhân
    useEffect(() => {
        axios
            .get('https://your-backend-api.com/patients')  // API lấy danh sách bệnh nhân
            .then((response) => {
                setPatients(response.data);  // Lưu dữ liệu vào state
                setLoading(false);  // Dừng trạng thái tải dữ liệu
            })
            .catch((error) => {
                console.error("Error fetching patients:", error);
                setLoading(false);  // Dừng trạng thái tải dù có lỗi
            });
    }, []);

    // Hàm xóa bệnh nhân
    const deletePatient = (id) => {
        axios
            .delete(`https://your-backend-api.com/patients/${id}`)  // Gọi API xóa bệnh nhân
            .then(() => {
                setPatients(patients.filter((patient) => patient.id !== id));  // Xóa bệnh nhân khỏi state
            })
            .catch((error) => {
                console.error("Error deleting patient:", error);
            });
    };

    // Nếu đang tải dữ liệu thì hiển thị loading
    if (loading) {
        return <div>Loading patients...</div>;
    }

    return (
        <div className="patients-table-container">
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.phone}</td>
                            <td>{patient.age}</td>
                            <td>{patient.gender}</td>
                            <td style={{ textAlign: "center" }}>
                                <button className="more-info" onClick={() => setSelectedPatient(patient)}>
                                    More info
                                </button>
                            </td>
                            <td>
                                <button className="delete" onClick={() => deletePatient(patient.id)}>
                                    🗑
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button>Previous</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>Next</button>
            </div>

            {/* Modal hiển thị thông tin chi tiết bệnh nhân */}
            {selectedPatient && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Patient Information</h2>
                        <div>
                            <strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}
                        </div>
                        <div><strong>Phone Number:</strong> {selectedPatient.phone}</div>
                        <div><strong>Age:</strong> {selectedPatient.age}</div>
                        <div><strong>Gender:</strong> {selectedPatient.gender}</div>
                        <div>
                            <strong>Symptoms:</strong>
                            <textarea rows="3" defaultValue={selectedPatient.symptoms}></textarea>
                        </div>
                        <button className="medical-history-btn">Medical History</button>
                    </div>
                    <img
                        src={logo}
                        alt="logo"
                        style={{ width: "150px", margin: "-140px 0 0 -250px", zIndex: "1001" }}
                    />
                    <button className="close-btn" onClick={() => setSelectedPatient(null)}>
                        ✖
                    </button>
                </div>
            )}
        </div>
    );
};

export default PatientsList;
