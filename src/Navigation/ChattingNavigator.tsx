import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatListScreen from '@/pages/Chatting/ChatList';
import ChatRoomScreen from '@/pages/Chatting/ChatRoom';
import NotificationScreen from '@/pages/Notification';

export type ChattingStackParamList = {
    // 채팅탭 내비게이션 스택 파라미터 리스트
    // 각 스크린의 파라미터 타입을 정의합니다.
    ChatList: undefined;
    ChatRoom: {id: string};
    Notification: undefined;
};

const Stack = createNativeStackNavigator<ChattingStackParamList>();

export default function ChattingNavigator() {
    return (
        // 채팅탭 내비게이션
        // createNativeStackNavigator를 사용하여 스택 내비게이션을 생성합니다.
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="ChatList">
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
        </Stack.Navigator>
    );
}
