import { useState } from 'react';
import { 
  Search, 
  Download,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  RefreshCw
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface Order {
  id: string;
  orderNo: string;
  customer: string;
  phone: string;
  product: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  paymentMethod: 'wechat' | 'alipay' | 'bank';
  createdAt: string;
}

const mockOrders: Order[] = [
  { id: '1', orderNo: 'ORD20260327001', customer: '张三', phone: '138****8888', product: 'iPhone 15 Pro Max', quantity: 1, amount: 9999, status: 'pending', paymentMethod: 'wechat', createdAt: '2026-03-27 14:30' },
  { id: '2', orderNo: 'ORD20260327002', customer: '李四', phone: '139****9999', product: 'MacBook Pro 16寸', quantity: 1, amount: 19999, status: 'paid', paymentMethod: 'alipay', createdAt: '2026-03-27 13:15' },
  { id: '3', orderNo: 'ORD20260326003', customer: '王五', phone: '136****6666', product: 'AirPods Pro × 2', quantity: 2, amount: 3998, status: 'shipped', paymentMethod: 'wechat', createdAt: '2026-03-26 16:45' },
  { id: '4', orderNo: 'ORD20260326004', customer: '赵六', phone: '137****7777', product: 'iPad Pro 12.9', quantity: 1, amount: 7999, status: 'completed', paymentMethod: 'bank', createdAt: '2026-03-26 11:20' },
  { id: '5', orderNo: 'ORD20260325005', customer: '钱七', phone: '135****5555', product: 'Apple Watch', quantity: 1, amount: 3299, status: 'cancelled', paymentMethod: 'wechat', createdAt: '2026-03-25 09:30' },
  { id: '6', orderNo: 'ORD20260325006', customer: '孙八', phone: '134****4444', product: 'iPhone 15 Pro Max', quantity: 1, amount: 9999, status: 'completed', paymentMethod: 'alipay', createdAt: '2026-03-25 10:15' },
];

const ShopOrdersPage: React.FC = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return { label: '待支付', color: 'bg-yellow-500', icon: Clock };
      case 'paid':
        return { label: '已支付', color: 'bg-blue-500', icon: CheckCircle };
      case 'shipped':
        return { label: '已发货', color: 'bg-purple-500', icon: Truck };
      case 'completed':
        return { label: '已完成', color: 'bg-green-500', icon: CheckCircle };
      case 'cancelled':
        return { label: '已取消', color: 'bg-gray-500', icon: XCircle };
    }
  };

  const getPaymentIcon = (method: Order['paymentMethod']) => {
    switch (method) {
      case 'wechat':
        return '💚';
      case 'alipay':
        return '🔵';
      case 'bank':
        return '💳';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.includes(searchTerm) ||
      order.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    today: orders.filter(o => o.createdAt.startsWith('2026-03-27')).length,
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.amount, 0)
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
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
                <p className="text-sm text-muted-foreground">今日订单</p>
                <p className="text-2xl font-bold">{stats.today}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">待支付</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">待发货</p>
                <p className="text-2xl font-bold text-purple-500">{stats.shipped}</p>
              </div>
              <Truck className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">销售收入</p>
                <p className="text-2xl font-bold">¥{stats.revenue.toLocaleString()}</p>
              </div>
              <RefreshCw className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>订单管理</CardTitle>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="搜索订单号/客户/手机..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">待支付</SelectItem>
                <SelectItem value="paid">已支付</SelectItem>
                <SelectItem value="shipped">已发货</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="cancelled">已取消</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>订单号</TableHead>
                <TableHead>客户</TableHead>
                <TableHead>商品</TableHead>
                <TableHead>数量</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>支付方式</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>下单时间</TableHead>
                <TableHead className="w-20">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">{order.orderNo}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell className="font-semibold">¥{order.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className="text-lg">{getPaymentIcon(order.paymentMethod)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusInfo.color}>
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{order.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-8 h-8"
                          onClick={() => handleViewDetail(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {order.status === 'paid' && (
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Truck className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">订单号</p>
                  <p className="font-mono">{selectedOrder.orderNo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">状态</p>
                  <Badge className={getStatusInfo(selectedOrder.status).color}>
                    {getStatusInfo(selectedOrder.status).label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">客户姓名</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">联系电话</p>
                  <p>{selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">商品名称</p>
                  <p>{selectedOrder.product}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">购买数量</p>
                  <p>{selectedOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">订单金额</p>
                  <p className="font-bold text-lg">¥{selectedOrder.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">支付方式</p>
                  <p>{getPaymentIcon(selectedOrder.paymentMethod)} {selectedOrder.paymentMethod === 'wechat' ? '微信支付' : selectedOrder.paymentMethod === 'alipay' ? '支付宝' : '银行卡'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">下单时间</p>
                  <p>{selectedOrder.createdAt}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>关闭</Button>
            {selectedOrder?.status === 'paid' && (
              <Button className="bg-primary">
                <Truck className="w-4 h-4 mr-2" />
                发货
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopOrdersPage;
