import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesData {
  date: string;
  vendas: number;
  receita: number;
}

interface SalesChartProps {
  data?: SalesData[];
  loading?: boolean;
}

export const SalesChart: React.FC<SalesChartProps> = ({ data, loading = false }) => {
  // Mock data if none provided
  const defaultData: SalesData[] = [
    { date: '01/01', vendas: 45, receita: 12500 },
    { date: '02/01', vendas: 52, receita: 14200 },
    { date: '03/01', vendas: 48, receita: 13100 },
    { date: '04/01', vendas: 61, receita: 16800 },
    { date: '05/01', vendas: 55, receita: 15200 },
    { date: '06/01', vendas: 67, receita: 18500 },
    { date: '07/01', vendas: 59, receita: 16200 },
    { date: '08/01', vendas: 73, receita: 20100 },
    { date: '09/01', vendas: 68, receita: 18800 },
    { date: '10/01', vendas: 82, receita: 22600 },
    { date: '11/01', vendas: 76, receita: 21000 },
    { date: '12/01', vendas: 89, receita: 24500 },
    { date: '13/01', vendas: 85, receita: 23400 },
    { date: '14/01', vendas: 92, receita: 25300 },
    { date: '15/01', vendas: 88, receita: 24200 },
    { date: '16/01', vendas: 95, receita: 26100 },
    { date: '17/01', vendas: 91, receita: 25000 },
    { date: '18/01', vendas: 103, receita: 28300 },
    { date: '19/01', vendas: 98, receita: 27000 },
    { date: '20/01', vendas: 112, receita: 30800 }
  ];

  const chartData = data || defaultData;

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          stroke="#6b7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6b7280"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value: number, name: string) => [
            name === 'vendas' ? `${value} vendas` : `R$ ${value.toLocaleString()}`,
            name === 'vendas' ? 'Vendas' : 'Receita'
          ]}
        />
        <Line 
          type="monotone" 
          dataKey="vendas" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="receita" 
          stroke="#10b981" 
          strokeWidth={2}
          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};