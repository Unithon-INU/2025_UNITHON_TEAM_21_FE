import React from 'react';
import {ScrollView} from 'react-native';
import ChatBubble from '@/components/ChatBubble';

export default function ChatRoomScreen() {
    return (
        <ScrollView className="p-4 bg-white flex-1">
            {/* 상대방 메시지 */}
            <ChatBubble message="이러쿵, 저러쿵" time="오후 4:49" isMe={false} />

            {/* 내 메시지 */}
            <ChatBubble message="ㅇㅇㅇ" time="오후 4:49" isMe={true} />

            {/* 또 다른 메시지 */}
            <ChatBubble message="이렇게 하시는 건 어때요?" time="오후 4:50" isMe={false} />
        </ScrollView>
    );
}
