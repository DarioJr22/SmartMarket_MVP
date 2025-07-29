import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Filter,
  Download,
  Zap,
  Target,
  DollarSign,
  Star
} from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface AIInsight {
  id: string;
  tipo: 'otimizacao' | 'preco' | 'tendencia' | 'qualidade' | 'concorrencia';
  titulo: string;
  descricao: string;
  impacto: 'alto' | 'medio' | 'baixo';
  categoria: string;
  confianca: number;
  acao_recomendada: string;
  potencial_ganho: string;
  prazo_implementacao: string;
  status: 'nova' | 'em_andamento' | 'implementada' | 'descartada';
  data_criacao: string;
}

export const InsightsIAPage: React.FC = () => {
  const { data, loading, getInsights } = useAnalytics();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroImpacto, setFiltroImpacto] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Simulate AI insights
    const mockInsights: AIInsight[] = [
      {
        id: '1',
        tipo: 'preco',
        titulo: 'Oportunidade de Ajuste de Preço',
        descricao: 'Reduza o preço do Smartphone Galaxy A54 em 8% para ganhar a BuyBox e aumentar vendas em 35%',
        impacto: 'alto',
        categoria: 'Eletrônicos',
        confianca: 92,
        acao_recomendada: 'Ajustar preço de R$ 1.299,90 para R$ 1.195,90',
        potencial_ganho: 'R$ 15.000/mês',
        prazo_implementacao: 'Imediato',
        status: 'nova',
        data_criacao: '2024-01-20'
      },
      {
        id: '2',
        tipo: 'qualidade',
        titulo: 'Melhore Qualidade do Anúncio',
        descricao: 'Adicione 4 fotos profissionais ao Carregador Wireless para subir 3 posições no ranking',
        impacto: 'medio',
        categoria: 'Acessórios',
        confianca: 87,
        acao_recomendada: 'Contratar fotógrafo profissional',
        potencial_ganho: 'R$ 8.500/mês',
        prazo_implementacao: '3-5 dias',
        status: 'em_andamento',
        data_criacao: '2024-01-19'
      },
      {
        id: '3',
        tipo: 'tendencia',
        titulo: 'Aproveite Tendência Emergente',
        descricao: 'Palavra-chave "fone gamer" cresceu 45% - lance produtos relacionados agora',
        impacto: 'alto',
        categoria: 'Gaming',
        confianca: 94,
        acao_recomendada: 'Criar anúncios com palavra-chave "fone gamer"',
        potencial_ganho: 'R$ 22.000/mês',
        prazo_implementacao: '1-2 dias',
        status: 'nova',
        data_criacao: '2024-01-20'
      },
      {
        id: '4',
        tipo: 'concorrencia',
        titulo: 'Concorrente Vulnerável',
        descricao: 'TechStore Premium tem estoque baixo - aumente investimento em ads para capturar tráfego',
        impacto: 'medio',
        categoria: 'Eletrônicos',
        confianca: 78,
        acao_recomendada: 'Aumentar budget de anúncios em 40%',
        potencial_ganho: 'R$ 12.000/mês',
        prazo_implementacao: 'Imediato',
        status: 'implementada',
        data_criacao: '2024-01-18'
      },
      {
        id: '5',
        tipo: 'otimizacao',
        titulo: 'Otimize Horário de Publicação',
        descricao: 'Publique novos produtos às 14h para maximizar visualizações em 28%',
        impacto: 'baixo',
        categoria: 'Geral',
        confianca: 71,
        acao_recomendada: 'Agendar publicações para 14h',
        potencial_ganho: 'R$ 3.500/mês',
        prazo_implementacao: 'Imediato',
        status: 'nova',
        data_criacao: '2024-01-19'
      }
    ];
    setInsights(mockInsights);
  }, []);

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new insight
      const newInsight: AIInsight = {
        id: Date.now().toString(),
        tipo: 'preco',
        titulo: 'Nova Oportunidade Detectada',
        descricao: 'IA detectou padrão de compra que sugere aumento de preço em produtos premium',
        impacto: 'alto',
        categoria: 'Premium',
        confianca: 89,
        acao_recomendada: 'Testar aumento de 12% em produtos premium',
        potencial_ganho: 'R$ 18.000/mês',
        prazo_implementacao: '1 semana',
        status: 'nova',
        data_criacao: new Date().toISOString().split('T')[0]
      };
      
      setInsights(prev => [newInsight, ...prev]);
    } finally {
      setIsGenerating(false);
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'preco': return <DollarSign className="text-green-600" size={20} />;
      case 'qualidade': return <Star className="text-yellow-600" size={20} />;
      case 'tendencia': return <TrendingUp className="text-blue-600" size={20} />;
      case 'concorrencia': return <Target className="text-red-600" size={20} />;
      case 'otimizacao': return <Zap className="text-purple-600" size={20} />;
      default: return <Brain className="text-gray-600" size={20} />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'preco': return 'bg-green-100 text-green-800';
      case 'qualidade': return 'bg-yellow-100 text-yellow-800';
      case 'tendencia': return 'bg-blue-100 text-blue-800';
      case 'concorrencia': return 'bg-red-100 text-red-800';
      case 'otimizacao': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case 'alto': return 'bg-red-100 text-red-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'baixo': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'nova': return <Lightbulb className="text-blue-600" size={16} />;
      case 'em_andamento': return <RefreshCw className="text-yellow-600" size={16} />;
      case 'implementada': return <CheckCircle className="text-green-600" size={16} />;
      case 'descartada': return <AlertTriangle className="text-red-600" size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nova': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'implementada': return 'bg-green-100 text-green-800';
      case 'descartada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const insightsNovas = insights.filter(i => i.status === 'nova').length;
  const insightsAltoImpacto = insights.filter(i => i.impacto === 'alto').length;
  const confiancaMedia = insights.reduce((sum, i) => sum + i.confianca, 0) / insights.length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Insights de IA</h1>
            <p className="text-gray-600 mt-1">
              Recomendações inteligentes para otimizar suas vendas
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleGenerateInsights}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Brain size={16} className={isGenerating ? 'animate-pulse' : ''} />
              <span>{isGenerating ? 'Gerando...' : 'Gerar Insights'}</span>
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
                <Lightbulb className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{insightsNovas}</h3>
                <p className="text-sm text-gray-600">Insights Novas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="text-red-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{insightsAltoImpacto}</h3>
                <p className="text-sm text-gray-600">Alto Impacto</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {confiancaMedia ? Math.round(confiancaMedia) : 0}%
                </h3>
                <p className="text-sm text-gray-600">Confiança Média</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{insights.length}</h3>
                <p className="text-sm text-gray-600">Total de Insights</p>
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
              <option value="preco">Preço</option>
              <option value="qualidade">Qualidade</option>
              <option value="tendencia">Tendência</option>
              <option value="concorrencia">Concorrência</option>
              <option value="otimizacao">Otimização</option>
            </select>
            <select
              value={filtroImpacto}
              onChange={(e) => setFiltroImpacto(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos os impactos</option>
              <option value="alto">Alto Impacto</option>
              <option value="medio">Médio Impacto</option>
              <option value="baixo">Baixo Impacto</option>
            </select>
          </div>
        </div>

        {/* Insights Grid */}
        {loading ? (
          <div className="p-8 text-center">
            <LoadingSpinner size="large" />
            <p className="text-gray-600 mt-4">Carregando insights de IA...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight) => (
              <div key={insight.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getTipoIcon(insight.tipo)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{insight.titulo}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTipoColor(insight.tipo)}`}>
                          {insight.tipo.charAt(0).toUpperCase() + insight.tipo.slice(1)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getImpactoColor(insight.impacto)}`}>
                          {insight.impacto.charAt(0).toUpperCase() + insight.impacto.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(insight.status)}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(insight.status)}`}>
                      {insight.status.replace('_', ' ').charAt(0).toUpperCase() + insight.status.replace('_', ' ').slice(1)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4">{insight.descricao}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Confiança</div>
                    <div className="text-lg font-semibold text-gray-900">{insight.confianca}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Potencial</div>
                    <div className="text-lg font-semibold text-green-600">{insight.potencial_ganho}</div>
                  </div>
                </div>

                {/* Action */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ação Recomendada</div>
                  <div className="text-sm text-gray-900">{insight.acao_recomendada}</div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Prazo: {insight.prazo_implementacao}</span>
                  <span>{new Date(insight.data_criacao).toLocaleDateString('pt-BR')}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Implementar
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};