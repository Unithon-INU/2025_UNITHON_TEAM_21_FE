import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChattingStackParamList} from '@/Navigation/ChattingNavigator'; // 채팅탭 내비게이션 스택 파라미터 리스트

type Navigation = NativeStackNavigationProp<ChattingStackParamList>; // 채팅탭 내비게이션 타입

export default function useChattingNavigation() { // 채팅탭 내비게이션 훅
  // useNavigation 훅을 사용하여 내비게이션 객체를 가져옵니다.
    return useNavigation<Navigation>();
}
