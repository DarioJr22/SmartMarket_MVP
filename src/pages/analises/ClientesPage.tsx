import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  Users, 
  Star, 
  ShoppingBag, 
  Calendar,
  RefreshCw,
  Filter,
  Download,
  TrendingUp,
  Heart,
  Award
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface Cliente {
  id: string;
  nome: string;
  compras: number;
  valor_total: number;
  ultima_compra: string;
  rating_medio: number;
  categoria_preferida: string;
  tipo: 'premium' | 'regular' | 'novo';
  fidelidade: number;
  recencia: number;
}

export const ClientesPage: React.FC = () => {
  const { data, loading, refreshData } = useAnalytics();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [ordenacao, setOrdenacao] = useState('valor_total');

  useEffect(() => {
    // Simulate customer data
    const mockClientes: Cliente[] = [
      {
        id: '1',
        nome: 'Maria Silva',
        compras: 15,
        valor_total: 5500,
        ultima_compra: '2024-01-15',
        rating_medio: 4.8,
        categoria_preferida: 'Eletrônicos',
        tipo: 'premium',
        fidelidade: 92,
        recencia: 5
      },
      {
        id: '2',
        nome: 'João Santos',
        compras: 8,
        valor_total: 2800,
        ultima_compra: '2024-01-10',
        rating_medio: 4.6,
        categoria_preferida: 'Acessórios',
        tipo: 'regular',
        fidelidade: 78,
        recencia: 10
      },
      {
        id: '3',
        nome: 'Ana Costa',
        compras: 3,
        valor_total: 890,
        ultima_compra: '2024-01-08',
        rating_medio: 5.0,
        categoria_preferida: 'Celulares',
        tipo: 'novo',
        fidelidade: 45,
        recencia: 12
      },
      {
        id: '4',
        nome: 'Carlos Oliveira',
        compras: 22,
        valor_total: 8200,
        ultima_compra: '2024-01-12',
        rating_medio: 4.9,
        categoria_preferida: 'Eletrônicos',
        tipo: 'premium',
        fidelidade: 95,
        recencia: 8
      },
      {
        id: '5',
        nome: 'Lucia Ferreira',
        compras: 6,
        valor_total: 1950,
        ultima_compra: '2024-01-05',
        rating_medio: 4.4,
        categoria_preferida: 'Casa',
        tipo: 'regular',
        fidelidade: 65,
        recencia: 15
      }
    ];
    setClientes(mockClientes);
  }, []);

  const handleRefresh = () => {
    refreshData('clientes');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'regular': return 'bg-blue-100 text-blue-800';
      case 'novo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'premium': return <Award className="text-purple-600" size={16} />;
      case 'regular': return <Users className="text-blue-600" size={16} />;
      case 'novo': return <Star className="text-green-600" size={16} />;
      default: return null;
    }
  };

  const getFidelidadeColor = (fidelidade: number) => {
    if (fidelidade >= 80) return 'text-green-600';
    if (fidelidade >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const clientesPremium = clientes.filter(c => c.tipo === 'premium').length;
  const clientesRegulares = clientes.filter(c => c.tipo === 'regular').length;
  const clientesNovos = clientes.filter(c => c.tipo === 'novo').length;
  const valorTotalClientes = clientes.reduce((sum, c) => sum + c.valor_total, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Histórico de Clientes</h1>
            <p className="text-gray-600 mt-1">
              Analise o comportamento e valor dos seus clientes
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
                <h3 className="text-2xl font-bold text-gray-900">{clientes.length}</h3>
                <p className="text-sm text-gray-600">Total de Clientes</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{clientesPremium}</h3>
                <p className="text-sm text-gray-600">Clientes Premium</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(valorTotalClientes)}
                </h3>
                <p className="text-sm text-gray-600">Valor Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Heart className="text-yellow-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {Math.round(clientes.reduce((sum, c) => sum + c.fidelidade, 0) / clientes.length)}%
                </h3>
                <p className="text-sm text-gray-600">Fidelidade Média</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Segmentação de Clientes</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="text-purple-600" size={16} />
                  <span className="text-sm text-gray-600">Premium</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{clientesPremium}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="text-blue-600" size={16} />
                  <span className="text-sm text-gray-600">Regular</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{clientesRegulares}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="text-green-600" size={16} />
                  <span className="text-sm text-gray-600">Novo</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{clientesNovos}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias Preferidas</h3>
            <div className="space-y-3">
              {['Eletrônicos', 'Acessórios', 'Celulares', 'Casa'].map((categoria, index) => {
                const count = clientes.filter(c => c.categoria_preferida === categoria).length;
                return (
                  <div key={categoria} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{categoria}</span>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Engajamento</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Compras Médias</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.round(clientes.reduce((sum, c) => sum + c.compras, 0) / clientes.length)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ticket Médio</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(valorTotalClientes / clientes.reduce((sum, c) => sum + c.compras, 0))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rating Médio</span>
                <span className="text-sm font-medium text-gray-900">
                  {(clientes.reduce((sum, c) => sum + c.rating_medio, 0) / clientes.length).toFixed(1)}/5
                </span>
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
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os tipos</option>
              <option value="premium">Premium</option>
              <option value="regular">Regular</option>
              <option value="novo">Novo</option>
            </select>
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="valor_total">Ordenar por valor</option>
              <option value="compras">Ordenar por compras</option>
              <option value="fidelidade">Ordenar por fidelidade</option>
              <option value="ultima_compra">Ordenar por recência</option>
            </select>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Clientes</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <LoadingSpinner size="large" />
              <p className="text-gray-600 mt-4">Carregando dados dos clientes...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Compras
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fidelidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Última Compra
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientes.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {cliente.nome}
                          </div>
                          <div className="text-sm text-gray-500">
                            {cliente.categoria_preferida}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getTipoIcon(cliente.tipo)}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTipoColor(cliente.tipo)}`}>
                            {cliente.tipo.charAt(0).toUpperCase() + cliente.tipo.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <ShoppingBag className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-900">{cliente.compras}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(cliente.valor_total)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getFidelidadeColor(cliente.fidelidade)}`}>
                          {cliente.fidelidade}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-900">
                            {formatDate(cliente.ultima_compra)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400 fill-current" size={16} />
                          <span className="text-sm text-gray-900">
                            {cliente.rating_medio}/5
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