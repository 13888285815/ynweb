import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Eye,
  Package,
  Image,
  DollarSign,
  BarChart,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sales: number;
  category: string;
  status: 'on_sale' | 'off_shelf' | 'draft';
  createdAt: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'iPhone 15 Pro Max', image: '📱', price: 9999, originalPrice: 10999, stock: 50, sales: 128, category: '数码', status: 'on_sale', createdAt: '2026-03-15' },
  { id: '2', name: 'MacBook Pro 16寸', image: '💻', price: 19999, stock: 20, sales: 45, category: '数码', status: 'on_sale', createdAt: '2026-03-10' },
  { id: '3', name: 'AirPods Pro', image: '🎧', price: 1999, originalPrice: 2499, stock: 200, sales: 356, category: '数码', status: 'on_sale', createdAt: '2026-03-08' },
  { id: '4', name: 'iPad Pro 12.9', image: '📱', price: 7999, stock: 0, sales: 89, category: '数码', status: 'off_shelf', createdAt: '2026-03-05' },
  { id: '5', name: 'Apple Watch', image: '⌚', price: 3299, stock: 100, sales: 67, category: '数码', status: 'draft', createdAt: '2026-03-01' },
];

const categories = ['全部', '数码', '服装', '食品', '美妆', '家居'];

const ShopProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '数码'
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'on_sale':
        return <Badge className="bg-green-500">在售</Badge>;
      case 'off_shelf':
        return <Badge variant="secondary">已下架</Badge>;
      case 'draft':
        return <Badge variant="outline">草稿</Badge>;
    }
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.sales, 0);
  const lowStock = products.filter(p => p.stock < 10 && p.stock > 0).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">在售商品</p>
                <p className="text-2xl font-bold">{products.filter(p => p.status === 'on_sale').length}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总销量</p>
                <p className="text-2xl font-bold">{totalSales.toLocaleString()}</p>
              </div>
              <BarChart className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">销售额</p>
                <p className="text-2xl font-bold">¥{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">库存预警</p>
                <p className="text-2xl font-bold">{lowStock + outOfStock}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>商品管理</CardTitle>
            <Button className="bg-primary" onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              添加商品
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="搜索商品..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">商品</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>价格</TableHead>
                <TableHead>库存</TableHead>
                <TableHead>销量</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="w-20">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                      {product.image}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-semibold">¥{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ¥{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={product.stock === 0 ? 'text-destructive' : product.stock < 10 ? 'text-accent' : ''}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{product.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加商品</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>商品名称</Label>
              <Input 
                placeholder="输入商品名称"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>销售价格</Label>
                <Input 
                  type="number"
                  placeholder="0.00"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label>原价</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div className="grid gap-2">
                <Label>库存</Label>
                <Input 
                  type="number"
                  placeholder="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>商品分类</Label>
                <Select value={newProduct.category} onValueChange={(v) => setNewProduct({...newProduct, category: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>商品单位</Label>
                <Select defaultValue="件">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="件">件</SelectItem>
                    <SelectItem value="个">个</SelectItem>
                    <SelectItem value="盒">盒</SelectItem>
                    <SelectItem value="箱">箱</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>商品图片</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Image className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">点击或拖拽上传图片</p>
                <p className="text-xs text-muted-foreground">支持 JPG、PNG 格式，建议尺寸 800x800</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>商品描述</Label>
              <textarea 
                className="min-h-[100px] p-2 rounded-md border border-input bg-background"
                placeholder="输入商品描述..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>取消</Button>
            <Button className="bg-primary" onClick={() => setShowAddDialog(false)}>
              <Check className="w-4 h-4 mr-2" />
              保存商品
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopProductsPage;
