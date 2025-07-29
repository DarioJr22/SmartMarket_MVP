import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Users,
  RefreshCw,
  Filter,
  Download,
  Award,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface ReputationData {
  id: string;
  periodo: string;
  rating: number;
  vendas: number;
  reclamacoes: number;
  nivel: string;
  pontos: number;
  variacao_rating: number;
  comentarios_positivos: number;
  comentarios_negativos: number;
  tempo_resposta: number;
}

export const ReputacaoPage: React.FC = () => {
  const { data, loading, refreshData } = useAnalytics();
  const [reputationData, setReputationData] = useState<ReputationData[]>([]);
  const [filtroPeriodo, setFiltroPeriodo] = useState('30d');

  useEffect(() => {
    // Simulate reputation data
    const mockReputationData: ReputationData[] = [
      {
        id: '1',
        periodo: '2024-01',
        rating: 4.8,
        vendas: 500,
        reclamacoes: 2,
        nivel: 'Mercado Líder Platinum',
        pontos: 9850,
        variacao_rating: 0.2,
        comentarios_positivos: 485,
        comentarios_negativos: 15,
        tempo_resposta: 2.5
      },
      {
        id: '2',
        periodo: '2023-12',
        rating: 4.6,
        vendas: 450,
        reclamacoes: 5,
        nivel: 'Mercado Líder Gold',
        pontos: 9200,
        variacao_rating: -0.1,
        comentarios_positivos: 420,
        comentarios_negativos: 30,
        tempo_resposta: 3.2
      },
      {
        id: '3',
        periodo: '2023-11',
        rating: 4.7,
        vendas: 380,
        reclamacoes: 3,
        nivel: 'Mercado Líder Gold',
        pontos: 8950,
        variacao_rating: 0.3,
        comentarios_positivos: 365,
        comentarios_negativos: 15,
        tempo_resposta: 2.8
      }
    ];
    setReputationData(mockReputationData);
  }, []);

  const handleRefresh = () => {
    refreshData('reputacao');
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNivelColor = (nivel: string) => {
    if (nivel.includes('Platinum')) return 'bg-purple-100 text-purple-800';
    if (nivel.includes('Gold')) return 'bg-yellow-100 text-yellow-800';
    if (nivel.includes('Silver')) return 'bg-gray-100 text-gray-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getVariationIcon = (variation: number) => {
    if (variation > 0) return <TrendingUp className="text-green-600" size={16} />;
    if (variation < 0) return <TrendingDown className="text-red-600" size={16} />;
    return null;
  };

  const getVariationColor = (variation: number) => {
    if (variation > 0) return 'text-green-600';
    if (variation < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const currentData = reputationData[0] || {};

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reputação no Mercado Livre</h1>
            <p className="text-gray-600 mt-1">
              Monitore sua reputação e nível de vendedor
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

        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="text-yellow-600" size={20} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${getRatingColor(currentData.rating || 0)}`}>
                  {currentData.rating || 0}/5
                </h3>
                <p className="text-sm text-gray-600">Rating Atual</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {currentData.nivel?.split(' ').slice(-1)[0] || 'N/A'}
                </h3>
                <p className="text-sm text-gray-600">Nível Atual</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentData.vendas || 0}
                </h3>
                <p className="text-sm text-gray-600">Vendas/Mês</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="text-red-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentData.reclamacoes || 0}
                </h3>
                <p className="text-sm text-gray-600">Reclamações</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Comments Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Análise de Comentários</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Positivos</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {currentData.comentarios_positivos || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Negativos</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {currentData.comentarios_negativos || 0}
                </span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Taxa de Satisfação</span>
                  <span className="text-sm font-bold text-green-600">
                    {currentData.comentarios_positivos && currentData.comentarios_negativos
                      ? Math.round((currentData.comentarios_positivos / (currentData.comentarios_positivos + currentData.comentarios_negativos)) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tempo de Resposta</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">
                    {currentData.tempo_resposta || 0}h
                  </h4>
                  <p className="text-sm text-gray-600">Tempo médio de resposta</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Meta recomendada: &lt; 4 horas</p>
                <p className={`font-medium ${(currentData.tempo_resposta || 0) < 4 ? 'text-green-600' : 'text-red-600'}`}>
                  {(currentData.tempo_resposta || 0) < 4 ? '✓ Dentro da meta' : '⚠ Acima da meta'}
                </p>
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
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
          </div>
        </div>

        {/* Historical Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Histórico de Reputação</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <LoadingSpinner size="large" />
              <p className="text-gray-600 mt-4">Carregando dados de reputação...</p>
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
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nível
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reclamações
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tempo Resposta
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reputationData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.periodo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center space-x-1 ${getRatingColor(item.rating)}`}>
                          <Star size={16} fill="currentColor" />
                          <span className="text-sm font-medium">
                            {item.rating}/5
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center space-x-1 ${getVariationColor(item.variacao_rating)}`}>
                          {getVariationIcon(item.variacao_rating)}
                          <span className="text-sm">
                            {item.variacao_rating > 0 ? '+' : ''}{item.variacao_rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getNivelColor(item.nivel)}`}>
                          {item.nivel.split(' ').slice(-1)[0]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.vendas}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.reclamacoes}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.tempo_resposta}h
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