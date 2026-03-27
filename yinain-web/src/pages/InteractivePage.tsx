import { useState } from 'react';
import { 
  Search,
  Play,
  BarChart,
  Users,
  Eye,
  Share2,
  Gift,
  Vote,
  Gamepad2,
  MessageSquare,
  Copy,
  Edit,
  QrCode
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Activity {
  id: string;
  name: string;
  type: 'vote' | 'lottery' | 'redpacket' | 'quiz' | 'h5';
  status: 'draft' | 'running' | 'paused' | 'ended';
  participants: number;
  views: number;
  startDate: string;
  endDate: string;
}

const mockActivities: Activity[] = [
  { id: '1', name: '春季新品投票活动', type: 'vote', status: 'running', participants: 1234, views: 5678, startDate: '2026-03-20', endDate: '2026-04-20' },
  { id: '2', name: '会员日抽奖', type: 'lottery', status: 'running', participants: 5678, views: 12345, startDate: '2026-03-25', endDate: '2026-03-31' },
  { id: '3', name: '红包雨活动', type: 'redpacket', status: 'ended', participants: 9999, views: 25000, startDate: '2026-03-10', endDate: '2026-03-15' },
  { id: '4', name: '产品知识问答', type: 'quiz', status: 'draft', participants: 0, views: 0, startDate: '2026-04-01', endDate: '2026-04-07' },
  { id: '5', name: '品牌宣传H5', type: 'h5', status: 'paused', participants: 3456, views: 8900, startDate: '2026-03-01', endDate: '2026-03-31' },
];

const activityTypes = [
  { type: 'vote', name: '投票活动', icon: Vote, color: 'from-blue-500 to-cyan-500' },
  { type: 'lottery', name: '抽奖活动', icon: Gift, color: 'from-purple-500 to-pink-500' },
  { type: 'redpacket', name: '红包雨', icon: Gift, color: 'from-red-500 to-orange-500' },
  { type: 'quiz', name: '答题活动', icon: MessageSquare, color: 'from-green-500 to-emerald-500' },
  { type: 'h5', name: 'H5微页面', icon: Gamepad2, color: 'from-indigo-500 to-purple-500' },
];

const InteractivePage: React.FC = () => {
  const [activities] = useState<Activity[]>(mockActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [createType, setCreateType] = useState<string>('');

  const getStatusBadge = (status: Activity['status']) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">草稿</Badge>;
      case 'running':
        return <Badge className="bg-green-500">进行中</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-500">已暂停</Badge>;
      case 'ended':
        return <Badge className="bg-gray-500">已结束</Badge>;
    }
  };

  const getTypeInfo = (type: Activity['type']) => {
    return activityTypes.find(t => t.type === type) || activityTypes[0];
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: activities.length,
    running: activities.filter(a => a.status === 'running').length,
    totalParticipants: activities.reduce((sum, a) => sum + a.participants, 0),
    totalViews: activities.reduce((sum, a) => sum + a.views, 0)
  };

  const handleShare = (_activity: Activity) => {
    setShowShareDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">活动总数</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Play className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">进行中</p>
                <p className="text-2xl font-bold text-green-500">{stats.running}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">参与人数</p>
                <p className="text-2xl font-bold">{stats.totalParticipants.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总浏览量</p>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Share2 className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Types */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>创建活动</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {activityTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => {
                  setCreateType(type.type);
                  setShowCreateDialog(true);
                }}
                className={`flex flex-col items-center gap-2 p-6 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <type.icon className="w-7 h-7 text-white" />
                </div>
                <span className="font-medium">{type.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activities List */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>活动管理</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="搜索活动..." 
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
                <TableHead>活动名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>参与人数</TableHead>
                <TableHead>浏览量</TableHead>
                <TableHead>时间</TableHead>
                <TableHead className="w-32">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => {
                const typeInfo = getTypeInfo(activity.type);
                return (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${typeInfo.color} flex items-center justify-center`}>
                          <typeInfo.icon className="w-4 h-4 text-white" />
                        </div>
                        {typeInfo.name}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(activity.status)}</TableCell>
                    <TableCell>{activity.participants.toLocaleString()}</TableCell>
                    <TableCell>{activity.views.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {activity.startDate} ~ {activity.endDate}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <BarChart className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-8 h-8"
                          onClick={() => handleShare(activity)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建{activityTypes.find(t => t.type === createType)?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label>活动名称</Label>
              <Input placeholder="输入活动名称" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>开始时间</Label>
                <Input type="date" />
              </div>
              <div className="grid gap-2">
                <Label>结束时间</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>活动描述</Label>
              <textarea className="min-h-[80px] p-2 rounded-md border border-input bg-background" placeholder="描述活动内容..." />
            </div>
            <div className="flex items-center justify-between">
              <Label>立即发布</Label>
              <Switch />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>取消</Button>
            <Button className="bg-primary">创建</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>分享活动</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center p-8 bg-muted rounded-lg">
              <div className="text-center">
                <QrCode className="w-32 h-32 mx-auto mb-4" />
                <p className="text-muted-foreground">扫码预览</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>活动链接</Label>
              <div className="flex gap-2">
                <Input value="https://yinain.com/act/xxx" readOnly />
                <Button variant="outline">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="flex-1">💚 微信</Button>
              <Button variant="outline" className="flex-1">🔵 朋友圈</Button>
              <Button variant="outline" className="flex-1">📱 短信</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InteractivePage;
