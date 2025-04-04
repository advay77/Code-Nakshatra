import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTranslation } from 'react-i18next';

// Tax Data for Indian Farmers
const data = [
  { name: "Mandi Tax", tax: 2 },
  { name: "Commission Charges", tax: 1 },
  { name: "GST on Processed Food", tax: 5 },
  { name: "Export Duty", tax: 10 },
  { name: "Transport Charges", tax: 3 },
];

const TaxBarChart: React.FC = () => {
  const { t } = useTranslation();

  const translatedData = data.map(item => ({
    ...item,
    name: t(item.name)
  }));

  return (
    <div className="space-y-8">
      {/* Chart Container */}
      <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-white/90">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={translatedData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="taxColorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#4b5563' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <YAxis 
              label={{ 
                value: t('Tax Percentage (%)'), 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#4b5563' }
              }}
              tick={{ fill: '#4b5563' }}
              axisLine={{ stroke: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
            <Bar 
              dataKey="tax" 
              fill="url(#taxColorGradient)" 
              name={t('Tax %')}
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-300"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t(item.name)}</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-purple-600">
                  {item.tax}%
                </span>
                <span className="text-gray-600">{t('Tax %')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxBarChart;