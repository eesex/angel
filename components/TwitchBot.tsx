import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Bot, 
  Play, 
  Pause, 
  Square, 
  Users, 
  MessageSquare, 
  CheckCircle, 
  Activity,
  Send,
  Target,
  Zap
} from 'lucide-react';

export function TwitchBot() {
  const [isConnected, setIsConnected] = useState(false);
  const [isViewbotActive, setIsViewbotActive] = useState(false);
  const [isChatbotActive, setIsChatbotActive] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [viewerCount, setViewerCount] = useState(147);
  const [targetViewers, setTargetViewers] = useState(500);
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isViewbotActive && viewerCount < targetViewers) {
      interval = setInterval(() => {
        setViewerCount(prev => {
          const increment = Math.floor(Math.random() * 5) + 1;
          return Math.min(prev + increment, targetViewers);
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isViewbotActive, viewerCount, targetViewers]);

  const handleConnect = () => {
    if (!channelName.trim()) return;
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsViewbotActive(false);
    setIsChatbotActive(false);
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatMessage('');
  };

  const viewbotProgress = (viewerCount / targetViewers) * 100;

  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            AngelFerne Twitch Bot
          </h1>
          <p className="text-muted-foreground text-lg">Накрутка зрителей и управление чатом</p>
        </div>

        {/* Connection */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Подключение к Twitch
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Имя канала</Label>
                <Input
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="example_streamer"
                  disabled={isConnected}
                  className="bg-input-background border"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Статус</Label>
                <div className="flex items-center gap-2">
                  <Badge variant={isConnected ? "default" : "secondary"}>
                    {isConnected ? 'Подключен' : 'Отключен'}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Действие</Label>
                {!isConnected ? (
                  <Button 
                    onClick={handleConnect}
                    disabled={!channelName.trim()}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Подключиться
                  </Button>
                ) : (
                  <Button 
                    onClick={handleDisconnect}
                    variant="destructive"
                    className="w-full"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Отключиться
                  </Button>
                )}
              </div>
            </div>

            {isConnected && (
              <Alert className="bg-green-500/10 border-green-500/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  Успешно подключен к каналу <strong>{channelName}</strong>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Main Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Viewbot */}
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Накрутка зрителей
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Текущие зрители</Label>
                  <div className="text-2xl font-bold text-primary flex items-center gap-2">
                    {viewerCount.toLocaleString()}
                    {isViewbotActive && <Activity className="w-5 h-5 animate-pulse" />}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Цель</Label>
                  <Input
                    type="number"
                    value={targetViewers}
                    onChange={(e) => setTargetViewers(parseInt(e.target.value) || 0)}
                    min="1"
                    max="10000"
                    className="bg-input-background border"
                    disabled={!isConnected}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Прогресс</span>
                  <span>{Math.round(viewbotProgress)}%</span>
                </div>
                <Progress value={viewbotProgress} className="h-2" />
              </div>

              <div className="flex gap-3">
                {!isViewbotActive ? (
                  <Button 
                    onClick={() => setIsViewbotActive(true)}
                    disabled={!isConnected}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Запустить
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setIsViewbotActive(false)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Остановить
                  </Button>
                )}
              </div>

              {isViewbotActive && (
                <Alert className="bg-green-500/10 border-green-500/20">
                  <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                  <AlertDescription className="text-green-300">
                    Viewbot активен • +{Math.floor(Math.random() * 5) + 1} зрителей каждые 2 сек
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Chatbot */}
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Управление чатом
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Сообщение</Label>
                <Textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Введите сообщение для отправки в чат..."
                  className="bg-input-background border resize-none"
                  rows={3}
                  disabled={!isConnected}
                />
              </div>
              
              <Button 
                onClick={sendMessage}
                disabled={!isConnected || !chatMessage.trim()}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4 mr-2" />
                Отправить
              </Button>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={isChatbotActive}
                    onCheckedChange={setIsChatbotActive}
                    disabled={!isConnected}
                  />
                  <Label>Автоотправка</Label>
                </div>
                {isChatbotActive && (
                  <Badge className="bg-green-600">Активно</Badge>
                )}
              </div>

              {isChatbotActive && (
                <Alert className="bg-blue-500/10 border-blue-500/20">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-blue-300">
                    Автоотправка активна • Интервал: 60 секунд
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle>Статистика сессии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">+{viewerCount - 147}</div>
                <div className="text-sm text-muted-foreground">Добавлено зрителей</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">12</div>
                <div className="text-sm text-muted-foreground">Отправлено сообщений</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">97%</div>
                <div className="text-sm text-muted-foreground">Успешность</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">24m</div>
                <div className="text-sm text-muted-foreground">Время работы</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}