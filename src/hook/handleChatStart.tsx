import {RootState} from '@/store/store';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';
interface CenterData {
    id: string;
    centerName: string;
}

export const handleChatStart = async (data: CenterData, navigation: any) => {
    // Assuming you are using Redux and RootState contains user info
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = useSelector((state: RootState) => state.user);
    const senderId = user.profile?.id;
    const targetId = data.id; // 센터의 id
    // console.log(senderId, targetId);
    try {
        const res = await fetch(`${API_URL}/api/chatroom/get-or-create?userId=${senderId}&organizationId=${targetId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${user.token?.accessToken}`,
            },
        });
        console.log(res);
        console.log('📥 status:', res.status);
        const {chatRoomId} = await res.json();
        console.log(chatRoomId);
        navigation.navigate('ChatRoom', {
            chatRoomId,
            targetName: data.centerName,
        });
        console.log(chatRoomId);
    } catch (error) {
        console.error('❌ 채팅방 생성 실패:', error);
    }
};
