import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Updated Data with Accountant & Shopkeeper
const data = [
  { name: "Farmer", margin: 0 },
  { name: "Wholesaler", margin: 33.3 },
  { name: "Accountant", margin: 10.25 },
  { name: "AgriMarket Agents ", margin: 5.00},
  { name: "Shopkeeper", margin: 20.0 },
  { name: "Retailer", margin: 20.0 },
];

const LineChartComponent: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Margin %", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="margin" stroke="#8884d8" strokeWidth={2} dot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
