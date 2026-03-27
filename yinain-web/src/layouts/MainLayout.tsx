import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Layout, 
  Smartphone, 
  ShoppingCart, 
  Users,
  Sparkles,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const products = [
  {
    icon: Layout,
    name: '意念建站',
    desc: '可视化拖拽建站工具',
    href: '/products/jianzhan'
  },
  {
    icon: Smartphone,
    name: '意念小程序',
    desc: '多平台小程序制作',
    href: '/products/miniprogram'
  },
  {
    icon: ShoppingCart,
    name: '意念商城',
    desc: '完整的电商解决方案',
    href: '/products/shangcheng'
  },
  {
    icon: Sparkles,
    name: '意念互动',
    desc: 'H5营销活动工具',
    href: '/products/hudong'
  },
  {
    icon: Users,
    name: '意念客户通',
    desc: '客户管理与CRM',
    href: '/products/crm'
  }
];

const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // 在控制台页面不使用主布局
  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/console')) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">意念网</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    产品 <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-card border-border">
                  {products.map((product) => (
                    <DropdownMenuItem key={product.name} asChild>
                      <Link 
                        to={product.href} 
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <product.icon className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.desc}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/pricing">
                <Button variant="ghost">价格</Button>
              </Link>
              
              <Link to="/products">
                <Button variant="ghost">案例</Button>
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/auth?mode=login">
                <Button variant="ghost">登录</Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button className="bg-primary hover:bg-primary/90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  免费注册
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-4 py-4 space-y-3">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground px-2">产品</div>
                {products.map((product) => (
                  <Link
                    key={product.name}
                    to={product.href}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <product.icon className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">价格</Button>
              </Link>
              
              <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <LogIn className="w-4 h-4 mr-2" />
                  登录
                </Button>
              </Link>
              
              <Link to="/auth?mode=register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  免费注册
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">产品</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/products/jianzhan" className="block hover:text-primary">意念建站</Link>
                <Link to="/products/miniprogram" className="block hover:text-primary">意念小程序</Link>
                <Link to="/products/shangcheng" className="block hover:text-primary">意念商城</Link>
                <Link to="/products/hudong" className="block hover:text-primary">意念互动</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">解决方案</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/solutions/enterprise" className="block hover:text-primary">企业官网</Link>
                <Link to="/solutions/ecommerce" className="block hover:text-primary">电商网站</Link>
                <Link to="/solutions/education" className="block hover:text-primary">在线教育</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">资源</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/help" className="block hover:text-primary">帮助中心</Link>
                <Link to="/docs" className="block hover:text-primary">开发文档</Link>
                <Link to="/blog" className="block hover:text-primary">博客</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">公司</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/about" className="block hover:text-primary">关于我们</Link>
                <Link to="/contact" className="block hover:text-primary">联系我们</Link>
                <Link to="/terms" className="block hover:text-primary">服务条款</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">意念网</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 意念网 YINIAN. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
