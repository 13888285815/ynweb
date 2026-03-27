import { useState } from 'react';
import { 
  Search,
  Smartphone,
  QrCode,
  Eye,
  Edit,
  Layout,
  Image,
  Grid,
  List,
  User,
  ShoppingCart,
  Check,
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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface Miniprogram {
  id: string;
  name: string;
  template: string;
  platforms: ('wechat' | 'alipay' | 'baidu' | 'bytedance')[];
  status: 'draft' | 'published';
  visits: number;
  createdAt: string;
}

const mockPrograms: Miniprogram[] = [
  { id: '1', name: '服装店小程序', template: '电商模板', platforms: ['wechat', 'alipay'], status: 'published', visits: 5678, createdAt: '2026-03-15' },
  { id: '2', name: '餐饮点餐小程序', template: '餐饮模板', platforms: ['wechat'], status: 'draft', visits: 0, createdAt: '2026-03-20' },
  { id: '3', name: '企业官网小程序', template: '企业模板', platforms: ['wechat', 'baidu'], status: 'published', visits: 2345, createdAt: '2026-03-10' },
];

const platformIcons = {
  wechat: '💚',
  alipay: '🔵',
  baidu: '🔴',
  bytedance: '💙'
};

const platformNames = {
  wechat: '微信',
  alipay: '支付宝',
  baidu: '百度',
  bytedance: '抖音'
};

const templates = [
  { id: 'ecommerce', name: '电商模板', icon: ShoppingCart, color: 'from-orange-500 to-red-500' },
  { id: 'restaurant', name: '餐饮模板', icon: Grid, color: 'from-yellow-500 to-orange-500' },
  { id: 'service', name: '服务预约', icon: List, color: 'from-blue-500 to-cyan-500' },
  { id: 'corporate', name: '企业官网', icon: Layout, color: 'from-purple-500 to-pink-500' },
  { id: 'booking', name: '预约排队', icon: List, color: 'from-green-500 to-emerald-500' },
  { id: 'member', name: '会员卡', icon: User, color: 'from-indigo-500 to-purple-500' },
];

const MiniprogramPage: React.FC = () => {
  const [programs] = useState<Miniprogram[]>(mockPrograms);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Miniprogram | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [createData, setCreateData] = useState({
    name: '',
    template: 'ecommerce',
    platforms: ['wechat']
  });

  const filteredPrograms = programs.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setShowCreateDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">小程序总数</p>
                <p className="text-2xl font-bold">{programs.length}</p>
              </div>
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">已发布</p>
                <p className="text-2xl font-bold text-green-500">
                  {programs.filter(p => p.status === 'published').length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总访问量</p>
                <p className="text-2xl font-bold">
                  {programs.reduce((sum, p) => sum + p.visits, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平台数量</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Grid className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>创建小程序</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setCreateData({...createData, template: template.id});
                  setShowCreateDialog(true);
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <template.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium">{template.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Programs List */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>小程序管理</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="搜索小程序..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>模板</TableHead>
                <TableHead>平台</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>访问量</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="w-32">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.template}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {program.platforms.map(p => (
                        <span key={p} title={platformNames[p]}>{platformIcons[p]}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={program.status === 'published' ? 'bg-green-500' : 'bg-gray-500'}>
                      {program.status === 'published' ? '已发布' : '草稿'}
                    </Badge>
                  </TableCell>
                  <TableCell>{program.visits.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{program.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-8 h-8"
                        onClick={() => {
                          setSelectedProgram(program);
                          setShowPreviewDialog(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <QrCode className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建小程序</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label>小程序名称</Label>
              <Input 
                placeholder="输入小程序名称"
                value={createData.name}
                onChange={(e) => setCreateData({...createData, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label>选择平台</Label>
              <div className="flex gap-4">
                {(['wechat', 'alipay', 'baidu', 'bytedance'] as const).map(p => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={createData.platforms.includes(p)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCreateData({...createData, platforms: [...createData.platforms, p]});
                        } else {
                          setCreateData({...createData, platforms: createData.platforms.filter(pl => pl !== p)});
                        }
                      }}
                    />
                    <span>{platformIcons[p]}</span>
                    <span>{platformNames[p]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>取消</Button>
            <Button className="bg-primary" onClick={handleCreate}>创建</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>小程序预览 - {selectedProgram?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex gap-8">
            {/* Phone Preview */}
            <div className="flex-1 flex justify-center">
              <div className="w-[375px] h-[667px] border-8 border-gray-800 rounded-[30px] overflow-hidden bg-white">
                <div className="h-12 bg-primary flex items-center justify-center text-white text-sm">
                  {selectedProgram?.name}
                </div>
                <div className="p-4 space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="aspect-square bg-muted rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 w-full h-16 bg-white border-t flex items-center justify-around">
                  <div className="flex flex-col items-center">
                    <Layout className="w-5 h-5 text-primary" />
                    <span className="text-xs">首页</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs">商城</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs">消息</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs">我的</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Info */}
            <div className="w-64 space-y-4">
              <div>
                <Label className="text-muted-foreground">小程序名称</Label>
                <p className="font-medium">{selectedProgram?.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">使用模板</Label>
                <p>{selectedProgram?.template}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">支持平台</Label>
                <div className="flex gap-1 mt-1">
                  {selectedProgram?.platforms.map(p => (
                    <span key={p}>{platformIcons[p]}</span>
                  ))}
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <Button className="w-full bg-primary">
                  <Edit className="w-4 h-4 mr-2" />
                  编辑小程序
                </Button>
                <Button variant="outline" className="w-full">
                  <QrCode className="w-4 h-4 mr-2" />
                  获取二维码
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MiniprogramPage;
