import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  User, 
  Bell, 
  Shield, 
  Key,
  Database,
  Palette,
  Globe,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';

// Validation schemas
const perfilSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup.string(),
  empresa: yup.string()
});

const segurancaSchema = yup.object({
  senhaAtual: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  novaSenha: yup.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
  confirmarSenha: yup.string().oneOf([yup.ref('novaSenha')], 'Senhas não coincidem')
});

const apiSchema = yup.object({
  mercadoLivreToken: yup.string(),
  webhookUrl: yup.string().url('URL inválida'),
  rateLimitRequests: yup.number().min(1).max(1000)
});

interface ConfigSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const ConfiguracoesPage: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('perfil');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const [formData, setFormData] = useState({
    // Perfil
    nome: user?.name || '',
    email: user?.email || '',
    telefone: '',
    empresa: '',
    
    // Notificações
    emailNotifications: true,
    pushNotifications: true,
    alertasPreco: true,
    alertasConcorrencia: true,
    relatorioSemanal: true,
    
    // Segurança
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: '',
    autenticacaoDoisFatores: false,
    
    // API
    mercadoLivreToken: '',
    webhookUrl: '',
    rateLimitRequests: 100,
    
    // Interface
    tema: 'light',
    idioma: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    moedaPadrao: 'BRL'
  });

  // Form hooks for validation
  const perfilForm = useForm({
    resolver: yupResolver(perfilSchema),
    defaultValues: {
      nome: user?.name || '',
      email: user?.email || '',
      telefone: '',
      empresa: ''
    }
  });

  const segurancaForm = useForm({
    resolver: yupResolver(segurancaSchema),
    defaultValues: {
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: ''
    }
  });

  const apiForm = useForm({
    resolver: yupResolver(apiSchema),
    defaultValues: {
      mercadoLivreToken: '',
      webhookUrl: '',
      rateLimitRequests: 100
    }
  });

  const sections: ConfigSection[] = [
    {
      id: 'perfil',
      title: 'Perfil',
      icon: <User size={20} />,
      description: 'Informações pessoais e da empresa'
    },
    {
      id: 'notificacoes',
      title: 'Notificações',
      icon: <Bell size={20} />,
      description: 'Configurar alertas e notificações'
    },
    {
      id: 'seguranca',
      title: 'Segurança',
      icon: <Shield size={20} />,
      description: 'Senha e autenticação'
    },
    {
      id: 'api',
      title: 'Integrações',
      icon: <Key size={20} />,
      description: 'APIs e webhooks'
    },
    {
      id: 'interface',
      title: 'Interface',
      icon: <Palette size={20} />,
      description: 'Tema e preferências visuais'
    }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    
    try {
      // Validate current section
      let isValid = true;
      
      if (activeSection === 'perfil') {
        isValid = await perfilForm.trigger();
      } else if (activeSection === 'seguranca') {
        isValid = await segurancaForm.trigger();
      } else if (activeSection === 'api') {
        isValid = await apiForm.trigger();
      }
      
      if (!isValid) {
        setError('Por favor, corrija os erros no formulário');
        return;
      }
      
      // Simulate API call with validation
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional API errors
          if (Math.random() > 0.9) {
            reject(new Error('Erro no servidor. Tente novamente.'));
          } else {
            resolve(true);
          }
        }, 1000);
      });
      
      setSavedMessage('Configurações salvas com sucesso!');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderPerfilSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              {...perfilForm.register('nome')}
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                perfilForm.formState.errors.nome ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {perfilForm.formState.errors.nome && (
              <p className="text-red-500 text-sm mt-1">{perfilForm.formState.errors.nome.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              {...perfilForm.register('email')}
              type="email"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                perfilForm.formState.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {perfilForm.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{perfilForm.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              {...perfilForm.register('telefone')}
              type="tel"
              placeholder="(11) 99999-9999"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empresa
            </label>
            <input
              {...perfilForm.register('empresa')}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );

  const renderNotificacoesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferências de Notificação</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Notificações por E-mail', description: 'Receber alertas por e-mail' },
            { key: 'pushNotifications', label: 'Notificações Push', description: 'Notificações no navegador' },
            { key: 'alertasPreco', label: 'Alertas de Preço', description: 'Quando concorrentes mudarem preços' },
            { key: 'alertasConcorrencia', label: 'Alertas de Concorrência', description: 'Novos concorrentes ou mudanças' },
            { key: 'relatorioSemanal', label: 'Relatório Semanal', description: 'Resumo semanal de performance' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[item.key as keyof typeof formData] as boolean}
                  onChange={(e) => handleInputChange(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSegurancaSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alterar Senha</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha Atual
            </label>
            <div className="relative">
              <input
                {...segurancaForm.register('senhaAtual')}
                type={showPassword ? 'text' : 'password'}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                  segurancaForm.formState.errors.senhaAtual ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {segurancaForm.formState.errors.senhaAtual && (
              <p className="text-red-500 text-sm mt-1">{segurancaForm.formState.errors.senhaAtual.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nova Senha
              </label>
              <input
                {...segurancaForm.register('novaSenha')}
                type="password"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  segurancaForm.formState.errors.novaSenha ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {segurancaForm.formState.errors.novaSenha && (
                <p className="text-red-500 text-sm mt-1">{segurancaForm.formState.errors.novaSenha.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Nova Senha
              </label>
              <input
                {...segurancaForm.register('confirmarSenha')}
                type="password"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  segurancaForm.formState.errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {segurancaForm.formState.errors.confirmarSenha && (
                <p className="text-red-500 text-sm mt-1">{segurancaForm.formState.errors.confirmarSenha.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Autenticação de Dois Fatores</h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <div className="font-medium text-gray-900">Ativar 2FA</div>
            <div className="text-sm text-gray-500">Adicione uma camada extra de segurança</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.autenticacaoDoisFatores}
              onChange={(e) => handleInputChange('autenticacaoDoisFatores', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderApiSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integração Mercado Livre</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Access Token
            </label>
            <input
              {...apiForm.register('mercadoLivreToken')}
              type="password"
              placeholder="APP_USR-..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Token de acesso para integração com a API do Mercado Livre
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Webhook URL
            </label>
            <input
              {...apiForm.register('webhookUrl')}
              type="url"
              placeholder="https://seu-site.com/webhook"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                apiForm.formState.errors.webhookUrl ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {apiForm.formState.errors.webhookUrl && (
              <p className="text-red-500 text-sm mt-1">{apiForm.formState.errors.webhookUrl.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              URL para receber notificações em tempo real
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate Limit (requests/hora)
            </label>
            <input
              {...apiForm.register('rateLimitRequests')}
              type="number"
              min="1"
              max="1000"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                apiForm.formState.errors.rateLimitRequests ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {apiForm.formState.errors.rateLimitRequests && (
              <p className="text-red-500 text-sm mt-1">{apiForm.formState.errors.rateLimitRequests.message}</p>
            )}
          </div>
        </form>
      </div>
      
      {/* Connection Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Status da Conexão</h4>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Conectado - Última sincronização: há 5 minutos</span>
        </div>
        <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
          Testar conexão
        </button>
      </div>
    </div>
  );

  const renderInterfaceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferências de Interface</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tema
            </label>
            <select
              value={formData.tema}
              onChange={(e) => handleInputChange('tema', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Idioma
            </label>
            <select
              value={formData.idioma}
              onChange={(e) => handleInputChange('idioma', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fuso Horário
            </label>
            <select
              value={formData.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
              <option value="America/New_York">New York (GMT-5)</option>
              <option value="Europe/London">London (GMT+0)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Moeda Padrão
            </label>
            <select
              value={formData.moedaPadrao}
              onChange={(e) => handleInputChange('moedaPadrao', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="BRL">Real (R$)</option>
              <option value="USD">Dólar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'perfil': return renderPerfilSection();
      case 'notificacoes': return renderNotificacoesSection();
      case 'seguranca': return renderSegurancaSection();
      case 'api': return renderApiSection();
      case 'interface': return renderInterfaceSection();
      default: return renderPerfilSection();
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
            <p className="text-gray-600 mt-1">
              Gerencie suas preferências e configurações da conta
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</span>
          </button>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
            <Check className="text-green-600" size={20} />
            <span className="text-green-800">{savedMessage}</span>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
            <X className="text-red-600" size={20} />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {section.icon}
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-gray-500">{section.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};