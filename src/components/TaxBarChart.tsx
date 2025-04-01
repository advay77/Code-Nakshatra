import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Tax Data for Indian Farmers
const data = [
  { name: "Mandi Tax", tax: 2 },
  { name: "Commission Charges", tax: 1 },
  { name: "GST on Processed Food", tax: 5 },
  { name: "Export Duty", tax: 10 },
  { name: "Transport Charges", tax: 3 },
];

const TaxBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Tax Percentage (%)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="tax" fill="#FF5733" name="Tax %" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TaxBarChart;
