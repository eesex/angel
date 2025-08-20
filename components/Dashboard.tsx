import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MetricCard } from './MetricCard';
import { InfernoLevelSystem } from './InfernoLevelSystem';
import { 
  TrendingUp, 
  Target, 
  Users, 
  Bot, 
  MessageSquare, 
  Activity,
  Crown,
  Calendar,
  Shield,
  Zap
} from 'lucide-react';

interface User {
  username: string;
  subscriptionExpiry: string;
  isAdmin: boolean;
}

interface DashboardProps {
  user: User | null;
}

export function Dashboard({ user }: DashboardProps) {
  const [stats, setStats] = useState({
    currentViewers: 1247,
    totalMessages: 89,
    activeBots: 3,
    successRate: 98.7
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        currentViewers: prev.currentViewers + Math.floor(Math.random() * 10) - 5,
        totalMessages: prev.totalMessages + Math.floor(Math.random() * 3),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <span className="text-primary">🔥</span>
            AngelFerne Dashboard
            {user?.isAdmin && <Crown className="w-10 h-10 text-yellow-400" />}
          </h1>
          <p className="text-muted-foreground text-lg">
            Добро пожаловать, <span className="text-primary font-semibold">{user?.username}</span>!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Успешность"
            value="98.7%"
            icon={<TrendingUp className="text-green-400" size={24} />}
          />
          <MetricCard
            title="Текущие зрители"
            value={stats.currentViewers.toLocaleString()}
            icon={<Users className="text-blue-400" size={24} />}
          />
          <MetricCard
            title="Активных ботов"
            value={stats.activeBots.toString()}
            icon={<Bot className="text-purple-400" size={24} />}
          />
          <MetricCard
            title="Сообщений"
            value={stats.totalMessages.toString()}
            icon={<MessageSquare className="text-yellow-400" size={24} />}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inferno Level System */}
          <InfernoLevelSystem />

          {/* Quick Actions */}
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Быстрые действия
              </CardTitle>
              <CardDescription>
                Основные функции AngelFerne
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Запустить Twitch Bot
                </Button>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Управление накруткой
                </Button>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Управление чатом
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Информация о пользователе
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Пользователь</div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{user?.username}</span>
                  {user?.isAdmin && <Crown className="w-4 h-4 text-yellow-400" />}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Статус</div>
                <Badge variant={user?.isAdmin ? "default" : "secondary"}>
                  {user?.isAdmin ? '👑 Администратор' : '✅ Активный'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Подписка</div>
                <div className="font-medium">
                  {user?.isAdmin ? '♾️ Безлимитная' : '📅 До 31.12.2024'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Последняя активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Бот подключен к каналу</span>
                <span className="text-muted-foreground text-xs ml-auto">Только что</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Отправлено 15 сообщений</span>
                <span className="text-muted-foreground text-xs ml-auto">2 мин назад</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm">Накручено 245 зрителей</span>
                <span className="text-muted-foreground text-xs ml-auto">5 мин назад</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}