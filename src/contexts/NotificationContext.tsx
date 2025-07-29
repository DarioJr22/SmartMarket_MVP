import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AINotification {
  id: string;
  type: 'price_alert' | 'competitor_change' | 'trend_opportunity' | 'performance_insight' | 'optimization_suggestion';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
  metadata?: {
    product?: string;
    competitor?: string;
    change_percentage?: number;
    potential_impact?: string;
  };
}

interface NotificationContextType {
  notifications: AINotification[];
  unreadCount: number;
  addNotification: (notification: Omit<AINotification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  generateAIInsight: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AINotification[]>([]);

  // AI-powered notification generator
  const generateAIInsight = () => {
    const insightTemplates = [
      {
        type: 'price_alert' as const,
        title: 'Alerta de Preço Competitivo',
        message: 'Concorrente {competitor} reduziu preço do {product} em {change}%. Considere ajustar sua estratégia.',
        priority: 'high' as const,
        actionUrl: '/analises/concorrencia'
      },
      {
        type: 'trend_opportunity' as const,
        title: 'Oportunidade de Tendência',
        message: 'Palavra-chave "{keyword}" cresceu {change}% esta semana. Momento ideal para investir.',
        priority: 'medium' as const,
        actionUrl: '/analises/tendencias'
      },
      {
        type: 'performance_insight' as const,
        title: 'Insight de Performance',
        message: 'Seus anúncios de {category} têm {change}% mais conversão às {time}h. Otimize seus horários.',
        priority: 'medium' as const,
        actionUrl: '/insights-ia'
      },
      {
        type: 'optimization_suggestion' as const,
        title: 'Sugestão de Otimização',
        message: 'Adicionar {suggestion} ao {product} pode aumentar vendas em {impact}%.',
        priority: 'low' as const,
        actionUrl: '/analises/qualidade'
      },
      {
        type: 'competitor_change' as const,
        title: 'Mudança na Concorrência',
        message: '{competitor} lançou nova estratégia. Análise detalhada disponível.',
        priority: 'medium' as const,
        actionUrl: '/analises/concorrencia'
      }
    ];

    const template = insightTemplates[Math.floor(Math.random() * insightTemplates.length)];
    
    // Generate dynamic content
    const competitors = ['TechStore Premium', 'MegaEletro', 'Digital House', 'Smart Gadgets'];
    const products = ['Galaxy A54', 'Fone Bluetooth', 'Carregador Wireless', 'Capa Protetora'];
    const keywords = ['smartphone 5g', 'fone gamer', 'carregador rápido', 'capa premium'];
    const categories = ['Eletrônicos', 'Acessórios', 'Celulares'];
    const suggestions = ['3 fotos profissionais', 'descrição detalhada', 'vídeo demonstrativo'];
    
    let message = template.message
      .replace('{competitor}', competitors[Math.floor(Math.random() * competitors.length)])
      .replace('{product}', products[Math.floor(Math.random() * products.length)])
      .replace('{keyword}', keywords[Math.floor(Math.random() * keywords.length)])
      .replace('{category}', categories[Math.floor(Math.random() * categories.length)])
      .replace('{suggestion}', suggestions[Math.floor(Math.random() * suggestions.length)])
      .replace('{change}', (Math.random() * 30 + 5).toFixed(1))
      .replace('{time}', (Math.floor(Math.random() * 12) + 8).toString())
      .replace('{impact}', (Math.random() * 25 + 10).toFixed(0));

    const newNotification: AINotification = {
      id: Date.now().toString(),
      type: template.type,
      title: template.title,
      message,
      timestamp: new Date(),
      read: false,
      priority: template.priority,
      actionUrl: template.actionUrl,
      metadata: {
        change_percentage: Math.random() * 30 + 5,
        potential_impact: 'medium'
      }
    };

    addNotification(newNotification);
  };

  const addNotification = (notification: Omit<AINotification, 'id' | 'timestamp'>) => {
    const newNotification: AINotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep max 20 notifications
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Generate periodic AI insights
  useEffect(() => {
    // Initial notifications
    const initialNotifications: AINotification[] = [
      {
        id: '1',
        type: 'price_alert',
        title: 'Concorrente baixou preço',
        message: 'TechStore Premium reduziu o preço do Galaxy A54 em 12%. Considere ajustar sua estratégia.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        priority: 'high',
        actionUrl: '/analises/concorrencia'
      },
      {
        id: '2',
        type: 'trend_opportunity',
        title: 'Oportunidade de tendência detectada',
        message: 'Palavra-chave "fone gamer" cresceu 45% esta semana. Momento ideal para investir.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        priority: 'medium',
        actionUrl: '/analises/tendencias'
      }
    ];

    setNotifications(initialNotifications);

    // Generate new insights periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every interval
        generateAIInsight();
      }
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      generateAIInsight
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};