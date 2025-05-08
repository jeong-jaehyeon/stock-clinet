import { useEffect, useState } from 'react';
import { getTradeHistory, TradeHistoryItem } from '@/api/history';

const TradeHistoryPage = () => {
    const [history, setHistory] = useState<TradeHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getTradeHistory();
                setHistory(data);
            } catch (err) {
                alert('거래 내역을 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <p className="p-8">로딩 중...</p>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">거래 내역</h2>
            <table className="w-full table-auto border">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">종목</th>
                    <th className="p-2 border">거래종류</th>
                    <th className="p-2 border">단가</th>
                    <th className="p-2 border">수량</th>
                    <th className="p-2 border">손익</th>
                    <th className="p-2 border">일시</th>
                </tr>
                </thead>
                <tbody>
                {history.map((item) => (
                    <tr key={item.id}>
                        <td className="p-2 border text-center">{item.symbol}</td>
                        <td
                            className={`p-2 border text-center font-semibold ${
                                item.tradeType === 'BUY' ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            {item.tradeType}
                        </td>
                        <td className="p-2 border text-right">{item.tradePrice}</td>
                        <td className="p-2 border text-right">{item.quantity}</td>
                        <td
                            className={`p-2 border text-right ${
                                item.profitLoss && item.profitLoss >= 0
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }`}
                        >
                            {item.tradeType === 'SELL'
                                ? item.profitLoss?.toFixed(2) ?? '-'
                                : '-'}
                        </td>
                        <td className="p-2 border text-center">
                            {new Date(item.createdAt).toLocaleString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TradeHistoryPage;
