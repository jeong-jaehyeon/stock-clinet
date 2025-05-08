import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import PortfolioPage from '@/pages/PortfolioPage';
import PortfolioDetailPage from '@/pages/PortfolioDetailPage';
import TradeHistoryPage from '@/pages/TradeHistoryPage';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:symbol" element={<PortfolioDetailPage />} />
            <Route path="/history" element={<TradeHistoryPage />} />
        </Routes>
    </BrowserRouter>
);

export default Router;
