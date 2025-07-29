import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnalyticsData {
  concorrencia: any[];
  ranking: any[];
  tendencias: any[];
  qualidade: any[];
  reputacao: any[];
  faturamento: any[];
  clientes: any[];
  operadores: any[];
  insights: any[];
}

interface AnalyticsContextType {
  data: AnalyticsData;
  loading: boolean;
  refreshData: (module?: string) => Promise<void>;
  getInsights: (dataType: string, params?: any) => Promise<any>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AnalyticsData>({
    concorrencia: [],
    ranking: [],
    tendencias: [],
    qualidade: [],
    reputacao: [],
    faturamento: [],
    clientes: [],
    operadores: [],
    insights: []
  });
  const [loading, setLoading] = useState(false);

  const generateMockData = () => {
    return {
      concorrencia: [
        { 
          id: '1', 
          nome: 'Competitor A', 
          preco: 199.90, 
          vendas: 1250, 
          posicao: 1,
          categoria: 'Eletrônicos'
        },
        { 
          id: '2', 
          nome: 'Competitor B', 
          preco: 189.50, 
          vendas: 980, 
          posicao: 2,
          categoria: 'Eletrônicos'
        }
      ],
      ranking: [
        { 
          id: '1', 
          produto: 'Smartphone XYZ', 
          posicao: 3, 
          clicks: 2500, 
          conversao: 8.5,
          categoria: 'Celulares'
        }
      ],
      tendencias: [
        { 
          palavra: 'smartphone', 
          crescimento: 15.5, 
          volume: 50000,
          categoria: 'Tecnologia'
        },
        { 
          palavra: 'fone bluetooth', 
          crescimento: 22.3, 
          volume: 35000,
          categoria: 'Acessórios'
        }
      ],
      qualidade: [
        { 
          produto: 'Produto A', 
          score: 4.5, 
          fotos: 8, 
          descricao: 95,
          preco_competitivo: true
        }
      ],
      reputacao: [
        { 
          periodo: '2024-01', 
          rating: 4.8, 
          vendas: 500, 
          reclamacoes: 2,
          nivel: 'Mercado Líder Platinum'
        }
      ],
      faturamento: [
        { 
          mes: '2024-01', 
          receita: 85000, 
          custos: 52000, 
          lucro: 33000,
          margem: 38.8
        }
      ],
      clientes: [
        { 
          id: '1', 
          nome: 'Cliente Premium', 
          compras: 15, 
          valor_total: 5500,
          ultima_compra: '2024-01-15'
        }
      ],
      operadores: [
        { 
          id: '1', 
          nome: 'Maria Santos', 
          vendas: 120, 
          conversao: 12.5,
          rating: 4.9
        }
      ],
      insights: [
        {
          tipo: 'preco',
          titulo: 'Oportunidade de Ajuste de Preço',
          descricao: 'Reduza o preço em 8% para ganhar a BuyBox',
          impacto: 'alto',
          categoria: 'otimizacao'
        }
      ]
    };
  };

  const refreshData = async (module?: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockData();
      
      if (module) {
        setData(prev => ({ ...prev, [module]: mockData[module as keyof AnalyticsData] }));
      } else {
        setData(mockData);
      }
    } finally {
      setLoading(false);
    }
  };

  const getInsights = async (dataType: string, params?: any) => {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const insights = [
      {
        tipo: 'otimizacao',
        titulo: 'Melhore sua posição no ranking',
        descricao: 'Adicione mais 3 fotos de qualidade para aumentar seu score',
        impacto: 'médio'
      },
      {
        tipo: 'preco',
        titulo: 'Ajuste de preço recomendado',
        descricao: 'Reduza 5% no preço para competir melhor',
        impacto: 'alto'
      }
    ];
    
    return insights;
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AnalyticsContext.Provider value={{ data, loading, refreshData, getInsights }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};