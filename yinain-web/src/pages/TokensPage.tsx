import { useState } from 'react';
import { 
  Zap, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calculator
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const usageData = [
  { date: '03-21', tokens: 1200 },
  { date: '03-22', tokens: 1800 },
  { date: '03-23', tokens: 1400 },
  { date: '03-24', tokens: 2100 },
  { date: '03-25', tokens: 1900 },
  { date: '03-26', tokens: 2800 },
  { date: '03-27', tokens: 2200 },
];

const usageByFeature = [
  { name: '智能写作', tokens: 4500, color: '#6366f1' },
  { name: '内容生成', tokens: 3200, color: '#8b5cf6' },
  { name: '数据分析', tokens: 2800, color: '#ec4899' },
  { name: '图片生成', tokens: 1500, color: '#10b981' },
];

const usageHistory = [
  { id: 1, feature: '智能写作', tokens: -500, description: '生成产品描述', date: '2026-03-27 14:30' },
  { id: 2, feature: '内容生成', tokens: -300, description: 'SEO文章生成', date: '2026-03-27 13:15' },
  { id: 3, feature: '充值', tokens: 5000, description: 'Tokens充值', date: '2026-03-27 10:00' },
  { id: 4, feature: '数据分析', tokens: -800, description: '销售数据分析', date: '2026-03-26 16:45' },
  { id: 5, feature: '智能写作', tokens: -400, description: '邮件营销文案', date: '2026-03-26 11:20' },
  { id: 6, feature: '图片生成', tokens: -1000, description: '产品图片生成', date: '2026-03-25 15:30' },
  { id: 7, feature: '内容生成', tokens: -600, description: '社交媒体帖子', date: '2026-03-25 09:00' },
];

const rechargePackages = [
  { tokens: 1000, price: 10, popular: false },
  { tokens: 5000, price: 45, popular: true },
  { tokens: 10000, price: 80, popular: false },
  { tokens: 50000, price: 350, popular: false },
  { tokens: 100000, price: 600, popular: false },
];

const TokensPage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Tokens</h1>
          <p className="text-muted-foreground">管理您的 AI 积分余额和消耗</p>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-gradient-to-br from-primary/20 to-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">当前余额</p>
                <p className="text-4xl font-bold mt-1">10,000</p>
                <p className="text-sm text-muted-foreground mt-1">Tokens</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-7 h-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">本月消耗</p>
                <p className="text-4xl font-bold mt-1 text-destructive">13,500</p>
                <p className="text-sm text-muted-foreground mt-1">Tokens</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                <ArrowDownRight className="w-7 h-7 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">本月充值</p>
                <p className="text-4xl font-bold mt-1 text-secondary">15,000</p>
                <p className="text-sm text-muted-foreground mt-1">Tokens</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                <ArrowUpRight className="w-7 h-7 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">使用统计</TabsTrigger>
          <TabsTrigger value="recharge">充值套餐</TabsTrigger>
          <TabsTrigger value="history">消耗明细</TabsTrigger>
        </TabsList>

        {/* Usage Tab */}
        <TabsContent value="usage">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Usage Trend */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>使用趋势</CardTitle>
                <CardDescription>近7天 Tokens 消耗统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageData}>
                      <defs>
                        <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="date" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #334155',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number) => [`${value} Tokens`, '消耗']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="tokens" 
                        stroke="#ef4444" 
                        fillOpacity={1} 
                        fill="url(#colorTokens)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Usage by Feature */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>功能使用分布</CardTitle>
                <CardDescription>各功能消耗占比</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageByFeature} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis type="number" stroke="#94a3b8" />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #334155',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number) => [`${value} Tokens`, '消耗']}
                      />
                      <Bar dataKey="tokens" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  {usageByFeature.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recharge Tab */}
        <TabsContent value="recharge">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>充值套餐</CardTitle>
              <CardDescription>选择适合您的充值套餐</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {rechargePackages.map((pkg) => (
                  <div
                    key={pkg.tokens}
                    onClick={() => setSelectedPackage(pkg.tokens)}
                    className={`
                      relative p-6 rounded-xl border-2 cursor-pointer transition-all
                      ${selectedPackage === pkg.tokens 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'}
                      ${pkg.popular ? 'ring-2 ring-secondary ring-offset-2 ring-offset-background' : ''}
                    `}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
                        最受欢迎
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-3xl font-bold">{pkg.tokens.toLocaleString()}</p>
                      <p className="text-muted-foreground">Tokens</p>
                      <p className="text-2xl font-bold mt-4 text-primary">
                        ¥{pkg.price}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(pkg.price / pkg.tokens * 1000)}/千Tokens
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculator */}
              <Card className="mt-6 bg-muted/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Calculator className="w-5 h-5 text-primary" />
                    <span className="font-medium">自定义充值</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="range"
                        min="100"
                        max="100000"
                        step="100"
                        className="w-full"
                        defaultValue="2000"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>100</span>
                        <span>100,000 Tokens</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">2,000</p>
                      <p className="text-sm text-muted-foreground">Tokens</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">¥20</p>
                      <p className="text-sm text-muted-foreground">预估价格</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment */}
              <div className="mt-6">
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!selectedPackage}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  立即充值 {selectedPackage?.toLocaleString()} Tokens
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  支付安全由支付宝/微信支付保障
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>消耗明细</CardTitle>
              <CardDescription>最近30天的 Tokens 使用记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {usageHistory.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center
                        ${item.tokens > 0 ? 'bg-secondary/10' : 'bg-destructive/10'}
                      `}>
                        {item.tokens > 0 ? (
                          <ArrowUpRight className="w-5 h-5 text-secondary" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.feature}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${item.tokens > 0 ? 'text-secondary' : 'text-destructive'}`}>
                        {item.tokens > 0 ? '+' : ''}{item.tokens.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokensPage;
