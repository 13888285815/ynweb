import { Link } from 'react-router-dom';
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
    title: '可视化建站',
    desc: '拖拽式操作，无需编码，快速搭建专业网站'
  },
  {
    icon: Smartphone,
    title: '多端适配',
    desc: '一次制作，自动适配PC、平板、手机、小程序'
  },
  {
    icon: ShoppingCart,
    title: '完整电商',
    desc: '商品管理、订单处理、支付集成一站式解决'
  },
  {
    icon: BarChart3,
    title: '数据分析',
    desc: '实时访客统计，精准把握运营数据'
  },
  {
    icon: Shield,
    title: '安全可靠',
    desc: '企业级安全防护，数据多重备份'
  },
  {
    icon: HeadphonesIcon,
    title: '7×24客服',
    desc: '专业客服团队，随时为您解答疑问'
  }
];

const products = [
  {
    icon: Layout,
    name: '意念建站',
    desc: '企业官网、个人网站快速搭建',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Smartphone,
    name: '意念小程序',
    desc: '微信、支付宝、百度多平台小程序',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: ShoppingCart,
    name: '意念商城',
    desc: '完整的电商解决方案',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Sparkles,
    name: '意念互动',
    desc: 'H5营销活动、投票抽奖',
    color: 'from-purple-500 to-pink-500'
  }
];

const stats = [
  { value: '300万+', label: '服务企业' },
  { value: '500万+', label: '网站/小程序' },
  { value: '99.9%', label: '系统可用性' },
  { value: '7×24', label: '客服支持' }
];

const HomePage: React.FC = () => {
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
              <span className="text-sm text-primary">新一代智能建站平台</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              让经营更
              <span className="text-gradient"> 简单</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              意念网是一站式营销平台，助力中小企业数字化经营升级
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-14">
                  免费注册
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                  了解产品
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              全场景产品矩阵
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              从建站到营销，从电商到客户管理，一站式满足您的所有需求
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.name} to={`/products/${product.name}`}>
                <Card className="group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <product.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">{product.desc}</p>
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
              为什么要选择意念网？
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              我们为您提供最完善的解决方案，让您的业务快速发展
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
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
            准备好让您的业务更上一层楼了吗？
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            立即注册，开启您的数字化经营之旅
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?mode=register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 h-14">
                立即免费注册
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                查看价格
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
