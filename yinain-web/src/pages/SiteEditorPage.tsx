import { useState } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Monitor,
  Save,
  Undo,
  Redo,
  Eye,
  Layers,
  Image,
  Type,
  Square,
  FormInput,
  BarChart,
  MessageCircle,
  Navigation,
  ChevronLeft,
  Plus,
  Trash2,
  Copy,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Settings,
  X,
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DeviceType = 'desktop' | 'tablet' | 'mobile';
type ElementType = 'header' | 'hero' | 'text' | 'image' | 'button' | 'form' | 'table' | 'chart' | 'footer' | 'nav';

interface PageElement {
  id: string;
  type: ElementType;
  name: string;
  content?: string;
  styles: Record<string, string>;
  children?: PageElement[];
}

const componentCategories = [
  {
    name: '基础组件',
    components: [
      { type: 'text' as ElementType, name: '文本', icon: Type },
      { type: 'image' as ElementType, name: '图片', icon: Image },
      { type: 'button' as ElementType, name: '按钮', icon: Square },
      { type: 'divider' as ElementType, name: '分割线', icon: Square },
    ]
  },
  {
    name: '布局组件',
    components: [
      { type: 'header' as ElementType, name: '头部', icon: Navigation },
      { type: 'hero' as ElementType, name: '主视觉', icon: Square },
      { type: 'footer' as ElementType, name: '底部', icon: Square },
      { type: 'nav' as ElementType, name: '导航', icon: Navigation },
    ]
  },
  {
    name: '功能组件',
    components: [
      { type: 'form' as ElementType, name: '表单', icon: FormInput },
      { type: 'table' as ElementType, name: '表格', icon: Layout },
      { type: 'chart' as ElementType, name: '图表', icon: BarChart },
      { type: 'chat' as ElementType, name: '客服', icon: MessageCircle },
    ]
  }
];

const templates = [
  { id: 'corporate', name: '企业官网', thumbnail: '🏢' },
  { id: 'shop', name: '在线商城', thumbnail: '🛒' },
  { id: 'personal', name: '个人博客', thumbnail: '👤' },
  { id: 'landing', name: '营销落地页', thumbnail: '📱' },
  { id: 'restaurant', name: '餐饮美食', thumbnail: '🍜' },
  { id: 'hotel', name: '酒店民宿', thumbnail: '🏨' },
];

