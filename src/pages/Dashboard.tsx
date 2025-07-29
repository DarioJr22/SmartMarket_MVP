import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Star,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon,
  onClick 
}) => {
  const changeColors = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  const changeIcons = {
    positive: <TrendingUp size={16} />,
    negative: <TrendingDown size={16} />,
    neutral: <BarChart3 size={16} />
  };

  return (
    <div 
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-blue-300' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${changeColors[changeType]}`}>
          {changeIcons[changeType]}
          <span>{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, refreshData } = useAnalytics();
  const [insights, setInsights] = useState<any[]>([]);

  useEffect(() => {
    // Simulate real-time insights
    const mockInsights = [
      {
        id: '1',
        type: 'warning',
        title: 'Concorrente baixou preço',
        description: 'Competitor A reduziu o preço em 12% no produto XYZ',
        action: 'Analisar Concorrência',
        path: '/analises/concorrencia',
        priority: 'high'
      },
      {
        id: '2',
        type: 'success',
        title: 'Oportunidade de ranking',
        description: 'Você pode subir 3 posições otimizando suas fotos',
        action: 'Ver Qualidade',
        path: '/analises/qualidade',
        priority: 'medium'
      },
      {
        id: '3',
        type: 'info',
        title: 'Tendência emergente',
        description: 'Palavra-chave "fone gamer" cresceu 45% esta semana',
        action: 'Ver Tendências',
        path: '/analises/tendencias',
        priority: 'medium'
      }
    ];
    setInsights(mockInsights);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case 'success':
        return <CheckCircle className="text-green-600" size={20} />;
      default:
        return <Clock className="text-blue-600" size={20} />;
    }
  };

  const getInsightBorder = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500';
      case 'success':
        return 'border-l-green-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Visão geral do seu desempenho no Mercado Livre
            </p>
          </div>
          <button
            onClick={() => refreshData()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <BarChart3 size={20} />
            <span>Atualizar Dados</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Vendas este mês"
            value="R$ 45.200"
            change="+23.5%"
            changeType="positive"
            icon={<DollarSign className="text-blue-600" size={24} />}
            onClick={() => navigate('/analises/faturamento')}
          />
          <MetricCard
            title="Posição média"
            value="#3"
            change="+2 posições"
            changeType="positive"
            icon={<Target className="text-blue-600" size={24} />}
            onClick={() => navigate('/analises/ranking')}
          />
          <MetricCard
            title="Taxa de conversão"
            value="8.5%"
            change="+1.2%"
            changeType="positive"
            icon={<TrendingUp className="text-blue-600" size={24} />}
            onClick={() => navigate('/analises/qualidade')}
          />
          <MetricCard
            title="Reputação"
            value="4.8/5"
            change="Estável"
            changeType="neutral"
            icon={<Star className="text-blue-600" size={24} />}
            onClick={() => navigate('/analises/reputacao')}
          />
        </div>

        {/* Insights Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Real-time Insights */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Insights em Tempo Real</h2>
                <button
                  onClick={() => navigate('/insights-ia')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>Ver todos</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`p-4 border-l-4 ${getInsightBorder(insight.type)} bg-gray-50 rounded-r-lg cursor-pointer hover:bg-gray-100 transition-colors`}
                    onClick={() => navigate(insight.path)}
                  >
                    <div className="flex items-start space-x-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {insight.description}
                        </p>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          {insight.action} →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
              
              <div className="space-y-3">
                {[
                  {
                    title: 'Analisar Concorrência',
                    description: 'Compare preços e estratégias',
                    path: '/analises/concorrencia',
                    icon: <Users className="text-blue-600" size={20} />
                  },
                  {
                    title: 'Verificar Tendências',
                    description: 'Palavras-chave em alta',
                    path: '/analises/tendencias',
                    icon: <TrendingUp className="text-green-600" size={20} />
                  },
                  {
                    title: 'Otimizar Anúncios',
                    description: 'Melhore a qualidade',
                    path: '/analises/qualidade',
                    icon: <Star className="text-yellow-600" size={20} />
                  },
                  {
                    title: 'Insights de IA',
                    description: 'Recomendações personalizadas',
                    path: '/insights-ia',
                    icon: <BarChart3 className="text-purple-600" size={20} />
                  }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      {action.icon}
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Performance dos Últimos 30 Dias</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg">
                Vendas
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                Visitas
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                Conversão
              </button>
            </div>
          </div>
          
          <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="text-blue-400 mx-auto mb-4" size={48} />
              <p className="text-gray-600">Gráfico de performance seria exibido aqui</p>
              <p className="text-sm text-gray-500 mt-2">
                Integração com biblioteca de gráficos em desenvolvimento
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};