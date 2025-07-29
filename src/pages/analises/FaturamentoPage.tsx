import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  RefreshCw,
  Filter,
  Download,
  Calendar,
  CreditCard,
  Target
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface FaturamentoData {
  id: string;
  mes: string;
  receita: number;
  custos: number;
  lucro: number;
  margem: number;
  vendas_quantidade: number;
  ticket_medio: number;
  variacao_receita: number;
  categoria_principal: string;
}

export const FaturamentoPage: React.FC = () => {
  const { data, loading, refreshData } = useAnalytics();
  const [faturamentoData, setFaturamentoData] = useState<FaturamentoData[]>([]);
  const [filtroPeriodo, setFiltroPeriodo] = useState('6m');

  useEffect(() => {
    // Simulate billing data
    const mockFaturamentoData: FaturamentoData[] = [
      {
        id: '1',
        mes: '2024-01',
        receita: 85000,
        custos: 52000,
        lucro: 33000,
        margem: 38.8,
        vendas_quantidade: 425,
        ticket_medio: 200,
        variacao_receita: 15.2,
        categoria_principal: 'Eletrônicos'
      },
      {
        id: '2',
        mes: '2023-12',
        receita: 73500,
        custos: 48000,
        lucro: 25500,
        margem: 34.7,
        vendas_quantidade: 367,
        ticket_medio: 200,
        variacao_receita: 8.5,
        categoria_principal: 'Eletrônicos'
      },
      {
        id: '3',
        mes: '2023-11',
        receita: 67800,
        custos: 44500,
        lucro: 23300,
        margem: 34.4,
        vendas_quantidade: 339,
        ticket_medio: 200,
        variacao_receita: -2.1,
        categoria_principal: 'Eletrônicos'
      },
      {
        id: '4',
        mes: '2023-10',
        receita: 69200,
        custos: 45800,
        lucro: 23400,
        margem: 33.8,
        vendas_quantidade: 346,
        ticket_medio: 200,
        variacao_receita: 12.3,
        categoria_principal: 'Eletrônicos'
      },
      {
        id: '5',
        mes: '2023-09',
        receita: 61600,
        custos: 41200,
        lucro: 20400,
        margem: 33.1,
        vendas_quantidade: 308,
        ticket_medio: 200,
        variacao_receita: 5.8,
        categoria_principal: 'Eletrônicos'
      },
      {
        id: '6',
        mes: '2023-08',
        receita: 58200,
        custos: 39500,
        lucro: 18700,
        margem: 32.1,
        vendas_quantidade: 291,
        ticket_medio: 200,
        variacao_receita: -1.5,
        categoria_principal: 'Eletrônicos'
      }
    ];
    setFaturamentoData(mockFaturamentoData);
  }, []);

  const handleRefresh = () => {
    refreshData('faturamento');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getVariationColor = (variation: number) => {
    if (variation > 0) return 'text-green-600';
    if (variation < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getVariationIcon = (variation: number) => {
    if (variation > 0) return <TrendingUp size={16} />;
    if (variation < 0) return <TrendingDown size={16} />;
    return null;
  };

  const currentData = faturamentoData[0] || {};
  const previousData = faturamentoData[1] || {};

  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Faturamento e Lucros</h1>
            <p className="text-gray-600 mt-1">
              Acompanhe sua performance financeira e rentabilidade
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Atualizar</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Download size={16} />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(currentData.receita || 0)}
                </h3>
                <p className="text-sm text-gray-600">Receita Mensal</p>
                <div className={`flex items-center space-x-1 text-xs ${getVariationColor(calculateGrowth(currentData.receita, previousData.receita))}`}>
                  {getVariationIcon(calculateGrowth(currentData.receita, previousData.receita))}
                  <span>
                    {calculateGrowth(currentData.receita, previousData.receita) > 0 ? '+' : ''}
                    {calculateGrowth(currentData.receita, previousData.receita).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(currentData.lucro || 0)}
                </h3>
                <p className="text-sm text-gray-600">Lucro Líquido</p>
                <div className={`flex items-center space-x-1 text-xs ${getVariationColor(calculateGrowth(currentData.lucro, previousData.lucro))}`}>
                  {getVariationIcon(calculateGrowth(currentData.lucro, previousData.lucro))}
                  <span>
                    {calculateGrowth(currentData.lucro, previousData.lucro) > 0 ? '+' : ''}
                    {calculateGrowth(currentData.lucro, previousData.lucro).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <PieChart className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {(currentData.margem || 0).toFixed(1)}%
                </h3>
                <p className="text-sm text-gray-600">Margem de Lucro</p>
                <div className={`flex items-center space-x-1 text-xs ${getVariationColor((currentData.margem || 0) - (previousData.margem || 0))}`}>
                  {getVariationIcon((currentData.margem || 0) - (previousData.margem || 0))}
                  <span>
                    {((currentData.margem || 0) - (previousData.margem || 0)) > 0 ? '+' : ''}
                    {((currentData.margem || 0) - (previousData.margem || 0)).toFixed(1)}pp
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CreditCard className="text-yellow-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(currentData.ticket_medio || 0)}
                </h3>
                <p className="text-sm text-gray-600">Ticket Médio</p>
                <div className={`flex items-center space-x-1 text-xs ${getVariationColor(calculateGrowth(currentData.ticket_medio, previousData.ticket_medio))}`}>
                  {getVariationIcon(calculateGrowth(currentData.ticket_medio, previousData.ticket_medio))}
                  <span>
                    {calculateGrowth(currentData.ticket_medio, previousData.ticket_medio) > 0 ? '+' : ''}
                    {calculateGrowth(currentData.ticket_medio, previousData.ticket_medio).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Período:</span>
            </div>
            <select
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="3m">Últimos 3 meses</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="1y">Último ano</option>
              <option value="2y">Últimos 2 anos</option>
            </select>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Composição da Receita</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Receita Bruta</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(currentData.receita || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Custos</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  -{formatCurrency(currentData.custos || 0)}
                </span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Lucro Líquido</span>
                  <span className="text-sm font-bold text-green-600">
                    {formatCurrency(currentData.lucro || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Metrics */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Vendas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quantidade de Vendas</span>
                <span className="text-sm font-medium text-gray-900">
                  {currentData.vendas_quantidade || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ticket Médio</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(currentData.ticket_medio || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Categoria Principal</span>
                <span className="text-sm font-medium text-gray-900">
                  {currentData.categoria_principal || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Histórico Financeiro</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <LoadingSpinner size="large" />
              <p className="text-gray-600 mt-4">Carregando dados financeiros...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Período
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receita
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Custos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lucro
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Margem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {faturamentoData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.mes}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(item.receita)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(item.custos)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          {formatCurrency(item.lucro)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.margem.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.vendas_quantidade}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center space-x-1 ${getVariationColor(item.variacao_receita)}`}>
                          {getVariationIcon(item.variacao_receita)}
                          <span className="text-sm">
                            {item.variacao_receita > 0 ? '+' : ''}{item.variacao_receita}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};