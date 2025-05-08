import { useState } from 'react';
import { register } from '@/api/auth';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await register({ email, password });
            alert(`회원가입 완료: ${result.email}`);
        } catch (err) {
            alert('회원가입 실패: 이미 존재하는 이메일일 수 있습니다.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl font-bold mb-6">회원가입</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
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
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;
