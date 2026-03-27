import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  CreditCard,
  ArrowRight,
  Package,
  Zap,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const visitData = [
  { name: '周一', visits: 1200 },
  { name: '周二', visits: 1800 },
  { name: '周三', visits: 1400 },
  { name: '周四', visits: 2100 },
  { name: '周五', visits: 1900 },
  { name: '周六', visits: 2800 },
  { name: '周日', visits: 3200 },
];

const orderData = [
  { name: '已支付', value: 75, color: '#10b981' },
  { name: '待支付', value: 15, color: '#f59e0b' },
  { name: '已取消', value: 10, color: '#ef4444' },
];

const stats = [
  {
    title: '总访问量',
    value: '12,847',
    change: '+12.5%',
    trend: 'up',
    icon: Eye
  },
  {
    title: '注册用户',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: Users
  },
  {
    title: '订单总数',
    value: '456',
    change: '+23.1%',
    trend: 'up',
    icon: Package
  },
  {
    title: '总收入',
    value: '¥28,590',
    change: '-2.4%',
    trend: 'down',
    icon: CreditCard
  }
];

const recentOrders = [
  { id: 'ORD-001', user: '张三', product: '意念商城-专业版', amount: '¥79', status: 'paid', date: '2026-03-27' },
  { id: 'ORD-002', user: '李四', product: 'AI Tokens 充值', amount: '¥50', status: 'pending', date: '2026-03-27' },
  { id: 'ORD-003', user: '王五', product: '意念小程序', amount: '¥79', status: 'paid', date: '2026-03-26' },
  { id: 'ORD-004', user: '赵六', product: '意念建站-基础版', amount: '¥29', status: 'cancelled', date: '2026-03-26' },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">欢迎回来！</h1>
          <p className="text-muted-foreground">这是您今天的数据概览</p>
        </div>
        <Link to="/dashboard/products">
          <Button>
            <Package className="w-4 h-4 mr-2" />
            管理产品
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.trend === 'up' ? 'bg-secondary/10' : 'bg-destructive/10'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.trend === 'up' ? 'text-secondary' : 'text-destructive'
                  }`} />
                </div>
              </div>
              <div className={`flex items-center gap-1 mt-2 text-sm ${
                stat.trend === 'up' ? 'text-secondary' : 'text-destructive'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
                <span className="text-muted-foreground">较上周</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Visit Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>访问趋势</CardTitle>
            <CardDescription>本周网站访问量统计</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitData}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="#6366f1" 
                    fillOpacity={1} 
                    fill="url(#colorVisits)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>订单状态分布</CardTitle>
            <CardDescription>各类订单占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {orderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {orderData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>最近订单</CardTitle>
            <CardDescription>最新的订单记录</CardDescription>
          </div>
          <Link to="/dashboard/orders">
            <Button variant="ghost" size="sm">
              查看全部
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">订单号</th>
                  <th className="text-left py-3 px-4 font-medium">用户</th>
                  <th className="text-left py-3 px-4 font-medium">产品</th>
                  <th className="text-left py-3 px-4 font-medium">金额</th>
                  <th className="text-left py-3 px-4 font-medium">状态</th>
                  <th className="text-left py-3 px-4 font-medium">日期</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">{order.id}</td>
                    <td className="py-3 px-4 text-sm">{order.user}</td>
                    <td className="py-3 px-4 text-sm">{order.product}</td>
                    <td className="py-3 px-4 text-sm font-medium">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        order.status === 'paid' 
                          ? 'bg-secondary/10 text-secondary' 
                          : order.status === 'pending'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {order.status === 'paid' ? '已支付' : order.status === 'pending' ? '待支付' : '已取消'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/dashboard/tokens">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">充值 Tokens</p>
                <p className="text-sm text-muted-foreground">当前余额: 10,000</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/products">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-medium">管理产品</p>
                <p className="text-sm text-muted-foreground">查看所有产品</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/settings">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-medium">续费套餐</p>
                <p className="text-sm text-muted-foreground">专业版 到期: 2026-04-27</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
