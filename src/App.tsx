import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { ConcorrenciaPage } from './pages/analises/ConcorrenciaPage';
import { RankingPage } from './pages/analises/RankingPage';
import { TendenciasPage } from './pages/analises/TendenciasPage';
import { QualidadePage } from './pages/analises/QualidadePage';
import { ReputacaoPage } from './pages/analises/ReputacaoPage';
import { FaturamentoPage } from './pages/analises/FaturamentoPage';
import { ClientesPage } from './pages/analises/ClientesPage';
import { OperadoresPage } from './pages/analises/OperadoresPage';
import { InsightsIAPage } from './pages/InsightsIAPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ChatBot } from './components/ChatBot';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AnalyticsProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises/concorrencia"
                  element={
                    <ProtectedRoute>
                      <ConcorrenciaPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises/ranking"
                  element={
                    <ProtectedRoute>
                      <RankingPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises/tendencias"
                  element={
                    <ProtectedRoute>
                      <TendenciasPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises/qualidade"
                  element={
                    <ProtectedRoute>
                      <QualidadePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises/reputacao"
                  element={
                    <ProtectedRoute>
                      <ReputacaoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises/faturamento"
                  element={
                    <ProtectedRoute>
                      <FaturamentoPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises/clientes"
                  element={
                    <ProtectedRoute>
                      <ClientesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analises/operadores"
                  element={
                    <ProtectedRoute>
                      <OperadoresPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/insights-ia"
                  element={
                    <ProtectedRoute>
                      <InsightsIAPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/configuracoes"
                  element={
                    <ProtectedRoute>
                      <ConfiguracoesPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <ChatBot />
            </div>
          </Router>
        </AnalyticsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;