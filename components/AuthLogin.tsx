import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, User, Lock, AlertCircle, Shield } from 'lucide-react';

interface AuthLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  error: string;
}

export function AuthLogin({ onLogin, error }: AuthLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  const demoAccounts = [
    { username: 'admin', password: 'admin', role: 'Администратор' },
    { username: 'demo', password: 'demo', role: 'Демо' },
    { username: 'user', password: 'user', role: 'Пользователь' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="font-bold text-primary-foreground text-2xl">AF</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">AngelFerne</h1>
          <p className="text-primary text-lg">Twitch Bot System</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Secure Access</span>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-card border">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Вход в систему</CardTitle>
            <CardDescription>
              Введите учетные данные для доступа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Логин</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-input-background border"
                    placeholder="Введите логин"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-input-background border"
                    placeholder="Введите пароль"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="bg-destructive/10 border-destructive/20">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Войти в AngelFerne
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle className="text-lg">Тестовые аккаунты</CardTitle>
            <CardDescription>
              Нажмите для быстрого входа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {demoAccounts.map((account, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted border cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => {
                    setUsername(account.username);
                    setPassword(account.password);
                  }}
                >
                  <div>
                    <div className="font-medium">{account.username}</div>
                    <div className="text-sm text-muted-foreground">{account.role}</div>
                  </div>
                  <div className="text-xs text-primary">
                    {account.password}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}