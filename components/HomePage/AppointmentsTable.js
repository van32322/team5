import React, { useState } from "react";
import "./AppointmentsTable.css"; // Import CSS file
import logo from "../../assets/images/logo.png"
const AppointmentsTable = () => {
    const [appointments, setAppointments] = useState([
        { firstName: "Jane", lastName: "Cooper", phone: "+91 9876543210", dateTime: "13-Aug-2023 at 10:00 AM", status: "Open" },
        { firstName: "Wade", lastName: "Warren", phone: "+91 9876543210", dateTime: "13-Aug-2023 at 10:00 AM", status: "Booked" },
        { firstName: "Brooklyn", lastName: "Simmons", phone: "+91 9876543210", dateTime: "13-Aug-2023 at 10:00 AM", status: "Completed" },
        { firstName: "Cameron", lastName: "Williamson", phone: "+91 9876543210", dateTime: "13-Aug-2023 at 10:00 AM", status: "Open" },
        { firstName: "Savannah", lastName: "Nguyen", phone: "+91 9876543210", dateTime: "13-Aug-2023 at 10:00 AM", status: "Open" },
        { firstName: "Darlene", lastName: "Robertson", phone: "+91 9876543210", dateTime: "13-Aug-2023 at 10:00 AM", status: "Completed" },
        { firstName: "Ronald", lastName: "Richards", phone: "+91 9876543210", dateTime: "13-Aug-2023 at 10:00 AM", status: "Open" },
        { firstName: "Kathryn", lastName: "Murphy", phone: "+91 9876543210", dateTime: "13-Aug-2023 at 10:00 AM", status: "Open" },
        { firstName: "Darrell", lastName: "Steward", phone: "+91 9876543210", dateTime: "13-Aug-2023 at 10:00 AM", status: "Open" },
        { firstName: "Johnson", lastName: "Christopher", phone: "+91 7631286961", dateTime: "17-Aug-2023 at 15:30 PM", status: "Open" },
    ]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const deleteAppointment = (index) => {
        setAppointments(appointments.filter((_, i) => i !== index));
    };

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
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.firstName}</td>
                            <td>{appointment.lastName}</td>
                            <td>{appointment.phone}</td>
                            <td>{appointment.dateTime}</td>
                            <td><div className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</div></td>
                            <td style={{ textAlign: 'center' }}>
                                <button className="more-info" onClick={() => setSelectedAppointment(appointment)}>
                                    more info
                                </button>
                            </td>
                            <td>
                                <button className="delete" onClick={() => deleteAppointment(index)}>
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

                        <h2>Information Appointments</h2>
                        <div><strong>Name:</strong> {selectedAppointment.firstName} {selectedAppointment.lastName}</div>
                        <div><strong>Born:</strong> 12/03/1993</div>
                        <div><strong>Number Phone:</strong> {selectedAppointment.phone}</div>
                        <div><strong>Old:</strong> 31</div>
                        <div><strong>Sex:</strong> Male</div>
                        <div>
                            <strong>Suffer:</strong>
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
