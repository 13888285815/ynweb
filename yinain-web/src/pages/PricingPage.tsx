import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PlanFeature {
  name: string;
  included: boolean | string;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: '免费版',
    description: '个人首选，轻松入门',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: '建站模板', included: '3套' },
      { name: '网站空间', included: '100MB' },
      { name: '绑定域名', included: false },
      { name: '小程序制作', included: false },
      { name: '电商功能', included: false },
      { name: 'AI Tokens', included: '100/月' },
      { name: '客户支持', included: '社区' },
    ]
  },
  {
    name: '基础版',
    description: '小企业必备',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      { name: '建站模板', included: '50套+' },
      { name: '网站空间', included: '1GB' },
      { name: '绑定域名', included: true },
      { name: '小程序制作', included: false },
      { name: '电商功能', included: false },
      { name: 'AI Tokens', included: '1000/月' },
      { name: '客户支持', included: '工单' },
    ]
  },
  {
    name: '专业版',
    description: '业务增长首选',
    monthlyPrice: 79,
    yearlyPrice: 790,
    popular: true,
    features: [
      { name: '建站模板', included: '200套+' },
      { name: '网站空间', included: '10GB' },
      { name: '绑定域名', included: true },
      { name: '小程序制作', included: true },
      { name: '电商功能', included: true },
      { name: 'AI Tokens', included: '10000/月' },
      { name: '客户支持', included: '在线客服' },
    ]
  },
  {
    name: '企业版',
    description: '定制化解决方案',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      { name: '建站模板', included: '全部' },
      { name: '网站空间', included: '无限' },
      { name: '绑定域名', included: true },
      { name: '小程序制作', included: true },
      { name: '电商功能', included: true },
      { name: 'AI Tokens', included: '无限' },
      { name: '客户支持', included: '专属客服' },
    ]
  }
];

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            透明定价
            <span className="text-gradient"> 灵活选择</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            根据您的业务需求选择最适合的套餐，年付享8折优惠
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <Tabs 
            value={billingCycle} 
            onValueChange={(v) => setBillingCycle(v as 'monthly' | 'yearly')}
            className="w-full max-w-xs"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">月付</TabsTrigger>
              <TabsTrigger value="yearly">
                年付
                <span className="ml-2 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  省20%
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            const isPopular = plan.popular;

            return (
              <Card 
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 ${
                  isPopular 
                    ? 'border-primary shadow-lg shadow-primary/20 scale-105' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    最受欢迎
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">¥{price}</span>
                    <span className="text-muted-foreground">/{billingCycle === 'monthly' ? '月' : '年'}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center gap-2">
                        {typeof feature.included === 'boolean' ? (
                          feature.included ? (
                            <Check className="w-4 h-4 text-secondary" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-muted-foreground/30" />
                          )
                        ) : (
                          <Check className="w-4 h-4 text-secondary" />
                        )}
                        <span className={typeof feature.included === 'boolean' && !feature.included ? 'text-muted-foreground' : ''}>
                          {feature.name}: {typeof feature.included === 'string' ? feature.included : (feature.included ? '有' : '无')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${isPopular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={isPopular ? 'default' : 'outline'}
                  >
                    {plan.monthlyPrice === 0 ? '免费开始' : '立即订阅'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">常见问题</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">可以随时取消订阅吗？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  是的，您可以随时取消订阅。取消后，您仍可使用服务至当前订阅期结束。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">支持哪些支付方式？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  我们支持微信支付、支付宝、银行卡等多种支付方式，企业用户还可申请对公转账。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">可以升级或降级套餐吗？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  可以的，您可以在账户设置中随时更改套餐。升级时按差价补齐，降级则在下个周期生效。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Tokens 如何使用？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI Tokens 可用于智能写作、内容生成、数据分析等AI功能。不同套餐赠送不同额度的Tokens。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
