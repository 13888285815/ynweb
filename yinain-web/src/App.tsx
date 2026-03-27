import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ConsoleLayout from './layouts/ConsoleLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import PricingPage from './pages/PricingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TokensPage from './pages/TokensPage';
import SiteEditorPage from './pages/SiteEditorPage';
import ShopProductsPage from './pages/ShopProductsPage';
import ShopOrdersPage from './pages/ShopOrdersPage';
import InteractivePage from './pages/InteractivePage';
import CustomersPage from './pages/CustomersPage';
import MiniprogramPage from './pages/MiniprogramPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages with Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/*" element={<ProductsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        {/* Auth Page (no layout) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Console Pages with Console Layout */}
        <Route element={<ConsoleLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Site Builder */}
          <Route path="/dashboard/sites" element={<DashboardPage />} />
          <Route path="/dashboard/editor/:id" element={<SiteEditorPage />} />
          <Route path="/dashboard/editor" element={<SiteEditorPage />} />
          
          {/* Miniprogram */}
          <Route path="/dashboard/miniprogram" element={<MiniprogramPage />} />
          
          {/* Shop */}
          <Route path="/dashboard/shop" element={<ShopProductsPage />} />
          <Route path="/dashboard/shop/products" element={<ShopProductsPage />} />
          <Route path="/dashboard/shop/orders" element={<ShopOrdersPage />} />
          
          {/* Interactive */}
          <Route path="/dashboard/interactive" element={<InteractivePage />} />
          
          {/* CRM */}
          <Route path="/dashboard/customers" element={<CustomersPage />} />
          
          {/* Tokens */}
          <Route path="/dashboard/tokens" element={<TokensPage />} />
          
          {/* Settings */}
          <Route path="/dashboard/settings" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
