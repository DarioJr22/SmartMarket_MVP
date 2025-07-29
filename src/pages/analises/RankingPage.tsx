import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Eye,
  RefreshCw,
  Filter,
  Download,
  Star,
  Image
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface RankingItem {
  id: string;
  produto: string;
  posicao: number;
  posicao_anterior: number;
  clicks: number;
  conversao: number;
  categoria: string;
  preco: number;
  fotos: number;
  score_qualidade: number;
}

export const RankingPage: React.FC = () => {
  const { data, loading, refreshData } = useAnalytics();
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    // Simulate ranking data
    const mockRankings: RankingItem[] = [
      {
        id: '1',
        produto: 'Smartphone Galaxy A54',
        posicao: 3,
        posicao_anterior: 5,
        clicks: 2500,
        conversao: 8.5,
        categoria: 'Celulares',
        preco: 1299.90,
        fotos: 12,
        score_qualidade: 85
      },
      {
        id: '2',
        produto: 'Fone Bluetooth JBL',
        posicao: 1,
        posicao_anterior: 1,
        clicks: 1800,
        conversao: 12.3,
        categoria: 'Acessórios',
        preco: 199.90,
        fotos: 8,
        score_qualidade: 92
      },
      {
        id: '3',
        produto: 'Carregador Wireless',
        posicao: 7,
        posicao_anterior: 4,
        clicks: 950,
        conversao: 6.2,
        categoria: 'Acessórios',
        preco: 89.90,
        fotos: 5,
        score_qualidade: 68
      },
      {
        id: '4',
        produto: 'Capa Protetora Premium',
        posicao: 2,
        posicao_anterior: 3,
        clicks: 1200,
        conversao: 15.8,
        categoria: 'Acessórios',
        preco: 49.90,
        fotos: 10,
        score_qualidade: 88
      }
    ];
    setRankings(mockRankings);
  }, []);

  const handleRefresh = () => {
    refreshData('ranking');
  };

  const getPositionChange = (current: number, previous: number) => {
    const change = previous - current;
    if (change > 0) return { type: 'up', value: change };
    if (change < 0) return { type: 'down', value: Math.abs(change) };
    return { type: 'same', value: 0 };
  };

  const getPositionIcon = (change: { type: string; value: number }) => {
    if (change.type === 'up') return <TrendingUp className="text-green-600" size={16} />;
    if (change.type === 'down') return <TrendingDown className="text-red-600" size={16} />;
    return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ranking de Anúncios</h1>
            <p className="text-gray-600 mt-1">
              Monitore a posição dos seus produtos nos resultados de busca
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">3.2</h3>
                <p className="text-sm text-gray-600">Posição Média</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">+2</h3>
                <p className="text-sm text-gray-600">Melhoria Média</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">6.4K</h3>
                <p className="text-sm text-gray-600">Clicks Totais</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="text-yellow-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">83</h3>
                <p className="text-sm text-gray-600">Score Médio</p>
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
              <option value="Celulares">Celulares</option>
              <option value="Acessórios">Acessórios</option>
              <option value="Eletrônicos">Eletrônicos</option>
            </select>
          </div>
        </div>

        {/* Rankings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Posições dos Produtos</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <LoadingSpinner size="large" />
              <p className="text-gray-600 mt-4">Carregando dados de ranking...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posição Atual
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mudança
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rankings.map((item) => {
                    const positionChange = getPositionChange(item.posicao, item.posicao_anterior);
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.produto}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.categoria} • R$ {item.preco.toFixed(2)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            #{item.posicao}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getPositionIcon(positionChange)}
                            <span className={`text-sm ${
                              positionChange.type === 'up' ? 'text-green-600' : 
                              positionChange.type === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {positionChange.type === 'same' ? 'Sem mudança' : 
                               positionChange.type === 'up' ? `+${positionChange.value}` : 
                               `-${positionChange.value}`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.clicks.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.conversao}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(item.score_qualidade)}`}>
                            {item.score_qualidade}/100
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 font-medium">
                            Otimizar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};