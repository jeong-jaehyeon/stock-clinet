import axios from 'axios';
import { loadToken } from '@/utils/token';

const API_URL = 'http://localhost:3000/api/portfolio/history';

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${loadToken()}`,
    },
});

export interface TradeHistoryItem {
    id: number;
    symbol: string;
    name: string;
    tradeType: 'BUY' | 'SELL';
    tradePrice: number;
    quantity: number;
    profitLoss?: number;
    createdAt: string;
}

export const getTradeHistory = async (): Promise<TradeHistoryItem[]> => {
    const res = await axios.get(API_URL, authHeader());
    return res.data.data;
};
