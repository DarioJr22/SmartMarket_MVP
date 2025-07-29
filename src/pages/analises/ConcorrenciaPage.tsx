import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Eye,
  RefreshCw,
  Filter,
  Download,
  AlertTriangle
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface Competitor {
  id: string;
  nome: string;
  preco: number;
  vendas: number;
  posicao: number;
  categoria: string;
  reputacao: number;
  fotos: number;
  variacao_preco: number;
}

export const ConcorrenciaPage: React.FC = () => {
  const { data, loading, refreshData } = useAnalytics();
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [ordenacao, setOrdenacao] = useState('vendas');

  useEffect(() => {
    // Simulate competitor data
    const mockCompetitors: Competitor[] = [
      {
        id: '1',
        nome: 'TechStore Premium',
        preco: 199.90,
        vendas: 1250,
        posicao: 1,
        categoria: 'Eletrônicos',
        reputacao: 4.8,
        fotos: 12,
        variacao_preco: -5.2
      },
      {
        id: '2',
        nome: 'MegaEletro',
        preco: 189.50,
        vendas: 980,
        posicao: 2,
        categoria: 'Eletrônicos',
        reputacao: 4.6,
        fotos: 8,
        variacao_preco: 2.1
      },
      {
        id: '3',
        nome: 'Digital House',
        preco: 210.00,
        vendas: 750,
        posicao: 3,
        categoria: 'Eletrônicos',
        reputacao: 4.9,
        fotos: 15,
        variacao_preco: -1.8
      },
      {
        id: '4',
        nome: 'Smart Gadgets',
        preco: 175.90,
        vendas: 650,
        posicao: 4,
        categoria: 'Eletrônicos',
        reputacao: 4.4,
        fotos: 6,
        variacao_preco: 8.5
      }
    ];
    setCompetitors(mockCompetitors);
  }, []);

  const handleRefresh = () => {
    refreshData('concorrencia');
  };

  const getVariationColor = (variation: number) => {
    if (variation > 0) return 'text-red-600';
    if (variation < 0) return 'text-green-600';
    return 'text-gray-600';
  };

  const getVariationIcon = (variation: number) => {
    if (variation > 0) return <TrendingUp size={16} />;
    if (variation < 0) return <TrendingDown size={16} />;
    return null;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Análise de Concorrência</h1>
            <p className="text-gray-600 mt-1">
              Monitore preços, vendas e estratégias dos seus principais concorrentes
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
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Moda">Moda</option>
              <option value="Casa">Casa e Jardim</option>
            </select>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="vendas">Ordenar por vendas</option>
              <option value="preco">Ordenar por preço</option>
              <option value="posicao">Ordenar por posição</option>
              <option value="reputacao">Ordenar por reputação</option>
            </select>
          </div>
        </div>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="text-red-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Alerta de Preço</h3>
                <p className="text-sm text-gray-600">2 concorrentes baixaram preços</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              TechStore Premium e MegaEletro reduziram preços em produtos similares
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Oportunidade</h3>
                <p className="text-sm text-gray-600">Posição #2 disponível</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Ajuste seu preço para R$ 185,00 e ganhe posições
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Monitoramento</h3>
                <p className="text-sm text-gray-600">4 concorrentes ativos</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Acompanhando mudanças em tempo real
            </p>
          </div>
        </div>

        {/* Competitors Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Principais Concorrentes</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <LoadingSpinner size="large" />
              <p className="text-gray-600 mt-4">Carregando dados da concorrência...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Concorrente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendas/Mês
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reputação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {competitors.map((competitor) => (
                    <tr key={competitor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {competitor.nome}
                          </div>
                          <div className="text-sm text-gray-500">
                            {competitor.categoria}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          R$ {competitor.preco.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {competitor.vendas.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          #{competitor.posicao}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">
                            {competitor.reputacao}/5
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center space-x-1 text-sm ${getVariationColor(competitor.variacao_preco)}`}>
                          {getVariationIcon(competitor.variacao_preco)}
                          <span>{competitor.variacao_preco > 0 ? '+' : ''}{competitor.variacao_preco}%</span>
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