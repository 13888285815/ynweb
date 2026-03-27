import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, 
  Layout, 
  Smartphone, 
  ShoppingCart, 
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  HeadphonesIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingAgent from '@/components/FloatingAgent';

const features = [
  {
    icon: Layout,
    key: 'siteBuilder'
  },
  {
    icon: Smartphone,
    key: 'adaptive'
  },
  {
    icon: ShoppingCart,
    key: 'ecommerce'
  },
  {
    icon: BarChart3,
    key: 'analytics'
  },
  {
    icon: Shield,
    key: 'security'
  },
  {
    icon: HeadphonesIcon,
    key: 'support'
  }
];

const products = [
  {
    icon: Layout,
    nameKey: 'site',
    descKey: 'siteDesc',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Smartphone,
    nameKey: 'miniapp',
    descKey: 'miniappDesc',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ShoppingCart,
    nameKey: 'mall',
    descKey: 'mallDesc',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Sparkles,
    nameKey: 'interactive',
    descKey: 'interactiveDesc',
    color: 'from-purple-500 to-pink-500'
  }
];

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">{t('home.hero.title')} {t('home.hero.title2')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('home.hero.title')}
              <span className="text-gradient"> {t('home.hero.title2')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-14">
                  {t('home.hero.freeRegister')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                  {t('home.hero.learnMore')}
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">300万+</div>
              <div className="text-muted-foreground">{t('home.stats.enterprises')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">500万+</div>
              <div className="text-muted-foreground">{t('home.stats.websites')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">99.9%</div>
              <div className="text-muted-foreground">{t('home.stats.uptime')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">7×24</div>
              <div className="text-muted-foreground">{t('home.stats.support')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t('products.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('products.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.nameKey} to={`/products/${product.nameKey}`}>
                <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <product.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t(`products.${product.nameKey}`)}</h3>
                    <p className="text-muted-foreground text-sm">{t(`products.${product.descKey}`)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.key} className="border-border/50">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{t(`features.${feature.key}`)}</h3>
                  <p className="text-muted-foreground">{t(`features.${feature.key}Desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/20 via-card to-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?mode=register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-14">
                {t('cta.registerNow')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                {t('cta.viewPricing')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating AI Agent */}
      <FloatingAgent />
    </div>
  );
};

export default HomePage;
