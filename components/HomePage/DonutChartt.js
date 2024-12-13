import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import "./DonutChartt.css"; // Thêm file CSS để chứa style của container

const data = [
    { name: "Excellent", value: 60, color: "#4285F4" },
    { name: "Good", value: 30, color: "#FBBC05" },
    { name: "Poor", value: 10, color: "#34A853" },
];

const COLORS = ["#4285F4", "#FBBC05", "#34A853"];

function DonutChart() {
    return (
        <>
            <div className="chart-containter">
                <div className="chart-wrapper">
                    <PieChart width={200} height={200}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            startAngle={90}
                            endAngle={450}
                            dataKey="value"
                            paddingAngle={5}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <div className="chart-center-text2">Total</div>
                    <div className="chart-center-text1">45,251</div>
                </div>
                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ paddingLeft: 20 }}
                    payload={data.map((item, index) => ({
                        value: `${item.name}`,
                        type: "square",
                        color: COLORS[index % COLORS.length],
                    }))}
                />
            </div>
        </>
    );
}

export default DonutChart;
