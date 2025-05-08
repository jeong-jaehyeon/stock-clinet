import { useState } from 'react';
import { login } from '@/api/auth';
import { saveToken } from '@/utils/token';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { token, user } = await login({ email, password });
            saveToken(token);
            alert(`환영합니다, ${user.email}님!`);
        } catch (err) {
            alert('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl font-bold mb-6">로그인</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    로그인
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
