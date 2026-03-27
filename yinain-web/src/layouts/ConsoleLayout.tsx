import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  CreditCard, 
  Sparkles,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Zap,
  Users,
  Globe,
  Smartphone,
  Gamepad2,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConsoleLayoutProps {
  children?: React.ReactNode;
}

const navGroups = [
  {
    title: '产品中心',
    items: [
      { icon: Globe, label: '意念建站', href: '/dashboard/sites' },
      { icon: Smartphone, label: '小程序', href: '/dashboard/miniprogram' },
      { icon: ShoppingCart, label: '意念商城', href: '/dashboard/shop' },
      { icon: Gamepad2, label: '意念互动', href: '/dashboard/interactive' },
    ]
  },
  {
    title: '客户中心',
    items: [
      { icon: Users, label: '客户管理', href: '/dashboard/customers' },
    ]
  },
  {
    title: '财务中心',
    items: [
      { icon: CreditCard, label: 'AI Tokens', href: '/dashboard/tokens' },
      { icon: FileText, label: '订单管理', href: '/dashboard/shop/orders' },
    ]
  },
  {
    title: '账户',
    items: [
      { icon: Settings, label: '账户设置', href: '/dashboard/settings' },
    ]
  }
];

const ConsoleLayout: React.FC<ConsoleLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['产品中心', '客户中心', '财务中心', '账户']);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200
          md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">意念网</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="p-4 space-y-4">
            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mb-4 ${
                location.pathname === '/dashboard' 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>仪表盘</span>
            </Link>

            {/* Grouped Navigation */}
            {navGroups.map((group) => (
              <div key={group.title}>
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>{group.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedGroups.includes(group.title) ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedGroups.includes(group.title) && (
                  <div className="mt-1 space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                          ${isActive(item.href) 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
                        `}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                        {isActive(item.href) && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/20 text-primary">U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">用户</p>
              <p className="text-xs text-muted-foreground">专业版会员</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            退出登录
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 sticky top-0 bg-background z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 md:flex-none" />

          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Zap className="w-4 h-4 text-secondary" />
                <span>10000 Tokens</span>
              </div>
            </div>

            <Link to="/dashboard/tokens">
              <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                充值 Tokens
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default ConsoleLayout;
