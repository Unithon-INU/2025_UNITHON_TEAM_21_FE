import {useState} from 'react';
import {API_URL} from '@env';

export interface SignupForm {
    nickname: string;
    email: string;
    password: string;
}

interface UseSignupOptions {
    onSuccess?: () => void;
    onError?: (errorMessage: string) => void;
}
export function useSignup() {
    const [loading, setLoading] = useState(false);

    const signup = async (form: SignupForm, options?: UseSignupOptions) => {
        const {nickname, email, password} = form;
        if (!nickname || !email || !password) {
            options?.onError?.('모든 항목을 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/join/email`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({nickname, email, password}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                options?.onError?.(errorData.message || '서버 오류가 발생했습니다.');
            } else {
                options?.onSuccess?.();
            }
        } catch (error) {
            options?.onError?.('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return {loading, signup};
}
