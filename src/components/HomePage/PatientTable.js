import React from 'react';
import './PatientTable.css';
const patients = [
    { id: 1, name: "Jenny Wilson", dateIn: "Dec 18, 2021", symptoms: "Geriatrician", status: "Confirmed" },
    { id: 2, name: "Albert Flores", dateIn: "Dec 18, 2021", symptoms: "Internist", status: "Incoming" },
    { id: 3, name: "Floyd Miles", dateIn: "Dec 18, 2021", symptoms: "Urogynecologist", status: "Confirmed" },
    { id: 4, name: "Marvin McKinney", dateIn: "Dec 18, 2021", symptoms: "Cardiologist", status: "Cancelled" },
    { id: 5, name: "Marvin McKinney", dateIn: "Dec 18, 2021", symptoms: "Cardiologist", status: "Cancelled" },
];

function PatientTable() {
    return (
        <><div className="patient-table2">
            <table className="patient-table">
                <thead>
                    <tr>
                        <th>Patient name</th>
                        <th>Date In</th>
                        <th>Symptoms</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.dateIn}</td>
                            <td>{patient.symptoms}</td>
                            <td className={`status ${patient.status.toLowerCase()}`}>{patient.status}</td>
                            <td>
                                <button className="table-logo1">✏️</button>
                                <button className="table-logo1">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default PatientTable;
