import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Users, UserPlus, Key, Shield, Crown, CheckCircle } from 'lucide-react';

export function UserRegistration() {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  });
  
  const [generatedKey, setGeneratedKey] = useState('');

  const handleCreateUser = () => {
    if (!newUser.username || !newUser.email || !newUser.password) return;
    
    alert(`Пользователь ${newUser.username} создан успешно!`);
    setNewUser({ username: '', email: '', password: '', role: 'user' });
  };

  const generateKey = () => {
    const key = `AF-${Math.random().toString(36).substr(2, 16).toUpperCase()}`;
    setGeneratedKey(key);
  };

  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Управление пользователями
            <Crown className="w-8 h-8 text-yellow-400" />
          </h1>
          <p className="text-muted-foreground text-lg">Только для администраторов</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create User */}
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" />
                Создать пользователя
              </CardTitle>
              <CardDescription>
                Добавить нового пользователя в систему
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Имя пользователя</Label>
                <Input
                  value={newUser.username}
                  onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="example_user"
                  className="bg-input-background border"
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="user@example.com"
                  className="bg-input-background border"
                />
              </div>

              <div className="space-y-2">
                <Label>Пароль</Label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Введите пароль"
                  className="bg-input-background border"
                />
              </div>

              <div className="space-y-2">
                <Label>Роль</Label>
                <Select value={newUser.role} onValueChange={(value: 'admin' | 'user') => setNewUser(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger className="bg-input-background border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Пользователь
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        Администратор
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleCreateUser}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!newUser.username || !newUser.email || !newUser.password}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Создать пользователя
              </Button>
            </CardContent>
          </Card>

          {/* Generate Keys */}
          <Card className="bg-card border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Ключи доступа
              </CardTitle>
              <CardDescription>
                Генерация ключей для регистрации
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={generateKey}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Key className="w-4 h-4 mr-2" />
                Сгенерировать ключ
              </Button>

              {generatedKey && (
                <Alert className="bg-green-500/10 border-green-500/20">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-300">
                    <div className="space-y-2">
                      <div>Ключ успешно сгенерирован:</div>
                      <div className="font-mono text-sm bg-black/20 p-2 rounded">
                        {generatedKey}
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label>Активные ключи:</Label>
                <div className="space-y-2">
                  {['AF-K5J8N2M4X9R7', 'AF-P3W6Y8L1Q5T9'].map((key, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg border">
                      <div className="font-mono text-sm">{key}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Создан: {new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card className="bg-card border">
          <CardHeader>
            <CardTitle>Список пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { username: 'demo_user', role: 'Пользователь', status: 'Активен' },
                { username: 'test_admin', role: 'Администратор', status: 'Активен' },
                { username: 'expired_user', role: 'Пользователь', status: 'Истек' }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-sm text-muted-foreground">{user.role}</div>
                  </div>
                  <Badge variant={user.status === 'Активен' ? 'default' : 'destructive'}>
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}