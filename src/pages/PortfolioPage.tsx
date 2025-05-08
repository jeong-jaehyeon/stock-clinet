import { useEffect, useState } from 'react';
import { getPortfolioSummary } from '@/api/portfolio';

interface SummaryItem {
    symbol: string;
    name: string;
    quantity: number;
    buyPrice: number;
    currentPrice: number;
    profitLoss: number;
}

const PortfolioPage = () => {
    const [summary, setSummary] = useState<SummaryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getPortfolioSummary();
                setSummary(data);
            } catch (err) {
                alert('포트폴리오를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">나의 포트폴리오</h2>
            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <table className="w-full table-auto border">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">종목</th>
                        <th className="p-2 border">수량</th>
                        <th className="p-2 border">매입가</th>
                        <th className="p-2 border">현재가</th>
                        <th className="p-2 border">손익</th>
                    </tr>
                    </thead>
                    <tbody>
                    {summary.map((item) => (
                        <tr key={item.symbol}>
                            <td className="p-2 border text-center">{item.symbol}</td>
                            <td className="p-2 border text-right">{item.quantity}</td>
                            <td className="p-2 border text-right">{item.buyPrice.toFixed(2)}</td>
                            <td className="p-2 border text-right">{item.currentPrice.toFixed(2)}</td>
                            <td
                                className={`p-2 border text-right ${
                                    item.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {item.profitLoss.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PortfolioPage;
