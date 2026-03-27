import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      // 导航
      'nav.home': '首页',
      'nav.products': '产品',
      'nav.pricing': '价格',
      'nav.login': '登录',
      'nav.register': '注册',
      'nav.dashboard': '控制台',
      
      // 首页
      'home.hero.title': '让经营更',
      'home.hero.title2': '简单',
      'home.hero.subtitle': '意念网是一站式营销平台，助力中小企业数字化经营升级',
      'home.hero.freeRegister': '免费注册',
      'home.hero.learnMore': '了解产品',
      'home.stats.enterprises': '服务企业',
      'home.stats.websites': '网站/小程序',
      'home.stats.uptime': '系统可用性',
      'home.stats.support': '客服支持',
      
      // 产品
      'products.title': '全场景产品矩阵',
      'products.subtitle': '从建站到营销，从电商到客户管理，一站式满足您的所有需求',
      'products.site': '意念建站',
      'products.siteDesc': '企业官网、个人网站快速搭建',
      'products.miniapp': '意念小程序',
      'products.miniappDesc': '微信、支付宝、百度多平台小程序',
      'products.mall': '意念商城',
      'products.mallDesc': '完整的电商解决方案',
      'products.interactive': '意念互动',
      'products.interactiveDesc': 'H5营销活动、投票抽奖',
      
      // 特性
      'features.title': '为什么要选择意念网？',
      'features.subtitle': '我们为您提供最完善的解决方案，让您的业务快速发展',
      'features.siteBuilder': '可视化建站',
      'features.siteBuilderDesc': '拖拽式操作，无需编码，快速搭建专业网站',
      'features.adaptive': '多端适配',
      'features.adaptiveDesc': '一次制作，自动适配PC、平板、手机、小程序',
      'features.ecommerce': '完整电商',
      'features.ecommerceDesc': '商品管理、订单处理、支付集成一站式解决',
      'features.analytics': '数据分析',
      'features.analyticsDesc': '实时访客统计，精准把握运营数据',
      'features.security': '安全可靠',
      'features.securityDesc': '企业级安全防护，数据多重备份',
      'features.support': '7×24客服',
      'features.supportDesc': '专业客服团队，随时为您解答疑问',
      
      // CTA
      'cta.title': '准备好让您的业务更上一层楼了吗？',
      'cta.subtitle': '立即注册，开启您的数字化经营之旅',
      'cta.registerNow': '立即免费注册',
      'cta.viewPricing': '查看价格',
      
      // 底部
      'footer.copyright': '© 2024 意念网. 版权所有',
      'footer.privacy': '隐私政策',
      'footer.terms': '服务条款',
      
      // 智能客服
      'chatbot.title': '智能客服小意',
      'chatbot.placeholder': '请输入您的问题...',
      'chatbot.welcome': '您好！我是意念网智能客服小意，有什么可以帮您的吗？',
    }
  },
  en: {
    translation: {
      // 导航
      'nav.home': 'Home',
      'nav.products': 'Products',
      'nav.pricing': 'Pricing',
      'nav.login': 'Login',
      'nav.register': 'Register',
      'nav.dashboard': 'Dashboard',
      
      // 首页
      'home.hero.title': 'Make Business',
      'home.hero.title2': 'Simpler',
      'home.hero.subtitle': 'Yinain is an all-in-one marketing platform to help SMBs upgrade their digital operations',
      'home.hero.freeRegister': 'Free Register',
      'home.hero.learnMore': 'Learn More',
      'home.stats.enterprises': 'Enterprises Served',
      'home.stats.websites': 'Websites/Mini Programs',
      'home.stats.uptime': 'System Uptime',
      'home.stats.support': '24/7 Support',
      
      // 产品
      'products.title': 'Full Scenario Product Matrix',
      'products.subtitle': 'From website building to marketing, e-commerce to CRM, all-in-one solution for your needs',
      'products.site': 'Yinain Site',
      'products.siteDesc': 'Quickly build business websites and personal sites',
      'products.miniapp': 'Yinain Mini Program',
      'products.miniappDesc': 'WeChat, Alipay, Baidu multi-platform mini programs',
      'products.mall': 'Yinain Mall',
      'products.mallDesc': 'Complete e-commerce solutions',
      'products.interactive': 'Yinain Interactive',
      'products.interactiveDesc': 'H5 marketing activities, voting & giveaways',
      
      // 特性
      'features.title': 'Why Choose Yinain?',
      'features.subtitle': 'We provide the best solutions to help your business grow fast',
      'features.siteBuilder': 'Visual Site Builder',
      'features.siteBuilderDesc': 'Drag-and-drop, no coding needed, build professional sites quickly',
      'features.adaptive': 'Multi-Device',
      'features.adaptiveDesc': 'One creation, auto-adapt to PC, tablet, phone, mini programs',
      'features.ecommerce': 'Complete E-commerce',
      'features.ecommerceDesc': 'Product management, order processing, payment integration',
      'features.analytics': 'Data Analytics',
      'features.analyticsDesc': 'Real-time visitor stats, accurate operation insights',
      'features.security': 'Secure & Reliable',
      'features.securityDesc': 'Enterprise-level security, multi-layer data backup',
      'features.support': '24/7 Support',
      'features.supportDesc': 'Professional team, anytime answers',
      
      // CTA
      'cta.title': 'Ready to take your business to the next level?',
      'cta.subtitle': 'Register now, start your digital transformation journey',
      'cta.registerNow': 'Register Free Now',
      'cta.viewPricing': 'View Pricing',
      
      // 底部
      'footer.copyright': '© 2024 Yinain. All rights reserved',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service',
      
      // 智能客服
      'chatbot.title': 'AI Customer Service',
      'chatbot.placeholder': 'Ask your question...',
      'chatbot.welcome': 'Hello! I\'m Yinain AI Assistant. How can I help you?',
    }
  },
  ja: {
    translation: {
      // 导航
      'nav.home': 'ホーム',
      'nav.products': '製品',
      'nav.pricing': '料金',
      'nav.login': 'ログイン',
      'nav.register': '登録',
      'nav.dashboard': 'ダッシュボード',
      
      // 首页
      'home.hero.title': 'ビジネスを',
      'home.hero.title2': 'シンプルに',
      'home.hero.subtitle': '意念網はオールインワンマーケティングプラットフォーム。中堅中小企業のデジタル化を支援',
      'home.hero.freeRegister': '無料登録',
      'home.hero.learnMore': '詳しく見る',
      'home.stats.enterprises': 'サービス企業',
      'home.stats.websites': 'サイト/ミニプログラム',
      'home.stats.uptime': 'システム稼働率',
      'home.stats.support': 'カスタマーサポート',
      
      // 产品
      'products.title': 'フルシナリオ製品マトリックス',
      'products.subtitle': '网站建设からマーケティング、ECからCRMまで、すべてのニーズに対応',
      'products.site': '意念 建站',
      'products.siteDesc': 'ビジネスサイト・個人サイトを素早く構築',
      'products.miniapp': '意念 小程序',
      'products.miniappDesc': 'WeChat、Alipay、Baidu等多平台小程序',
      'products.mall': '意念 モール',
      'products.mallDesc': '完全なECソリューション',
      'products.interactive': '意念 インタラクティブ',
      'products.interactiveDesc': 'H5マーケティング活動、投票・抽選',
      
      // 特性
      'features.title': 'なぜ意念網を選ぶのか？',
      'features.subtitle': '最高のパフォーマンスを提供し、ビジネス成長を加速',
      'features.siteBuilder': 'ビジュアル建站',
      'features.siteBuilderDesc': 'ドラッグ＆ドロップ、コーディング不要、プロフェッショナルなサイトを素早く構築',
      'features.adaptive': 'マルチデバイス',
      'features.adaptiveDesc': '一回の作成でPC、タブレット、スマホ、ミニプログラムに対応',
      'features.ecommerce': '完整EC',
      'features.ecommerceDesc': '商品管理、注文処理、決済統合',
      'features.analytics': 'データ分析',
      'features.analyticsDesc': 'リアルタイム訪問者統計、正確な運営インサイト',
      'features.security': 'セキュリティ',
      'features.securityDesc': 'エンタープライズレベルセキュリティ、多次元データバックアップ',
      'features.support': '24時間サポート',
      'features.supportDesc': 'プロフェッショナルチーム、常時対応',
      
      // CTA
      'cta.title': 'ビジネスを次のレベルに上げる準備はできましたか？',
      'cta.subtitle': '今すぐ登録、デジタル変革の旅を始めましょう',
      'cta.registerNow': '今すぐ無料登録',
      'cta.viewPricing': '料金を見る',
      
      // 底部
      'footer.copyright': '© 2024 意念網. All rights reserved',
      'footer.privacy': 'プライバシーポリシー',
      'footer.terms': '利用規約',
      
      // 智能客服
      'chatbot.title': 'AIカスタマーサポート',
      'chatbot.placeholder': '質問を入力...',
      'chatbot.welcome': '您好！私は意念網AIアシスタントです。雰囲いがありますか？',
    }
  },
  de: {
    translation: {
      // 导航
      'nav.home': 'Startseite',
      'nav.products': 'Produkte',
      'nav.pricing': 'Preise',
      'nav.login': 'Anmelden',
      'nav.register': 'Registrieren',
      'nav.dashboard': 'Dashboard',
      
      // 首页
      'home.hero.title': 'Business',
      'home.hero.title2': 'Vereinfachen',
      'home.hero.subtitle': 'Yinain ist eine All-in-One-Marketingplattform für kleine und mittlere Unternehmen',
      'home.hero.freeRegister': 'Kostenlos Registrieren',
      'home.hero.learnMore': 'Mehr Erfahren',
      'home.stats.enterprises': 'Unternehmen',
      'home.stats.websites': 'Webseiten/Mini-Programme',
      'home.stats.uptime': 'Systemverfügbarkeit',
      'home.stats.support': '24/7 Support',
      
      // 产品
      'products.title': 'Vollständiges Produktportfolio',
      'products.subtitle': 'Von Website-Erstellung bis Marketing, E-Commerce bis CRM - alles aus einer Hand',
      'products.site': 'Yinain Website',
      'products.siteDesc': 'Schneller Aufbau von Business- und Privathomepages',
      'products.miniapp': 'Yinain Mini-Programm',
      'products.miniappDesc': 'WeChat, Alipay, Baidu Multi-Plattform Mini-Programme',
      'products.mall': 'Yinain Mall',
      'products.mallDesc': 'Komplette E-Commerce-Lösungen',
      'products.interactive': 'Yinain Interaktiv',
      'products.interactiveDesc': 'H5-Marketing-Aktivitäten, Abstimmungen & Gewinnspiele',
      
      // 特性
      'features.title': 'Warum Yinain wählen?',
      'features.subtitle': 'Wir bieten die besten Lösungen für Ihr Geschäftswachstum',
      'features.siteBuilder': 'Visueller Website-Builder',
      'features.siteBuilderDesc': 'Drag-and-Drop, kein Codieren, professionelle Websites schnell erstellen',
      'features.adaptive': 'Multi-Gerät',
      'features.adaptiveDesc': 'Eine Erstellung, automatisch angepasst an PC, Tablet, Phone, Mini-Programme',
      'features.ecommerce': 'Komplette E-Commerce',
      'features.ecommerceDesc': 'Produktmanagement, Auftragsabwicklung, Zahlungsintegration',
      'features.analytics': 'Datenanalyse',
      'features.analyticsDesc': 'Echtzeit-Besucherstatistiken, präzise Betriebseinblicke',
      'features.security': 'Sicher & Zuverlässig',
      'features.securityDesc': 'Enterprise-Sicherheit, mehrschichtige Datensicherung',
      'features.support': '24/7 Support',
      'features.supportDesc': 'Professionelles Team, jederzeit Antworten',
      
      // CTA
      'cta.title': 'Bereit, Ihr Business auf die nächste Stufe zu heben?',
      'cta.subtitle': 'Jetzt registrieren, beginnen Sie Ihre digitale Reise',
      'cta.registerNow': 'Jetzt Kostenlos Registrieren',
      'cta.viewPricing': 'Preise Ansehen',
      
      // 底部
      'footer.copyright': '© 2024 Yinain. Alle Rechte vorbehalten',
      'footer.privacy': 'Datenschutz',
      'footer.terms': 'Nutzungsbedingungen',
      
      // 智能客服
      'chatbot.title': 'KI-Kundenservice',
      'chatbot.placeholder': 'Frage eingeben...',
      'chatbot.welcome': 'Hallo! Ich bin der Yinain KI-Assistent. Wie kann ich helfen?',
    }
  },
  ar: {
    translation: {
      // 导航
      'nav.home': 'الرئيسية',
      'nav.products': 'المنتجات',
      'nav.pricing': 'الأسعار',
      'nav.login': 'تسجيل الدخول',
      'nav.register': 'التسجيل',
      'nav.dashboard': 'لوحة التحكم',
      
      // 首页
      'home.hero.title': 'اجعل عملك',
      'home.hero.title2': 'أبسط',
      'home.hero.subtitle': 'منصة تسويق شاملة للشركات المتوسطة والصغيرة',
      'home.hero.freeRegister': 'تسجيل مجاني',
      'home.hero.learnMore': 'اعرف المزيد',
      'home.stats.enterprises': 'شركات خدمتنا',
      'home.stats.websites': 'مواقع/برامج مصغرة',
      'home.stats.uptime': 'وقت التشغيل',
      'home.stats.support': 'دعم على مدار الساعة',
      
      // 产品
      'products.title': 'مجموعة منتجات كاملة',
      'products.subtitle': 'من إنشاء المواقع إلى التسويق، والتجارة الإلكترونية إلى إدارة العملاء',
      'products.site': 'موقع意念',
      'products.siteDesc': 'إنشاء سريع لمواقع الشركات والمواقع الشخصية',
      'products.miniapp': 'برنامج意念 المصغر',
      'products.miniappDesc': 'WeChat و Alipay و Baidu',
      'products.mall': 'متجر意念',
      'products.mallDesc': 'حلول تجارة إلكترونية كاملة',
      'products.interactive': 'تفاعل意念',
      'products.interactiveDesc': 'أنشطة تسويق H5 واستطلاعات ورهانات',
      
      // 特性
      'features.title': 'لماذا تختار意念؟',
      'features.subtitle': 'نقدم أفضل الحلول لنمو عملك',
      'features.siteBuilder': 'منشئ المواقع المرئي',
      'features.siteBuilderDesc': 'سحب وإفلات، بدون برمجة، أنشئ مواقع احترافية بسرعة',
      'features.adaptive': 'متعدد الأجهزة',
      'features.adaptiveDesc': 'إنشاء واحد يتكيف مع الكمبيوتر والتابلت والهاتف والبرنامج المصغر',
      'features.ecommerce': 'تجارة إلكترونية كاملة',
      'features.ecommerceDesc': 'إدارة المنتجات ومعالجة الطلبات والدفع',
      'features.analytics': 'تحليل البيانات',
      'features.analyticsDesc': 'إحصائيات الزوار في الوقت الفعلي',
      'features.security': 'آمن وموثوق',
      'features.securityDesc': 'أمان على مستوى المؤسسات مع نسخ احتياطي متعددة',
      'features.support': 'دعم 24/7',
      'features.supportDesc': 'فريق محترف في خدمتك',
      
      // CTA
      'cta.title': 'مستعد لرفع عملك إلى المستوى التالي؟',
      'cta.subtitle': 'سجل الآن وابدأ رحلتك الرقمية',
      'cta.registerNow': 'سجل مجاناً الآن',
      'cta.viewPricing': 'عرض الأسعار',
      
      // 底部
      'footer.copyright': '© 2024意念. جميع الحقوق محفوظة',
      'footer.privacy': 'سياسة الخصوصية',
      'footer.terms': 'شروط الخدمة',
      
      // 智能客服
      'chatbot.title': 'خدمة العملاء الذكية',
      'chatbot.placeholder': 'اكتب سؤالك...',
      'chatbot.welcome': 'مرحباً! أنا مساعد意念 الذكي. كيف يمكنني مساعدتك؟',
    }
  }
};

