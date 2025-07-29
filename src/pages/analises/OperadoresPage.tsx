import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  Users, 
  Star, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Filter,
  Download,
  Award,
  Target,
  Clock,
  MessageSquare
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface Operador {
  id: string;
  nome: string;
  vendas: number;
  conversao: number;
  rating: number;
  tempo_resposta: number;
  clientes_atendidos: number;
  meta_vendas: number;
  categoria_especialidade: string;
  status: 'ativo' | 'inativo' | 'ferias';
  variacao_vendas: number;
  nivel: 'junior' | 'pleno' | 'senior';
}

export const OperadoresPage: React.FC = () => {
  const { data, loading, refreshData } = useAnalytics();
  const [operadores, setOperadores] = useState<Operador[]>([]);
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroNivel, setFiltroNivel] = useState('');

  useEffect(() => {
    // Simulate operators data
    const mockOperadores: Operador[] = [
      {
        id: '1',
        nome: 'Maria Santos',
        vendas: 120,
        conversao: 12.5,
        rating: 4.9,
        tempo_resposta: 1.5,
        clientes_atendidos: 85,
        meta_vendas: 100,
        categoria_especialidade: 'Eletrônicos',
        status: 'ativo',
        variacao_vendas: 15.2,
        nivel: 'senior'
      },
      {
        id: '2',
        nome: 'João Silva',
        vendas: 95,
        conversao: 10.8,
        rating: 4.7,
        tempo_resposta: 2.1,
        clientes_atendidos: 72,
        meta_vendas: 90,
        categoria_especialidade: 'Acessórios',
        status: 'ativo',
        variacao_vendas: 8.5,
        nivel: 'pleno'
      },
      {
        id: '3',
        nome: 'Ana Costa',
        vendas: 78,
        conversao: 9.2,
        rating: 4.6,
        tempo_resposta: 2.8,
        clientes_atendidos: 65,
        meta_vendas: 80,
        categoria_especialidade: 'Celulares',
        status: 'ativo',
        variacao_vendas: -2.1,
        nivel: 'pleno'
      },
      {
        id: '4',
        nome: 'Carlos Oliveira',
        vendas: 65,
        conversao: 8.1,
        rating: 4.4,
        tempo_resposta: 3.2,
        clientes_atendidos: 58,
        meta_vendas: 70,
        categoria_especialidade: 'Casa',
        status: 'ativo',
        variacao_vendas: 5.8,
        nivel: 'junior'
      },
      {
        id: '5',
        nome: 'Lucia Ferreira',
        vendas: 0,
        conversao: 0,
        rating: 4.8,
        tempo_resposta: 0,
        clientes_atendidos: 0,
        meta_vendas: 85,
        categoria_especialidade: 'Moda',
        status: 'ferias',
        variacao_vendas: 0,
        nivel: 'senior'
      }
    ];
    setOperadores(mockOperadores);
  }, []);

  const handleRefresh = () => {
    refreshData('operadores');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'inativo': return 'bg-red-100 text-red-800';
      case 'ferias': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'senior': return 'bg-purple-100 text-purple-800';
      case 'pleno': return 'bg-blue-100 text-blue-800';
      case 'junior': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const getMetaProgress = (vendas: number, meta: number) => {
    return Math.min((vendas / meta) * 100, 100);
  };

  const operadoresAtivos = operadores.filter(op => op.status === 'ativo');
  const totalVendas = operadoresAtivos.reduce((sum, op) => sum + op.vendas, 0);
  const conversaoMedia = operadoresAtivos.reduce((sum, op) => sum + op.conversao, 0) / operadoresAtivos.length;
  const ratingMedio = operadoresAtivos.reduce((sum, op) => sum + op.rating, 0) / operadoresAtivos.length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Performance por Operador</h1>
            <p className="text-gray-600 mt-1">
              Monitore o desempenho da sua equipe de vendas
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
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{operadoresAtivos.length}</h3>
                <p className="text-sm text-gray-600">Operadores Ativos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{totalVendas}</h3>
                <p className="text-sm text-gray-600">Total de Vendas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {conversaoMedia ? conversaoMedia.toFixed(1) : 0}%
                </h3>
                <p className="text-sm text-gray-600">Conversão Média</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="text-yellow-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {ratingMedio ? ratingMedio.toFixed(1) : 0}/5
                </h3>
                <p className="text-sm text-gray-600">Rating Médio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance by Level */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance por Nível</h3>
            <div className="space-y-4">
              {['senior', 'pleno', 'junior'].map((nivel) => {
                const operadoresNivel = operadoresAtivos.filter(op => op.nivel === nivel);
                const vendasNivel = operadoresNivel.reduce((sum, op) => sum + op.vendas, 0);
                return (
                  <div key={nivel} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getNivelColor(nivel)}`}>
                        {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">({operadoresNivel.length})</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{vendasNivel} vendas</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
            <div className="space-y-3">
              {operadoresAtivos
                .sort((a, b) => b.vendas - a.vendas)
                .slice(0, 3)
                .map((operador, index) => (
                  <div key={operador.id} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{operador.nome}</div>
                      <div className="text-xs text-gray-500">{operador.vendas} vendas</div>
                    </div>
                    <div className="text-sm text-gray-600">{operador.conversao}%</div>
                  </div>
                ))}
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
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
              <option value="ferias">Férias</option>
            </select>
            <select
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os níveis</option>
              <option value="senior">Senior</option>
              <option value="pleno">Pleno</option>
              <option value="junior">Junior</option>
            </select>
          </div>
        </div>

        {/* Operators Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Operadores</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <LoadingSpinner size="large" />
              <p className="text-gray-600 mt-4">Carregando dados dos operadores...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Operador
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Meta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tempo Resposta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Variação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {operadores.map((operador) => (
                    <tr key={operador.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {operador.nome}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getNivelColor(operador.nivel)}`}>
                              {operador.nivel.charAt(0).toUpperCase() + operador.nivel.slice(1)}
                            </span>
                            <span className="ml-2">{operador.categoria_especialidade}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(operador.status)}`}>
                          {operador.status.charAt(0).toUpperCase() + operador.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {operador.vendas}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-gray-900">{operador.meta_vendas}</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${getMetaProgress(operador.vendas, operador.meta_vendas)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {operador.conversao}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400 fill-current" size={16} />
                          <span className="text-sm text-gray-900">
                            {operador.rating}/5
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Clock className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-900">
                            {operador.tempo_resposta}h
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center space-x-1 ${getVariationColor(operador.variacao_vendas)}`}>
                          {getVariationIcon(operador.variacao_vendas)}
                          <span className="text-sm">
                            {operador.variacao_vendas > 0 ? '+' : ''}{operador.variacao_vendas}%
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