const SiteEditorPage: React.FC = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [elements, setElements] = useState<PageElement[]>([
    { id: '1', type: 'header', name: '头部导航', styles: { backgroundColor: '#1e293b', padding: '16px' } },
    { id: '2', type: 'hero', name: '主视觉区域', styles: { backgroundColor: '#6366f1', padding: '80px 40px', textAlign: 'center' } },
    { id: '3', type: 'text', name: '介绍文本', styles: { padding: '40px', textAlign: 'center' } },
  ]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  };

  const handleAddElement = (type: ElementType, name: string) => {
    const newElement: PageElement = {
      id: Date.now().toString(),
      type,
      name,
      styles: {
        padding: '20px',
        backgroundColor: '#1e293b',
        marginBottom: '10px'
      }
    };
    setElements([...elements, newElement]);
  };

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedElement === id) setSelectedElement(null);
  };

  const handleDuplicateElement = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newElement = { ...element, id: Date.now().toString() };
      const index = elements.findIndex(el => el.id === id);
      const newElements = [...elements];
      newElements.splice(index + 1, 0, newElement);
      setElements(newElements);
    }
  };

  const renderElement = (element: PageElement) => {
    switch (element.type) {
      case 'header':
        return (
          <div className="flex items-center justify-between" style={element.styles}>
            <div className="font-bold text-xl text-white">Logo</div>
            <div className="flex gap-4 text-sm text-gray-300">
              <span>首页</span>
              <span>产品</span>
              <span>关于</span>
              <span>联系</span>
            </div>
            <Button size="sm" className="bg-primary">联系我们</Button>
          </div>
        );
      case 'hero':
        return (
          <div style={element.styles}>
            <h1 className="text-4xl font-bold text-white mb-4">欢迎来到意念网</h1>
            <p className="text-xl text-gray-200 mb-8">一站式营销平台，助力企业数字化升级</p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-white text-primary">免费试用</Button>
              <Button variant="outline" className="text-white border-white">了解更多</Button>
            </div>
          </div>
        );
      case 'text':
        return (
          <div style={element.styles}>
            <h2 className="text-2xl font-bold mb-4">关于我们</h2>
            <p className="text-gray-400">这里是文本内容区域，您可以编辑任意文字...</p>
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center justify-center bg-muted" style={element.styles}>
            <div className="text-center text-muted-foreground">
              <Image className="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p>点击上传图片</p>
            </div>
          </div>
        );
      case 'button':
        return (
          <div className="flex justify-center" style={element.styles}>
            <Button className="bg-primary">点击按钮</Button>
          </div>
        );
      case 'form':
        return (
          <div style={element.styles} className="max-w-md mx-auto">
            <div className="space-y-4 bg-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <Input placeholder="您的姓名" />
              <Input placeholder="联系电话" />
              <Input placeholder="电子邮箱" />
              <Button className="w-full">提交</Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-muted rounded" style={element.styles}>
            <p className="text-muted-foreground">{element.name}</p>
          </div>
        );
    }
  };

  const selectedEl = elements.find(el => el.id === selectedElement);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="font-semibold">我的网站</span>
          <span className="text-muted-foreground text-sm ml-2">- 未保存</span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button 
            variant={deviceType === 'desktop' ? 'default' : 'ghost'} 
            size="icon"
            onClick={() => setDeviceType('desktop')}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button 
            variant={deviceType === 'tablet' ? 'default' : 'ghost'} 
            size="icon"
            onClick={() => setDeviceType('tablet')}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button 
            variant={deviceType === 'mobile' ? 'default' : 'ghost'} 
            size="icon"
            onClick={() => setDeviceType('mobile')}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" onClick={() => setShowTemplates(true)}>
            <Layers className="w-4 h-4 mr-2" />
            模板
          </Button>
          <Button variant="ghost" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-2" />
            预览
          </Button>
          <Button className="bg-primary">
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Components */}
        <div className="w-64 border-r border-border bg-card">
          <Tabs defaultValue="components">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="components">组件</TabsTrigger>
              <TabsTrigger value="layers">图层</TabsTrigger>
            </TabsList>
            
            <TabsContent value="components" className="m-0">
              <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="p-4 space-y-4">
                  {componentCategories.map((category) => (
                    <div key={category.name}>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">{category.name}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {category.components.map((comp) => (
                          <button
                            key={comp.type}
                            onClick={() => handleAddElement(comp.type, comp.name)}
                            className="flex flex-col items-center gap-1 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                          >
                            <comp.icon className="w-5 h-5" />
                            <span className="text-xs">{comp.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="layers" className="m-0">
              <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="p-4 space-y-1">
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      onClick={() => setSelectedElement(element.id)}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                        selectedElement === element.id ? 'bg-primary/20 border border-primary' : 'hover:bg-muted'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span className="flex-1 text-sm">{element.name}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-6 h-6"
                        onClick={(e) => { e.stopPropagation(); handleDuplicateElement(element.id); }}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-6 h-6"
                        onClick={(e) => { e.stopPropagation(); handleDeleteElement(element.id); }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 bg-muted/30 overflow-auto p-8">
          <div 
            className="mx-auto bg-background shadow-2xl transition-all duration-300"
            style={{ 
              width: deviceWidths[deviceType],
              minHeight: '800px',
              maxWidth: '100%'
            }}
          >
            {elements.map((element) => (
              <div
                key={element.id}
                onClick={() => setSelectedElement(element.id)}
                className={`relative group cursor-pointer ${
                  selectedElement === element.id ? 'ring-2 ring-primary' : ''
                } hover:ring-1 hover:ring-primary/50`}
              >
                {renderElement(element)}
              </div>
            ))}
            
            {/* Empty State */}
            {elements.length === 0 && (
              <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
                <Plus className="w-12 h-12 mb-4 opacity-50" />
                <p>从左侧拖拽组件开始建站</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-72 border-l border-border bg-card">
          <Tabs defaultValue="style">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="style">样式</TabsTrigger>
              <TabsTrigger value="settings">设置</TabsTrigger>
            </TabsList>
            
            <TabsContent value="style" className="m-0">
              <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="p-4 space-y-4">
                  {selectedEl ? (
                    <>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">内边距</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="上" defaultValue="20" />
                          <Input placeholder="右" defaultValue="20" />
                          <Input placeholder="下" defaultValue="20" />
                          <Input placeholder="左" defaultValue="20" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">外边距</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input placeholder="上" defaultValue="0" />
                          <Input placeholder="右" defaultValue="0" />
                          <Input placeholder="下" defaultValue="10" />
                          <Input placeholder="左" defaultValue="0" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">背景颜色</Label>
                        <div className="flex gap-2">
                          <Input type="color" className="w-12 h-10" defaultValue="#1e293b" />
                          <Input defaultValue="#1e293b" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">文字颜色</Label>
                        <div className="flex gap-2">
                          <Input type="color" className="w-12 h-10" defaultValue="#ffffff" />
                          <Input defaultValue="#ffffff" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">对齐方式</Label>
                        <div className="flex gap-1">
                          <Button variant="outline" size="icon" className="flex-1">
                            <AlignLeft className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="flex-1">
                            <AlignCenter className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="flex-1">
                            <AlignRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">边框</Label>
                        <div className="flex gap-2">
                          <Input type="color" className="w-12 h-10" defaultValue="#334155" />
                          <Input placeholder="宽度" defaultValue="1" />
                          <Select defaultValue="solid">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="solid">实线</SelectItem>
                              <SelectItem value="dashed">虚线</SelectItem>
                              <SelectItem value="dotted">点线</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">选择元素编辑样式</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="settings" className="m-0">
              <ScrollArea className="h-[calc(100vh-140px)]">
                <div className="p-4 space-y-4">
                  {selectedEl ? (
                    <>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">元素名称</Label>
                        <Input defaultValue={selectedEl.name} />
                      </div>
                      
                      {selectedEl.type === 'text' && (
                        <>
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">文本内容</Label>
                            <textarea 
                              className="w-full min-h-[100px] p-2 rounded-md border border-input bg-background"
                              defaultValue="这里是文本内容..."
                            />
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="icon"><Bold className="w-4 h-4" /></Button>
                            <Button variant="outline" size="icon"><Italic className="w-4 h-4" /></Button>
                            <Button variant="outline" size="icon"><Underline className="w-4 h-4" /></Button>
                          </div>
                        </>
                      )}
                      
                      {selectedEl.type === 'button' && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">按钮文本</Label>
                          <Input defaultValue="点击按钮" />
                          <Label className="text-xs text-muted-foreground">链接地址</Label>
                          <Input placeholder="https://" />
                        </div>
                      )}
                      
                      {selectedEl.type === 'image' && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">图片地址</Label>
                          <Input placeholder="https://" />
                          <Button variant="outline" className="w-full">
                            <Image className="w-4 h-4 mr-2" />
                            选择图片
                          </Button>
                          <Label className="text-xs text-muted-foreground">链接地址</Label>
                          <Input placeholder="https://" />
                          <Label className="text-xs text-muted-foreground">替代文本</Label>
                          <Input placeholder="图片描述" />
                        </div>
                      )}
                      
                      {selectedEl.type === 'form' && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">表单标题</Label>
                          <Input defaultValue="联系我们" />
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">显示姓名</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">显示电话</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">显示邮箱</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">显示留言</Label>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">选择元素编辑设置</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl w-[800px] max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">选择模板</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowTemplates(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <ScrollArea className="p-4">
              <div className="grid grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    className="border border-border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                  >
                    <div className="text-4xl mb-2">{template.thumbnail}</div>
                    <p className="font-medium text-center">{template.name}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl w-[900px] max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">预览</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-8 bg-muted/30">
              <div className="bg-background rounded-lg shadow-2xl overflow-hidden" style={{ width: '375px', margin: '0 auto' }}>
                {elements.map((element) => (
                  <div key={element.id}>
                    {renderElement(element)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteEditorPage;
