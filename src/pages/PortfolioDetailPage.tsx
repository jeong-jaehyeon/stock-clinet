import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStockDetail, StockDetail } from '@/api/stocks';
import {
    buyStock,
    sellStock,
    deleteStock,
    TradePayload,
} from '@/api/portfolio';

const PortfolioDetailPage = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const navigate = useNavigate();

    const [stock, setStock] = useState<StockDetail | null>(null);
    const [loading, setLoading] = useState(true);

    const [isBuyMode, setIsBuyMode] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                if (!symbol) return;
                const data = await getStockDetail(symbol);
                setStock(data);
            } catch (err) {
                alert('주식 정보를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchStock();
    }, [symbol]);

    const handleTrade = async () => {
        if (!symbol || !stock) return;
        try {
            if (isBuyMode) {
                const payload: TradePayload = {
                    symbol: stock.symbol,
                    name: stock.name,
                    buyPrice: price,
                    quantity,
                };
                await buyStock(payload);
                alert(`매수 성공: ${symbol} ${quantity}주`);
            } else {
                await sellStock(symbol, { sellPrice: price, quantity });
                alert(`매도 성공: ${symbol} ${quantity}주`);
            }
        } catch (e) {
            alert('거래 실패');
        }
    };

    const handleDelete = async () => {
        if (!symbol) return;
        const confirmDelete = window.confirm(`${symbol} 주식을 삭제할까요?`);
        if (!confirmDelete) return;

        try {
            await deleteStock(symbol);
            alert(`${symbol} 주식 삭제 완료`);
            navigate('/portfolio');
        } catch (err) {
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    if (loading) return <p className="p-8">로딩 중...</p>;
    if (!stock) return <p className="p-8">주식 정보를 찾을 수 없습니다.</p>;

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{stock.name} 상세 정보</h2>
            <ul className="space-y-1 mb-6">
                <li>
                    <strong>심볼:</strong> {stock.symbol}
                </li>
                <li>
                    <strong>현재가:</strong> {stock.price.toFixed(2)} {stock.currency}
                </li>
                <li>
                    <strong>거래소:</strong> {stock.exchange}
                </li>
            </ul>

            <div className="mt-6 flex gap-4">
                <button
                    onClick={() => setIsBuyMode(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    매수
                </button>
                <button
                    onClick={() => setIsBuyMode(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    매도
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                    삭제
                </button>
            </div>

            <div className="mt-6 space-y-2">
                <h3 className="font-semibold">{isBuyMode ? '매수' : '매도'} 입력</h3>
                <input
                    type="number"
                    placeholder="수량"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="number"
                    placeholder="단가"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={handleTrade}
                    className={`px-4 py-2 rounded w-full ${
                        isBuyMode ? 'bg-green-600' : 'bg-red-600'
                    } text-white`}
                >
                    {isBuyMode ? '매수 실행' : '매도 실행'}
                </button>
            </div>
        </div>
    );
};

export default PortfolioDetailPage;
