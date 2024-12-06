import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

function PatientVisitChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Patient Visit',
                data: [120, 60, 80, 40, 60, 50, 150, 200, 180, 120, 160, 100], // Dữ liệu mẫu
                fill: true, // Đổ bóng mờ
                backgroundColor: 'rgba(66, 135, 245, 0.2)', // Màu bóng mờ
                borderColor: '#4287f5', // Màu đường viền
                borderWidth: 2,
                tension: 0.4, // Độ cong của đường
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Ẩn chú thích
            },
            title: {
                display: true,
                text: 'Patient Visit',
                font: {
                    size: 16,
                    weight: 'bold',
                },
                align: 'start', // Canh trái
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 50, // Khoảng cách giữa các dòng
                },
            },
            x: {
                grid: {
                    display: false, // Ẩn lưới trên trục x
                },
            },
        },
    };

    return <Line data={data} options={options} width={700} height={200} />
}

export default PatientVisitChart;
