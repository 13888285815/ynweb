import { useState } from 'react';
import { 
  Search,
  Plus,
  User,
  Phone,
  Mail,
  CreditCard,
  ShoppingBag,
  Star,
  Eye,
  Crown,
  Gift,
  Clock,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Customer {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  level: 'normal' | 'silver' | 'gold' | 'diamond';
  points: number;
  balance: number;
  totalSpent: number;
  orders: number;
  tags: string[];
  createdAt: string;
  lastVisit: string;
}

const mockCustomers: Customer[] = [
  { id: '1', name: '张三', avatar: '👨', phone: '138****8888', email: 'zhangsan@email.com', level: 'diamond', points: 50000, balance: 999, totalSpent: 59999, orders: 28, tags: ['VIP', '老客户'], createdAt: '2025-01-15', lastVisit: '2026-03-27' },
  { id: '2', name: '李四', avatar: '👩', phone: '139****9999', email: 'lisi@email.com', level: 'gold', points: 25000, balance: 500, totalSpent: 25999, orders: 15, tags: ['活跃'], createdAt: '2025-03-20', lastVisit: '2026-03-26' },
  { id: '3', name: '王五', avatar: '👨‍💼', phone: '136****6666', email: 'wangwu@email.com', level: 'silver', points: 8000, balance: 200, totalSpent: 8999, orders: 8, tags: [], createdAt: '2025-06-10', lastVisit: '2026-03-20' },
  { id: '4', name: '赵六', avatar: '👩‍💼', phone: '137****7777', email: 'zhaoliu@email.com', level: 'normal', points: 2000, balance: 50, totalSpent: 1999, orders: 3, tags: ['新客户'], createdAt: '2026-02-01', lastVisit: '2026-03-15' },
  { id: '5', name: '钱七', avatar: '🧑', phone: '135****5555', email: 'qianqi@email.com', level: 'gold', points: 30000, balance: 800, totalSpent: 35000, orders: 20, tags: ['VIP'], createdAt: '2024-11-05', lastVisit: '2026-03-25' },
];

const levelColors = {
  normal: 'bg-gray-500',
  silver: 'bg-gray-300 text-gray-900',
  gold: 'bg-yellow-500',
  diamond: 'bg-blue-500'
};

const levelNames = {
  normal: '普通会员',
  silver: '银卡会员',
  gold: '金卡会员',
  diamond: '钻石会员'
};

const CustomersPage: React.FC = () => {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || customer.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const stats = {
    total: customers.length,
    vip: customers.filter(c => c.level !== 'normal').length,
    totalSpent: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    newThisMonth: customers.filter(c => c.createdAt.startsWith('2026-03')).length
  };

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">客户总数</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <User className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">VIP客户</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.vip}</p>
              </div>
              <Crown className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">累计消费</p>
                <p className="text-2xl font-bold">¥{stats.totalSpent.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">本月新增</p>
                <p className="text-2xl font-bold text-green-500">{stats.newThisMonth}</p>
              </div>
              <Plus className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>客户管理</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="搜索客户..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部等级</SelectItem>
                  <SelectItem value="diamond">钻石会员</SelectItem>
                  <SelectItem value="gold">金卡会员</SelectItem>
                  <SelectItem value="silver">银卡会员</SelectItem>
                  <SelectItem value="normal">普通会员</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary">
                <Plus className="w-4 h-4 mr-2" />
                添加客户
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>客户</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>等级</TableHead>
                <TableHead>积分</TableHead>
                <TableHead>余额</TableHead>
                <TableHead>累计消费</TableHead>
                <TableHead>订单数</TableHead>
                <TableHead>标签</TableHead>
                <TableHead className="w-24">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">注册: {customer.createdAt}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{customer.phone}</p>
                      <p className="text-muted-foreground">{customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={levelColors[customer.level]}>
                      <Crown className="w-3 h-3 mr-1" />
                      {levelNames[customer.level]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {customer.points.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">¥{customer.balance}</TableCell>
                  <TableCell>¥{customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8"
                        onClick={() => handleViewDetail(customer)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>客户详情</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl">
                  {selectedCustomer.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                    <Badge className={levelColors[selectedCustomer.level]}>
                      {levelNames[selectedCustomer.level]}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">注册时间: {selectedCustomer.createdAt}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{selectedCustomer.points.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">积分</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">¥{selectedCustomer.balance}</p>
                  <p className="text-xs text-muted-foreground">余额</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">¥{selectedCustomer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">累计消费</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold">{selectedCustomer.orders}</p>
                  <p className="text-xs text-muted-foreground">订单数</p>
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">手机号</Label>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {selectedCustomer.phone}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">邮箱</Label>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {selectedCustomer.email}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">最后访问</Label>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {selectedCustomer.lastVisit}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">标签</Label>
                  <div className="flex gap-1">
                    {selectedCustomer.tags.length > 0 ? (
                      selectedCustomer.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">无</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  发送消息
                </Button>
                <Button variant="outline" className="flex-1">
                  <Gift className="w-4 h-4 mr-2" />
                  赠送积分
                </Button>
                <Button variant="outline" className="flex-1">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  查看订单
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;
