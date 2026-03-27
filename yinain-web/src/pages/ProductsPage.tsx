import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2,
  Layout,
  Smartphone,
  ShoppingCart,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: 'jianzhan',
    icon: Layout,
    name: '意念建站',
    tagline: '可视化拖拽建站工具',
    description: '无需编码，通过拖拽即可创建专业网站。提供丰富的模板和组件库，满足企业官网、个人博客、落地页等各种场景需求。',
    color: 'from-blue-500 to-cyan-500',
    features: [
      '500+精美模板',
      '拖拽式可视化编辑器',
      'SEO优化工具',
      '响应式设计',
      '自定义域名',
      '会员系统'
    ]
  },
  {
    id: 'miniprogram',
    icon: Smartphone,
    name: '意念小程序',
    tagline: '多平台小程序制作',
    description: '一次制作，多端运行。支持微信、支付宝、百度、字节跳动等多平台小程序，助您快速占领移动端流量。',
    color: 'from-green-500 to-emerald-500',
    features: [
      '多平台支持',
      '丰富行业模板',
      '组件市场',
      '数据分析',
      '用户管理',
      '模板消息'
    ]
  },
  {
    id: 'shangcheng',
    icon: ShoppingCart,
    name: '意念商城',
    tagline: '完整的电商解决方案',
    description: '从商品管理到订单处理，从支付集成到物流跟踪，提供一站式电商服务，助您快速搭建在线商城。',
    color: 'from-orange-500 to-red-500',
    features: [
      '商品管理',
      '订单系统',
      '多种支付方式',
      '优惠券/满减',
      '拼团/秒杀',
      '会员积分'
    ]
  },
  {
    id: 'hudong',
    icon: Sparkles,
    name: '意念互动',
    tagline: 'H5营销活动工具',
    description: '创建吸睛的H5营销活动，提升品牌曝光和用户参与度。适用于投票、抽奖、游戏等多种场景。',
    color: 'from-purple-500 to-pink-500',
    features: [
      '活动模板',
      '数据收集',
      '分享传播',
      '抽奖系统',
      '投票功能',
      '实时统计'
    ]
  }
];

const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            全场景产品矩阵
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            从建站到营销，从电商到客户管理，一站式满足您的所有互联网营销需求
          </p>
        </div>

        {/* Products */}
        <div className="space-y-20">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${product.color} bg-opacity-10 mb-6`}>
                  <product.icon className="w-5 h-5" />
                  <span className="font-medium">{product.name}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {product.tagline}
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  {product.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <Link to="/auth?mode=register">
                    <Button className="bg-primary hover:bg-primary/90">
                      免费试用
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button variant="outline">
                      查看价格
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className={`
                  relative aspect-video rounded-2xl overflow-hidden 
                  bg-gradient-to-br ${product.color}
                `}>
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm p-8 flex flex-col items-center justify-center">
                    <product.icon className="w-24 h-24 text-white mb-6" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white mb-2">{product.name}</p>
                      <p className="text-white/70">{product.tagline}</p>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-lg" />
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-white/10 rounded-lg" />
                    <div className="absolute top-1/4 right-8 w-12 h-12 bg-white/10 rounded-full" />
                    <div className="absolute bottom-1/3 left-8 w-8 h-8 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">
            不确定哪个产品适合您？
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            我们的专业顾问团队可以为您提供免费的咨询和方案建议
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            联系顾问
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
