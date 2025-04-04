import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Updated Data with Accountant & Shopkeeper
const data = [
  { name: "Farmer", margin: 0 },
  { name: "Wholesaler", margin: 33.3 },
  { name: "Accountant", margin: 10.25 },
  { name: "AgriMarket Agents", margin: 5.00 },
  { name: "Shopkeeper", margin: 20.0 },
  { name: "Retailer", margin: 20.0 },
];

const LineChartComponent: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-lg p-4">
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
      </div>

      {/* Data Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg p-6 transition-all duration-300 hover:scale-105"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 animate-gradient-x -z-10" />
            
            {/* Glass effect overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/30 -z-5" />
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-purple-600">
                  {item.margin}%
                </span>
                <span className="text-gray-600">margin</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChartComponent;