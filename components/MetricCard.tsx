import { Card, CardContent, CardDescription, CardHeader } from './ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, icon, className = '' }: MetricCardProps) {
  return (
    <Card className={`bg-card border hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardDescription className="font-medium">
          {title}
        </CardDescription>
        {icon && <div className="opacity-80">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}