// src/api/portfolio.ts
import axios from 'axios';
import { loadToken } from '@/utils/token';

const API_BASE = 'http://localhost:3000/api/portfolio';

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${loadToken()}`,
    },
});

// 📌 포트폴리오 조회
export const getPortfolio = async () => {
    const res = await axios.get(`${API_BASE}`, authHeader());
    return res.data.data;
};

// 📌 포트폴리오 요약
export const getPortfolioSummary = async () => {
    const res = await axios.get(`${API_BASE}/summary`, authHeader());
    return res.data.data;
};

// 📌 매수용 payload 타입
export interface TradePayload {
    symbol: string;
    name: string;
    buyPrice: number;
    quantity: number;
}

// 📌 매수 API
export const buyStock = async (payload: TradePayload) => {
    const res = await axios.post(`${API_BASE}`, payload, authHeader());
    return res.data.data;
};

// 📌 매도 API
export const sellStock = async (
    symbol: string,
    payload: { sellPrice: number; quantity: number }
) => {
    const res = await axios.post(`${API_BASE}/${symbol}`, payload, authHeader());
    return res.data.data;
};
