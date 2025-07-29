import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ConversionData {
  date: string;
  conversao: number;
  visitas: number;
}

interface ConversionChartProps {
  data?: ConversionData[];
  loading?: boolean;
}

export const ConversionChart: React.FC<ConversionChartProps> = ({ data, loading = false }) => {
  const defaultData: ConversionData[] = [
    { date: '01/01', conversao: 6.2, visitas: 1250 },
    { date: '02/01', conversao: 6.8, visitas: 1340 },
    { date: '03/01', conversao: 6.5, visitas: 1180 },
    { date: '04/01', conversao: 7.2, visitas: 1420 },
    { date: '05/01', conversao: 6.9, visitas: 1380 },
    { date: '06/01', conversao: 7.8, visitas: 1560 },
    { date: '07/01', conversao: 7.1, visitas: 1290 },
    { date: '08/01', conversao: 8.2, visitas: 1680 },
    { date: '09/01', conversao: 7.9, visitas: 1520 },
    { date: '10/01', conversao: 8.8, visitas: 1780 },
    { date: '11/01', conversao: 8.3, visitas: 1650 },
    { date: '12/01', conversao: 9.1, visitas: 1890 },
    { date: '13/01', conversao: 8.7, visitas: 1720 },
    { date: '14/01', conversao: 9.4, visitas: 1950 },
    { date: '15/01', conversao: 9.0, visitas: 1820 },
    { date: '16/01', conversao: 9.8, visitas: 2100 },
    { date: '17/01', conversao: 9.2, visitas: 1980 },
    { date: '18/01', conversao: 10.1, visitas: 2250 },
    { date: '19/01', conversao: 9.7, visitas: 2080 },
    { date: '20/01', conversao: 10.5, visitas: 2380 }
  ];

  const chartData = data || defaultData;

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="conversionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          stroke="#6b7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6b7280"
          fontSize={12}
          domain={[0, 'dataMax + 2']}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value: number, name: string) => [
            name === 'conversao' ? `${value}%` : `${value} visitas`,
            name === 'conversao' ? 'Taxa de Conversão' : 'Visitas'
          ]}
        />
        <Area 
          type="monotone" 
          dataKey="conversao" 
          stroke="#8b5cf6" 
          strokeWidth={2}
          fillOpacity={1} 
          fill="url(#conversionGradient)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};