// 检测浏览器语言
const getBrowserLanguage = (): string => {
  const lang = navigator.language || (navigator as any).userLanguage || 'zh';
  return lang.split('-')[0];
};

// 检测 IP 对应的国家并返回语言
const getLanguageFromCountry = async (): Promise<string> => {
  try {
    // 使用 ipapi 检测 IP
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      const countryCode = data.country_code || 'CN';
      
      // 根据国家返回对应语言
      const countryLangMap: Record<string, string> = {
        'CN': 'zh',    // 中国 -> 中文
        'JP': 'ja',    // 日本 -> 日语
        'DE': 'de',    // 德国 -> 德语
        'SA': 'ar',    // 沙特 -> 阿拉伯语
        'AE': 'ar',    // 阿联酋 -> 阿拉伯语
        'EG': 'ar',    // 埃及 -> 阿拉伯语
        'US': 'en',    // 美国 -> 英语
        'GB': 'en',    // 英国 -> 英语
        'AU': 'en',    // 澳大利亚 -> 英语
        'CA': 'en',    // 加拿大 -> 英语
        'FR': 'fr',    // 法国 -> 法语
        'ES': 'es',    // 西班牙 -> 西班牙语
        'IT': 'it',    // 意大利 -> 意大利语
        'KR': 'ko',    // 韩国 -> 韩语
        'TW': 'zh',    // 台湾 -> 中文
        'HK': 'zh',    // 香港 -> 中文
        'MO': 'zh',    // 澳门 -> 中文
      };
      
      return countryLangMap[countryCode] || getBrowserLanguage();
    }
  } catch (error) {
    console.log('IP detection failed, using browser language');
  }
  
  return getBrowserLanguage();
};

// 初始化语言
const initLanguage = async () => {
  const savedLang = localStorage.getItem('yinain-lang');
  if (savedLang && ['zh', 'en', 'ja', 'de', 'ar'].includes(savedLang)) {
    return savedLang;
  }
  
  // 优先使用浏览器语言
  const browserLang = getBrowserLanguage();
  if (['zh', 'en', 'ja', 'de', 'ar'].includes(browserLang)) {
    return browserLang;
  }
  
  // 尝试检测 IP
  return await getLanguageFromCountry();
};

// 同步初始化
const getInitialLanguage = (): string => {
  const savedLang = localStorage.getItem('yinain-lang');
  if (savedLang && ['zh', 'en', 'ja', 'de', 'ar'].includes(savedLang)) {
    return savedLang;
  }
  return getBrowserLanguage();
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

// 异步设置语言（在应用启动后调用）
export const setLanguage = async (lang: string) => {
  localStorage.setItem('yinain-lang', lang);
  await i18n.changeLanguage(lang);
};

export const getCurrentLanguage = () => i18n.language;

export const supportedLanguages = [
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

export default i18n;
