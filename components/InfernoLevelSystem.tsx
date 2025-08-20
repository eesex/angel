import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { CheckCircle, Lock } from 'lucide-react';

interface LevelData {
  id: string;
  name: string;
  progress: number;
  isUnlocked: boolean;
}

export function InfernoLevelSystem() {
  const levels: LevelData[] = [
    { id: 'M-1', name: 'Inferno Gate', progress: 100, isUnlocked: true },
    { id: 'M-2', name: 'Flame Walker', progress: 100, isUnlocked: true },
    { id: 'M-3', name: 'Fire Master', progress: 67, isUnlocked: true },
    { id: 'M-4', name: 'Inferno Lord', progress: 0, isUnlocked: false },
  ];

  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-primary">🔥</span>
          Inferno Level System
        </CardTitle>
        <CardDescription>
          Прогрессируйте для разблокировки новых возможностей
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {levels.map((level) => (
          <div key={level.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  level.isUnlocked 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {level.id}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{level.name}</span>
                    {level.isUnlocked ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm">{level.progress}%</div>
            </div>
            <Progress value={level.progress} className="h-2" />
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="text-primary text-sm">
            <strong>Следующий уровень:</strong> Накрутите еще 5,000 зрителей для разблокировки Inferno Lord
          </div>
        </div>
      </CardContent>
    </Card>
  );
}