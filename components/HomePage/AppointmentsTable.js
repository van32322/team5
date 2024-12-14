import React, { useState, useEffect } from "react";
import axios from 'axios';  // Thêm axios để gọi API
import "./AppointmentsTable.css"; // Import CSS file
import logo from "../../assets/images/logo.png";

const AppointmentsTable = () => {
    const [appointments, setAppointments] = useState([]);  // State chứa danh sách cuộc hẹn
    const [selectedAppointment, setSelectedAppointment] = useState(null);  // State chứa cuộc hẹn đang chọn
    const [loading, setLoading] = useState(true);  // Trạng thái tải dữ liệu

    // Hàm gọi API để lấy dữ liệu cuộc hẹn
    useEffect(() => {
        axios.get('https://your-backend-api.com/appointments')  // Cập nhật URL API
            .then(response => {
                setAppointments(response.data);  // Lưu dữ liệu vào state
                setLoading(false);  // Dữ liệu đã được tải
            })
            .catch(error => {
                console.error("Error fetching appointments:", error);
                setLoading(false);  // Dừng trạng thái tải dù có lỗi
            });
    }, []);

    // Hàm xóa cuộc hẹn
    const deleteAppointment = (id) => {
        axios.delete(`https://your-backend-api.com/appointments/${id}`)  // Gọi API xóa cuộc hẹn
            .then(response => {
                setAppointments(appointments.filter(appointment => appointment.id !== id));  // Xóa khỏi danh sách
            })
            .catch(error => {
                console.error("Error deleting appointment:", error);
            });
    };

    // Hiển thị khi đang tải dữ liệu
    if (loading) {
        return <div>Loading appointments...</div>;
    }

    return (
        <div className="Appointment-table-container">
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Appointment Date & Time</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.firstName}</td>
                            <td>{appointment.lastName}</td>
                            <td>{appointment.phone}</td>
                            <td>{appointment.dateTime}</td>
                            <td>
                                <div className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <button className="more-info" onClick={() => setSelectedAppointment(appointment)}>
                                    more info
                                </button>
                            </td>
                            <td>
                                <button className="delete" onClick={() => deleteAppointment(appointment.id)}>
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

            {/* Modal hiển thị thông tin chi tiết */}
            {selectedAppointment && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Appointment Information</h2>
                        <div><strong>Name:</strong> {selectedAppointment.firstName} {selectedAppointment.lastName}</div>
                        <div><strong>Born:</strong> 12/03/1993</div>
                        <div><strong>Phone Number:</strong> {selectedAppointment.phone}</div>
                        <div><strong>Age:</strong> 31</div>
                        <div><strong>Gender:</strong> Male</div>
                        <div>
                            <strong>Symptoms:</strong>
                            <textarea rows="3" defaultValue="headache, vomiting"></textarea>
                        </div>
                        <button className="medical-history-btn">Medical History</button>
                    </div>
                    <img src={logo} alt="logo" style={{ width: "150px", margin: "-140px 0 0 -250px", indexZ: "1001" }}></img>
                    <button className="close-btn" onClick={() => setSelectedAppointment(null)}>
                        ✖
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppointmentsTable;
