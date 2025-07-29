import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { 
  Star, 
  Image, 
  FileText, 
  DollarSign,
  RefreshCw,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Camera
} from 'lucide-react';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface QualityItem {
  id: string;
  produto: string;
  score: number;
  fotos: number;
  fotos_recomendadas: number;
  descricao: number;
  preco_competitivo: boolean;
  categoria: string;
  status: 'excelente' | 'bom' | 'precisa_melhorar';
  sugestoes: string[];
}

export const QualidadePage: React.FC = () => {
  const { data, loading, refreshData } = useAnalytics();
  const [qualityItems, setQualityItems] = useState<QualityItem[]>([]);
  const [filtroStatus, setFiltroStatus] = useState('');

  useEffect(() => {
    // Simulate quality data
    const mockQualityItems: QualityItem[] = [
      {
        id: '1',
        produto: 'Smartphone Galaxy A54',
        score: 85,
        fotos: 8,
        fotos_recomendadas: 12,
        descricao: 95,
        preco_competitivo: true,
        categoria: 'Celulares',
        status: 'bom',
        sugestoes: ['Adicionar mais 4 fotos', 'Incluir foto do produto em uso']
      },
      {
        id: '2',
        produto: 'Fone Bluetooth JBL',
        score: 92,
        fotos: 10,
        fotos_recomendadas: 10,
        descricao: 88,
        preco_competitivo: true,
        categoria: 'Acessórios',
        status: 'excelente',
        sugestoes: ['Melhorar descrição técnica']
      },
      {
        id: '3',
        produto: 'Carregador Wireless',
        score: 68,
        fotos: 4,
        fotos_recomendadas: 8,
        descricao: 72,
        preco_competitivo: false,
        categoria: 'Acessórios',
        status: 'precisa_melhorar',
        sugestoes: ['Adicionar 4 fotos', 'Revisar preço', 'Melhorar descrição']
      },
      {
        id: '4',
        produto: 'Capa Protetora Premium',
        score: 78,
        fotos: 6,
        fotos_recomendadas: 8,
        descricao: 85,
        preco_competitivo: true,
        categoria: 'Acessórios',
        status: 'bom',
        sugestoes: ['Adicionar 2 fotos mostrando proteção']
      }
    ];
    setQualityItems(mockQualityItems);
  }, []);

  const handleRefresh = () => {
    refreshData('qualidade');
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excelente': return <CheckCircle className="text-green-600" size={16} />;
      case 'bom': return <AlertTriangle className="text-yellow-600" size={16} />;
      case 'precisa_melhorar': return <XCircle className="text-red-600" size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excelente': return 'bg-green-100 text-green-800';
      case 'bom': return 'bg-yellow-100 text-yellow-800';
      case 'precisa_melhorar': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excelente': return 'Excelente';
      case 'bom': return 'Bom';
      case 'precisa_melhorar': return 'Precisa Melhorar';
      default: return status;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Qualidade dos Anúncios</h1>
            <p className="text-gray-600 mt-1">
              Otimize seus anúncios para melhorar posicionamento e conversões
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
                <Star className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">80.8</h3>
                <p className="text-sm text-gray-600">Score Médio</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">1</h3>
                <p className="text-sm text-gray-600">Excelentes</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="text-yellow-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">2</h3>
                <p className="text-sm text-gray-600">Precisam Melhorar</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Camera className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">7</h3>
                <p className="text-sm text-gray-600">Fotos Médias</p>
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
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os status</option>
              <option value="excelente">Excelente</option>
              <option value="bom">Bom</option>
              <option value="precisa_melhorar">Precisa Melhorar</option>
            </select>
          </div>
        </div>

        {/* Quality Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Análise de Qualidade</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <LoadingSpinner size="large" />
              <p className="text-gray-600 mt-4">Analisando qualidade dos anúncios...</p>
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
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fotos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {qualityItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.produto}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.categoria}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(item.score)}`}>
                          {item.score}/100
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Image className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-900">
                            {item.fotos}/{item.fotos_recomendadas}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <FileText className="text-gray-400" size={16} />
                          <span className="text-sm text-gray-900">
                            {item.descricao}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="text-gray-400" size={16} />
                          <span className={`text-sm ${item.preco_competitivo ? 'text-green-600' : 'text-red-600'}`}>
                            {item.preco_competitivo ? 'Competitivo' : 'Alto'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 font-medium">
                          Otimizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Suggestions Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sugestões de Melhoria</h2>
          <div className="space-y-4">
            {qualityItems.filter(item => item.sugestoes.length > 0).map((item) => (
              <div key={item.id} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium text-gray-900 mb-2">{item.produto}</h4>
                <ul className="space-y-1">
                  {item.sugestoes.map((sugestao, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{sugestao}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};