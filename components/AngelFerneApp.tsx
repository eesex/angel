import React, { useState, useEffect } from 'react';
import { AuthLogin } from './AuthLogin';
import { Dashboard } from './Dashboard';
import { TwitchBot } from './TwitchBot';
import { UserRegistration } from './UserRegistration';
import { Sidebar } from './Sidebar';
import { Home, BarChart3, Bot, Users, HelpCircle, Terminal } from 'lucide-react';

interface User {
  username: string;
  subscriptionExpiry: string;
  isAdmin: boolean;
}

type ActivePage = 'home' | 'dashboard' | 'twitch-bot' | 'users' | 'support' | 'logs';

export function AngelFerneApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState('');
  const [activePage, setActivePage] = useState<ActivePage>('home');

  useEffect(() => {
    const savedAuth = localStorage.getItem('angelferne_auth');
    if (savedAuth) {
      try {
        const userData = JSON.parse(savedAuth);
        if (isSubscriptionValid(userData.subscriptionExpiry, userData.isAdmin)) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('angelferne_auth');
          setAuthError('Срок подписки истёк.');
        }
      } catch (error) {
        localStorage.removeItem('angelferne_auth');
      }
    }
  }, []);

  const isSubscriptionValid = (subscriptionExpiry: string, isAdmin: boolean): boolean => {
    if (isAdmin) return true;
    const expiryDate = new Date(subscriptionExpiry);
    const currentDate = new Date();
    return currentDate <= expiryDate;
  };

  const handleLogin = (credentials: { username: string; password: string }) => {
    setAuthError('');

    if (credentials.username === 'admin' && credentials.password === 'admin') {
      const userData: User = {
        username: credentials.username,
        subscriptionExpiry: '2024-12-31',
        isAdmin: true
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('angelferne_auth', JSON.stringify(userData));
    }
    else if (credentials.username === 'demo' && credentials.password === 'demo') {
      const userData: User = {
        username: credentials.username,
        subscriptionExpiry: '2024-12-31',
        isAdmin: false
      };
      
      if (isSubscriptionValid(userData.subscriptionExpiry, userData.isAdmin)) {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('angelferne_auth', JSON.stringify(userData));
      } else {
        setAuthError('Срок подписки истёк.');
      }
    }
    else if (credentials.username === 'user' && credentials.password === 'user') {
      const userData: User = {
        username: credentials.username,
        subscriptionExpiry: '2024-12-31',
        isAdmin: false
      };
      
      if (isSubscriptionValid(userData.subscriptionExpiry, userData.isAdmin)) {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('angelferne_auth', JSON.stringify(userData));
      } else {
        setAuthError('Срок подписки истёк.');
      }
    }
    else {
      setAuthError('Неверные учетные данные');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActivePage('home');
    localStorage.removeItem('angelferne_auth');
  };

  const sidebarItems = [
    { id: 'home' as ActivePage, label: 'Home', icon: Home },
    { id: 'dashboard' as ActivePage, label: 'Dashboard', icon: BarChart3 },
    { id: 'twitch-bot' as ActivePage, label: 'Twitch Bot', icon: Bot },
    ...(user?.isAdmin ? [{ id: 'users' as ActivePage, label: 'Пользователи', icon: Users }] : []),
    { id: 'support' as ActivePage, label: 'Поддержка', icon: HelpCircle },
    { id: 'logs' as ActivePage, label: 'Логи', icon: Terminal },
  ];

  if (!isAuthenticated) {
    return <AuthLogin onLogin={handleLogin} error={authError} />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        items={sidebarItems}
        activeItem={activePage}
        onItemClick={setActivePage}
        user={user}
        onLogout={handleLogout}
      />
      <div className="flex-1">
        {activePage === 'home' && <Dashboard user={user} />}
        {activePage === 'dashboard' && <Dashboard user={user} />}
        {activePage === 'twitch-bot' && <TwitchBot />}
        {activePage === 'users' && user?.isAdmin && <UserRegistration />}
        {activePage === 'support' && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto text-center py-16">
              <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Поддержка</h2>
              <p className="text-muted-foreground">Модуль в разработке</p>
            </div>
          </div>
        )}
        {activePage === 'logs' && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-primary" />
                Системные логи
              </h1>
              <div className="bg-card rounded-lg p-6 border">
                <div className="space-y-2 text-sm font-mono">
                  <div className="text-green-400">
                    [{new Date().toLocaleTimeString()}] INFO: AngelFerne система запущена
                  </div>
                  <div className="text-blue-400">
                    [{new Date().toLocaleTimeString()}] DEBUG: Пользователь {user?.username} авторизован
                  </div>
                  <div className="text-yellow-400">
                    [{new Date().toLocaleTimeString()}] WARN: Проверка лицензии выполнена
                  </div>
                  <div className="text-red-400">
                    [{new Date().toLocaleTimeString()}] ERROR: Демо режим активен
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}