import React, { useState } from 'react';
import { ChevronRight, BarChart3, TrendingUp, Shield, Star, Play, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [diagnosticoForm, setDiagnosticoForm] = useState({
    vendas_mes: '',
    categoria: '',
    tempo_ml: '',
    principal_problema: ''
  });

  const handleDiagnostico = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate diagnosis
    setTimeout(() => {
      navigate('/auth');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-gray-900">SmartMarket BI</span>
            </div>
            <button
              onClick={() => navigate('/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - SITUATION */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Venda mais no
                <span className="text-yellow-400"> Mercado Livre</span> com
                <span className="text-yellow-400"> Inteligência Artificial</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Aumente suas vendas em até 300% com análises precisas, insights de IA e estratégias personalizadas para dominar seu nicho.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  Começar Agora
                  <ChevronRight className="ml-2" size={20} />
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center">
                  <Play className="mr-2" size={20} />
                  Ver Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span>Vendas este mês</span>
                    <span className="text-green-400 font-bold">↗ +247%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span>Posição no ranking</span>
                    <span className="text-yellow-400 font-bold">#1</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span>Score do anúncio</span>
                    <span className="text-blue-400 font-bold">98/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - PROBLEM */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Por que vendedores estão perdendo dinheiro no Mercado Livre?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A falta de dados precisos e insights estratégicos está custando milhares de reais por mês
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sem visibilidade da concorrência",
                description: "Você não sabe o que seus concorrentes estão fazendo e perde oportunidades",
                impact: "Perda média: R$ 5.000/mês"
              },
              {
                title: "Preços desalinhados",
                description: "Preços muito altos ou baixos devido à falta de análise de mercado",
                impact: "Perda média: R$ 8.000/mês"
              },
              {
                title: "Anúncios mal otimizados",
                description: "Fotos ruins, títulos pobres e descrições que não convertem",
                impact: "Perda média: R$ 12.000/mês"
              }
            ].map((problem, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{problem.title}</h3>
                <p className="text-gray-600 mb-4">{problem.description}</p>
                <div className="text-red-600 font-bold text-lg">{problem.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - IMPLICATION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              A solução que você precisa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SmartMarket BI transforma dados do Mercado Livre em estratégias vencedoras
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                icon: <TrendingUp className="text-blue-600" size={32} />,
                title: "Análise de Concorrência",
                description: "Monitore preços, vendas e estratégias dos seus concorrentes em tempo real"
              },
              {
                icon: <BarChart3 className="text-green-600" size={32} />,
                title: "Insights de IA",
                description: "Recomendações personalizadas baseadas em machine learning"
              },
              {
                icon: <Shield className="text-purple-600" size={32} />,
                title: "Otimização Automática",
                description: "Sugestões precisas para melhorar rankings e conversões"
              },
              {
                icon: <Star className="text-yellow-600" size={32} />,
                title: "Dashboard Executivo",
                description: "Métricas essenciais em uma interface intuitiva e poderosa"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Section - NEED PAYOFF */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Diagnóstico Gratuito
            </h2>
            <p className="text-xl text-gray-600">
              Descubra seu potencial de crescimento em 2 minutos
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleDiagnostico} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendas mensais atuais
                  </label>
                  <select
                    value={diagnosticoForm.vendas_mes}
                    onChange={(e) => setDiagnosticoForm({...diagnosticoForm, vendas_mes: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="0-5000">R$ 0 - R$ 5.000</option>
                    <option value="5000-20000">R$ 5.000 - R$ 20.000</option>
                    <option value="20000-50000">R$ 20.000 - R$ 50.000</option>
                    <option value="50000+">R$ 50.000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria principal
                  </label>
                  <select
                    value={diagnosticoForm.categoria}
                    onChange={(e) => setDiagnosticoForm({...diagnosticoForm, categoria: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="eletronicos">Eletrônicos</option>
                    <option value="moda">Moda</option>
                    <option value="casa">Casa e Jardim</option>
                    <option value="esportes">Esportes</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempo no Mercado Livre
                  </label>
                  <select
                    value={diagnosticoForm.tempo_ml}
                    onChange={(e) => setDiagnosticoForm({...diagnosticoForm, tempo_ml: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="0-6m">Menos de 6 meses</option>
                    <option value="6m-1a">6 meses a 1 ano</option>
                    <option value="1a-3a">1 a 3 anos</option>
                    <option value="3a+">Mais de 3 anos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Principal problema
                  </label>
                  <select
                    value={diagnosticoForm.principal_problema}
                    onChange={(e) => setDiagnosticoForm({...diagnosticoForm, principal_problema: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="baixas-vendas">Baixas vendas</option>
                    <option value="concorrencia">Muita concorrência</option>
                    <option value="preco">Definição de preços</option>
                    <option value="ranking">Posição no ranking</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Receber Diagnóstico Gratuito
                <ArrowRight className="ml-2" size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Resultados comprovados
            </h2>
            <p className="text-xl text-gray-300">
              Mais de 5.000 vendedores já aumentaram suas vendas conosco
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Silva",
                result: "+340% em vendas",
                category: "Eletrônicos",
                quote: "Em 3 meses consegui triplicar minhas vendas seguindo as recomendações da IA."
              },
              {
                name: "Ana Maria",
                result: "R$ 50k em 30 dias",
                category: "Moda Feminina",
                quote: "O sistema me mostrou exatamente onde estava errando. Resultado imediato!"
              },
              {
                name: "João Pedro",
                result: "#1 no ranking",
                category: "Casa e Jardim",
                quote: "Nunca pensei que chegaria ao topo da categoria. SmartMarket BI fez a diferença."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-gray-700 pt-4">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.category}</div>
                  <div className="text-green-400 font-bold mt-1">{testimonial.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para aumentar suas vendas?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a milhares de vendedores que já transformaram seus negócios
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/auth')}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              Começar Agora - Grátis
              <ChevronRight className="ml-2" size={20} />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-blue-200">
            <div className="flex items-center">
              <Check size={16} className="mr-2" />
              Sem compromisso
            </div>
            <div className="flex items-center">
              <Check size={16} className="mr-2" />
              Suporte 24/7
            </div>
            <div className="flex items-center">
              <Check size={16} className="mr-2" />
              Resultados garantidos
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-white" size={20} />
                </div>
                <span className="text-lg font-bold">SmartMarket BI</span>
              </div>
              <p className="text-gray-400 text-sm">
                A plataforma de inteligência para vendedores do Mercado Livre.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Análise de Concorrência</li>
                <li>Insights de IA</li>
                <li>Dashboard</li>
                <li>Otimização</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>Documentação</li>
                <li>Status</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreiras</li>
                <li>Privacidade</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 SmartMarket BI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};