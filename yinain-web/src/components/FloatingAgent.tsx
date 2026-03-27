import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Maximize2, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FloatingAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '您好！我是意念网智能客服小意，有什么可以帮您的吗？',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 拖拽处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMinimized) return;
    setIsDragging(true);
    const rect = (e.target as HTMLElement).closest('.floating-agent')?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // 边界限制
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 600;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 模拟 AI 回复
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('价格') || lowerQuery.includes('收费') || lowerQuery.includes('费用')) {
      return '关于价格问题，您可以访问我们的价格页面查看详细方案：https://yinain.com/pricing 我们提供免费版、专业版和企业版，满足不同规模企业的需求。';
    }
    if (lowerQuery.includes('建站') || lowerQuery.includes('网站')) {
      return '意念建站是我们的核心产品，支持拖拽式可视化建站，无需编码即可快速搭建专业网站。您可以先免费注册体验一下！';
    }
    if (lowerQuery.includes('小程序')) {
      return '意念小程序支持微信、支付宝、百度等多个平台，一次制作多端发布，非常适合中小企业进行数字化营销。';
    }
    if (lowerQuery.includes('商城') || lowerQuery.includes('电商') || lowerQuery.includes('购物')) {
      return '意念商城提供完整的电商解决方案，包括商品管理、订单处理、支付集成、会员系统等功能，让您轻松开展线上业务。';
    }
    if (lowerQuery.includes('客服') || lowerQuery.includes('联系')) {
      return '您可以通过以下方式联系我们：\n📧 邮箱：support@yinain.com\n📞 电话：400-888-8888\n💬 在线客服（当前）\n我们7×24小时为您服务！';
    }
    
    return '感谢您的咨询！关于您的问题，我建议您：\n1. 访问产品页面了解更多详情\n2. 免费注册体验我们的产品\n3. 如需人工服务，请留下您的联系方式';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // 最小化时显示的按钮
  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-4 right-4 z-50"
        style={{ right: position.x }}
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">智能客服</span>
        </button>
      </div>
    );
  }

  // 收起状态（仅显示图标按钮）
  if (!isOpen) {
    return (
      <div 
        className="fixed bottom-4 right-4 z-50"
        style={{ right: position.x }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div 
      className="floating-agent fixed z-50"
      style={{ 
        left: position.x, 
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <Card className="w-[380px] shadow-2xl border-border/50 overflow-hidden">
        {/* Header - 可拖拽区域 */}
        <div 
          className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground cursor-grab select-none"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span className="font-semibold">智能客服小意</span>
            <span className="text-xs opacity-75 bg-primary-foreground/20 px-2 py-0.5 rounded">AI</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 hover:bg-primary-foreground/20 rounded transition-colors cursor-pointer"
              title="最小化"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-primary-foreground/20 rounded transition-colors cursor-pointer"
              title="收起"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="h-[350px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'assistant' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted'
                }`}>
                  {message.role === 'assistant' ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block max-w-[85%] px-4 py-2 rounded-2xl whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-card/50">
          <div className="flex gap-2">
            <Input
              placeholder="请输入您的问题..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FloatingAgent;
