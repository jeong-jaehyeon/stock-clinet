import axios from 'axios';

export interface StockDetail {
    symbol: string;
    name: string;
    price: number;
    exchange: string;
    currency: string;
}

export const getStockDetail = async (symbol: string): Promise<StockDetail> => {
    const res = await axios.get(`http://localhost:3000/api/stocks/${symbol}`);
    return res.data.data;
};
