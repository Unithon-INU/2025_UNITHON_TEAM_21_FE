import {useEffect, useRef} from 'react';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';

export default function useChatSocket({chatRoomId, onMessage}: {chatRoomId: string; onMessage: (msg: any) => void}) {
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        // 서버 주소는 실제 서버 주소로 변경
        const socket = new SockJS('https://63a4-106-101-8-197.ngrok-free.app/ws-chat');
        const client = new Client({
            webSocketFactory: () => socket as any,
            debug: str => console.log(str),
            onConnect: () => {
                // 구독
                client.subscribe(`/topic/chatroom/${chatRoomId}`, message => {
                    if (message.body) {
                        onMessage(JSON.parse(message.body));
                    }
                });
            },
            onStompError: frame => {
                console.error('Broker reported error: ' + frame.headers.message);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [chatRoomId, onMessage]);

    // 메시지 전송 함수 반환
    const sendMessage = (msg: any) => {
        clientRef.current?.publish({
            destination: '/app/chat.send',
            body: JSON.stringify(msg),
        });
    };

    return {sendMessage};
}
