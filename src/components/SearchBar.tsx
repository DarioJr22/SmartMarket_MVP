import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, TrendingUp, Target, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'insight' | 'product' | 'competitor' | 'trend';
  category: string;
  icon: React.ReactNode;
  path?: string;
}

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mock suggestions data
  const mockSuggestions: SearchSuggestion[] = [
    {
      id: '1',
      text: 'Análise de concorrência smartphone',
      type: 'insight',
      category: 'Concorrência',
      icon: <Target className="text-blue-600" size={16} />,
      path: '/analises/concorrencia'
    },
    {
      id: '2',
      text: 'Tendência fone bluetooth',
      type: 'trend',
      category: 'Tendências',
      icon: <TrendingUp className="text-green-600" size={16} />,
      path: '/analises/tendencias'
    },
    {
      id: '3',
      text: 'Galaxy A54 otimização',
      type: 'product',
      category: 'Produtos',
      icon: <Star className="text-yellow-600" size={16} />,
      path: '/analises/qualidade'
    },
    {
      id: '4',
      text: 'TechStore Premium preços',
      type: 'competitor',
      category: 'Concorrentes',
      icon: <Target className="text-red-600" size={16} />,
      path: '/analises/concorrencia'
    },
    {
      id: '5',
      text: 'Carregador wireless ranking',
      type: 'product',
      category: 'Ranking',
      icon: <Star className="text-purple-600" size={16} />,
      path: '/analises/ranking'
    }
  ];

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        const filtered = mockSuggestions.filter(suggestion =>
          suggestion.text.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.category.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setIsOpen(false);
    
    // Add to recent searches
    const newRecentSearches = [suggestion.text, ...recentSearches.filter(s => s !== suggestion.text)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    
    // Navigate if path exists
    if (suggestion.path) {
      navigate(suggestion.path);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const newRecentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      setIsOpen(false);
      // Here you would typically perform the actual search
      console.log('Searching for:', query);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setIsOpen(true)}
            placeholder="Buscar insights, produtos..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.length > 0 ? (
            <>
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b">
                Sugestões
              </div>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                >
                  {suggestion.icon}
                  <div>
                    <div className="text-sm text-gray-900">{suggestion.text}</div>
                    <div className="text-xs text-gray-500">{suggestion.category}</div>
                  </div>
                </button>
              ))}
            </>
          ) : query.length > 0 ? (
            <div className="px-3 py-4 text-sm text-gray-500 text-center">
              Nenhum resultado encontrado
            </div>
          ) : null}

          {/* Recent Searches */}
          {recentSearches.length > 0 && query.length === 0 && (
            <>
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b">
                Buscas Recentes
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                >
                  <Clock className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-900">{search}</span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};