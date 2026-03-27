# 意念网 (ynn8.com) - SAAS 一站式营销平台

## 1. Project Overview

**项目名称**: 意念网 (YINIAN)
**项目类型**: SAAS 一站式营销平台
**核心定位**: 为中小企业提供自助建站、小程序制作、在线商城、营销工具等互联网营销服务
**目标用户**: 中小企业主、个体创业者、营销人员

---

## 2. 产品矩阵

### 2.1 意念建站 (Site Builder)
- 可视化拖拽编辑器
- 500+ 精美模板
- 响应式设计（PC/手机/平板）
- SEO 设置
- 表单收集
- 在线客服
- 会员系统
- 数据统计

### 2.2 意念小程序 (Mini Program)
- 微信小程序
- 支付宝小程序
- 百度小程序
- 抖音小程序
- 行业模板
- 组件市场
- 数据分析

### 2.3 意念商城 (E-commerce)
- 商品管理
- 订单管理
- 库存管理
- 支付集成（微信/支付宝）
- 优惠券/满减
- 拼团/秒杀
- 会员积分
- 物流跟踪

### 2.4 意念互动 (Interactive)
- H5 微页面
- 投票活动
- 抽奖游戏
- 红包雨
- 答题活动
- 涨粉活动
- 数据统计
- 分享传播

### 2.5 意念客户通 (CRM)
- 客户管理
- 门店管理
- 会员卡
- 消费记录
- 营销提醒
- 数据分析

---

## 3. UI/UX Specification

### 3.1 Layout Structure

**页面结构**:
- 固定顶部导航栏 (64px 高度)
- 主体内容区
- 页脚
- 控制台侧边栏 (280px)

**响应式断点**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 3.2 Visual Design

**品牌色彩**:
- Primary: #6366F1 (Indigo)
- Secondary: #10B981 (Emerald)
- Accent: #F59E0B (Amber)
- Background: #0F172A
- Surface: #1E293B
- Border: #475569

---

## 4. Technical Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts
- React Router
- Lucide Icons

---

## 5. 页面路由

| 路由 | 页面 |
|------|------|
| / | 首页 |
| /products | 产品介绍 |
| /pricing | 价格 |
| /auth | 登录/注册 |
| /dashboard | 仪表盘 |
| /dashboard/sites | 我的网站 |
| /dashboard/editor/:id | 网站编辑器 |
| /dashboard/miniprogram | 小程序 |
| /dashboard/shop | 商城管理 |
| /dashboard/shop/products | 商品管理 |
| /dashboard/shop/orders | 订单管理 |
| /dashboard/interactive | 互动活动 |
| /dashboard/customers | 客户管理 |
| /dashboard/tokens | AI Tokens |
| /dashboard/settings | 账户设置 |
