import React from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface User {
  username: string;
  subscriptionExpiry: string;
  isAdmin: boolean;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (itemId: string) => void;
  user: User | null;
  onLogout: () => void;
}

export function Sidebar({ items = [], activeItem, onItemClick, user, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">AF</span>
          </div>
          <div>
            <h1 className="text-sidebar-foreground font-bold text-lg">AngelFerne</h1>
            <p className="text-primary text-sm">Control Panel</p>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-3 border">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-card-foreground font-medium">{user?.username}</span>
            {user?.isAdmin && <span className="text-yellow-400">👑</span>}
          </div>
          <div className="text-xs text-muted-foreground">
            {user?.isAdmin ? 'Администратор' : 'Пользователь'}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start text-left p-3 h-auto rounded-lg ${
                  isActive 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
                onClick={() => onItemClick(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Выйти
        </Button>
      </div>
    </div>
  );
}