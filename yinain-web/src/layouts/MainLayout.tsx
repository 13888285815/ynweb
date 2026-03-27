import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  UserPlus,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setLanguage, supportedLanguages, getCurrentLanguage } from '@/i18n';

const products = [
  {
    icon: Layout,
    name: '意念建站',
    nameEn: 'Yinain Site',
    desc: '可视化拖拽建站工具',
    descEn: 'Visual drag-and-drop site builder',
    href: '/products/jianzhan'
  },
  {
    icon: Smartphone,
    name: '意念小程序',
    nameEn: 'Yinain Mini Program',
    desc: '多平台小程序制作',
    descEn: 'Multi-platform mini program maker',
    href: '/products/miniprogram'
  },
  {
    icon: ShoppingCart,
    name: '意念商城',
    nameEn: 'Yinain Mall',
    desc: '完整的电商解决方案',
    descEn: 'Complete e-commerce solution',
    href: '/products/shangcheng'
  },
  {
    icon: Sparkles,
    name: '意念互动',
    nameEn: 'Yinain Interactive',
    desc: 'H5营销活动工具',
    descEn: 'H5 marketing activity tools',
    href: '/products/hudong'
  },
  {
    icon: Users,
    name: '意念客户通',
    nameEn: 'Yinain CRM',
    desc: '客户管理与CRM',
    descEn: 'Customer management & CRM',
    href: '/products/crm'
  }
];

const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('zh');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // 初始化语言设置
  useEffect(() => {
    const initLang = async () => {
      const savedLang = localStorage.getItem('yinain-lang');
      if (savedLang) {
        await setLanguage(savedLang);
        setCurrentLang(savedLang);
        const langInfo = supportedLanguages.find(l => l.code === savedLang);
        if (langInfo) {
          setDir(langInfo.dir);
        }
      } else {
        // 尝试检测 IP 并设置语言
        try {
          const response = await fetch('https://ipapi.co/json/');
          if (response.ok) {
            const data = await response.json();
            const countryCode = data.country_code || 'CN';
            
            const countryLangMap: Record<string, string> = {
              'CN': 'zh', 'JP': 'ja', 'DE': 'de', 'SA': 'ar', 'AE': 'ar',
              'EG': 'ar', 'US': 'en', 'GB': 'en', 'AU': 'en', 'CA': 'en',
              'FR': 'en', 'ES': 'en', 'IT': 'en', 'KR': 'ko', 'TW': 'zh',
              'HK': 'zh', 'MO': 'zh',
            };
            
            const lang = countryLangMap[countryCode] || 'zh';
            await setLanguage(lang);
            setCurrentLang(lang);
            const langInfo = supportedLanguages.find(l => l.code === lang);
            if (langInfo) {
              setDir(langInfo.dir);
            }
          }
        } catch (e) {
          // 使用浏览器语言
          const browserLang = navigator.language.split('-')[0];
          if (supportedLanguages.some(l => l.code === browserLang)) {
            await setLanguage(browserLang);
            setCurrentLang(browserLang);
            const langInfo = supportedLanguages.find(l => l.code === browserLang);
            if (langInfo) {
              setDir(langInfo.dir);
            }
          }
        }
      }
    };
    
    initLang();
  }, []);

  const handleLanguageChange = async (langCode: string) => {
    await setLanguage(langCode);
    setCurrentLang(langCode);
    const langInfo = supportedLanguages.find(l => l.code === langCode);
    if (langInfo) {
      setDir(langInfo.dir);
    }
  };

  // 在控制台页面不使用主布局
  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/console')) {
    return <Outlet />;
  }

  const currentLangInfo = supportedLanguages.find(l => l.code === currentLang) || supportedLanguages[0];

  return (
    <div className="min-h-screen bg-background" dir={dir}>
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
                    {t('nav.products')} <ChevronDown className="w-4 h-4" />
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
                          <div className="font-medium">{currentLang === 'zh' ? product.name : product.nameEn}</div>
                          <div className="text-xs text-muted-foreground">{currentLang === 'zh' ? product.desc : product.descEn}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/pricing">
                <Button variant="ghost">{t('nav.pricing')}</Button>
              </Link>
              
              <Link to="/products">
                <Button variant="ghost">{currentLang === 'zh' ? '案例' : 'Cases'}</Button>
              </Link>
            </nav>

            {/* Auth Buttons & Language Switcher */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{currentLangInfo.flag}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border">
                  {supportedLanguages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`cursor-pointer ${currentLang === lang.code ? 'bg-primary/10' : ''}`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/auth?mode=login">
                <Button variant="ghost">{t('nav.login')}</Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button className="bg-primary hover:bg-primary/90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t('nav.register')}
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
              {/* Mobile Language Switcher */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-border">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      currentLang === lang.code 
                        ? 'bg-primary text-white' 
                        : 'bg-muted'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground px-2">{t('nav.products')}</div>
                {products.map((product) => (
                  <Link
                    key={product.name}
                    to={product.href}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <product.icon className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">{currentLang === 'zh' ? product.name : product.nameEn}</div>
                      <div className="text-xs text-muted-foreground">{currentLang === 'zh' ? product.desc : product.descEn}</div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">{t('nav.pricing')}</Button>
              </Link>
              
              <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('nav.login')}
                </Button>
              </Link>
              
              <Link to="/auth?mode=register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t('nav.register')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16" style={{ direction: dir }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20" dir="ltr">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{t('nav.products')}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/products/jianzhan" className="block hover:text-primary">{t('products.site')}</Link>
                <Link to="/products/miniprogram" className="block hover:text-primary">{t('products.miniapp')}</Link>
                <Link to="/products/shangcheng" className="block hover:text-primary">{t('products.mall')}</Link>
                <Link to="/products/hudong" className="block hover:text-primary">{t('products.interactive')}</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{currentLang === 'zh' ? '解决方案' : 'Solutions'}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/solutions/enterprise" className="block hover:text-primary">{currentLang === 'zh' ? '企业官网' : 'Business Website'}</Link>
                <Link to="/solutions/ecommerce" className="block hover:text-primary">{currentLang === 'zh' ? '电商网站' : 'E-commerce'}</Link>
                <Link to="/solutions/education" className="block hover:text-primary">{currentLang === 'zh' ? '在线教育' : 'Online Education'}</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{currentLang === 'zh' ? '资源' : 'Resources'}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/help" className="block hover:text-primary">{currentLang === 'zh' ? '帮助中心' : 'Help Center'}</Link>
                <Link to="/docs" className="block hover:text-primary">{currentLang === 'zh' ? '开发文档' : 'Docs'}</Link>
                <Link to="/blog" className="block hover:text-primary">Blog</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{currentLang === 'zh' ? '公司' : 'Company'}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/about" className="block hover:text-primary">{currentLang === 'zh' ? '关于我们' : 'About'}</Link>
                <Link to="/contact" className="block hover:text-primary">{currentLang === 'zh' ? '联系我们' : 'Contact'}</Link>
                <Link to="/terms" className="block hover:text-primary">{currentLang === 'zh' ? '服务条款' : 'Terms'}</Link>
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
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
