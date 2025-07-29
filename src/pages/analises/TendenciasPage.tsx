import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Search,
  RefreshCw,
  Filter,
  Download,
  Calendar,
  BarChart3,
  Zap
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface Trend {
  id: string;
  palavra: string;
  crescimento: number;
  volume: number;
  categoria: string;
  periodo: string;
  oportunidade: 'alta' | 'media' | 'baixa';
  produtos_relacionados: string[];
}

export const TendenciasPage: React.FC = () => {
  const { data, loading, refreshData } = useAnalytics();
  const [trends, setTrends] = useState<Trend[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroPeriodo, setFiltroPeriodo] = useState('7d');

  useEffect(() => {
    // Simulate trends data
    const mockTrends: Trend[] = [
      {
        id: '1',
        palavra: 'smartphone 5g',
        crescimento: 45.2,
        volume: 125000,
        categoria: 'Tecnologia',
        periodo: '7 dias',
        oportunidade: 'alta',
        produtos_relacionados: ['Galaxy S24', 'iPhone 15', 'Xiaomi 13']
      },
      {
        id: '2',
        palavra: 'fone bluetooth gamer',
        crescimento: 32.8,
        volume: 89000,
        categoria: 'Gaming',
        periodo: '7 dias',
        oportunidade: 'alta',
        produtos_relacionados: ['HyperX Cloud', 'Razer Kraken', 'SteelSeries']
      },
      {
        id: '3',
        palavra: 'carregador wireless',
        crescimento: 28.5,
        volume: 67000,
        categoria: 'Acessórios',
        periodo: '7 dias',
        oportunidade: 'media',
        produtos_relacionados: ['Carregador Samsung', 'Base Xiaomi', 'Pad Apple']
      },
      {
        id: '4',
        palavra: 'smartwatch fitness',
        crescimento: 22.1,
        volume: 54000,
        categoria: 'Wearables',
        periodo: '7 dias',
        oportunidade: 'media',
        produtos_relacionados: ['Apple Watch', 'Galaxy Watch', 'Amazfit']
      },
      {
        id: '5',
        palavra: 'cabo usb-c',
        crescimento: -8.3,
        volume: 43000,
        categoria: 'Acessórios',
        periodo: '7 dias',
        oportunidade: 'baixa',
        produtos_relacionados: ['Cabo Samsung', 'Cabo Anker', 'Cabo Baseus']
      }
    ];
    setTrends(mockTrends);
  }, []);

  const handleRefresh = () => {
    refreshData('tendencias');
  };

  const getTrendIcon = (crescimento: number) => {
    if (crescimento > 0) return <TrendingUp className="text-green-600" size={16} />;
    return <TrendingDown className="text-red-600" size={16} />;
  };

  const getTrendColor = (crescimento: number) => {
    if (crescimento > 0) return 'text-green-600';
    return 'text-red-600';
  };

  const getOportunidadeColor = (oportunidade: string) => {
    switch (oportunidade) {
      case 'alta': return 'bg-green-100 text-green-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOportunidadeIcon = (oportunidade: string) => {
    switch (oportunidade) {
      case 'alta': return <Zap className="text-green-600" size={16} />;
      case 'media': return <BarChart3 className="text-yellow-600" size={16} />;
      case 'baixa': return <TrendingDown className="text-red-600" size={16} />;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tendências do Mercado</h1>
            <p className="text-gray-600 mt-1">
              Descubra palavras-chave em alta e oportunidades de mercado
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
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">12</h3>
                <p className="text-sm text-gray-600">Tendências em Alta</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">378K</h3>
                <p className="text-sm text-gray-600">Volume Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Zap className="text-yellow-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">8</h3>
                <p className="text-sm text-gray-600">Oportunidades</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">+32%</h3>
                <p className="text-sm text-gray-600">Crescimento Médio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas as categorias</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Gaming">Gaming</option>
              <option value="Acessórios">Acessórios</option>
              <option value="Wearables">Wearables</option>
            </select>
            <select
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
            </select>
          </div>
        </div>

        {/* Trends Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Palavras-chave em Tendência</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <LoadingSpinner size="large" />
              <p className="text-gray-600 mt-4">Carregando tendências...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Palavra-chave
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crescimento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Oportunidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produtos Relacionados
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trends.map((trend) => (
                    <tr key={trend.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {trend.palavra}
                          </div>
                          <div className="text-sm text-gray-500">
                            {trend.categoria}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center space-x-2 ${getTrendColor(trend.crescimento)}`}>
                          {getTrendIcon(trend.crescimento)}
                          <span className="text-sm font-medium">
                            {trend.crescimento > 0 ? '+' : ''}{trend.crescimento}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {trend.volume.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getOportunidadeIcon(trend.oportunidade)}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOportunidadeColor(trend.oportunidade)}`}>
                            {trend.oportunidade.charAt(0).toUpperCase() + trend.oportunidade.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {trend.produtos_relacionados.slice(0, 2).map((produto, index) => (
                            <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                              {produto}
                            </span>
                          ))}
                          {trend.produtos_relacionados.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{trend.produtos_relacionados.length - 2} mais
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 font-medium">
                          Analisar
                        </button>
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