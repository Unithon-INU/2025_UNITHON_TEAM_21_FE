import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert} from 'react-native';

export interface SignupForm {
    nickname: string;
    email: string;
    password: string;
}

export function useSignup({ nickname, email, password }: SignupForm) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation() as any;

  const signup = async () => {
    if (!nickname || !email || !password) {
      Alert.alert('오류', '모든 항목을 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/join/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('회원가입 실패', errorData.message || '서버 오류가 발생했습니다.');
      } else {
        Alert.alert('회원가입 성공', '회원가입이 완료되었습니다!');
        navigation.replace('main');
        // 필요하다면 폼 초기화 등 추가
      }
    } catch (error) {
      Alert.alert('네트워크 오류', '회원가입 요청 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
}