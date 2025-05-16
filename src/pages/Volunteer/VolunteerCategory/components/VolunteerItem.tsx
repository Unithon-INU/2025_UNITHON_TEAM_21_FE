import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {getVltrSearchWordListItem} from '@/types/volunteerTyps';
import {formatDate} from '@/utils/formatDate';

const STATUS_TEXT: Record<number, string> = {
    1: 'Pending',
    2: 'Recruiting',
    3: 'Closed',
};

const STATUS_COLOR: Record<number, string> = {
    1: '#E0E0E0',
    2: '#FFB257',
    3: '#9E9E9E',
};

function getDaysLeft(dateString: number) {
    const dateStr = String(dateString);
    const endDate = new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`);
    const today = new Date();
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
export default function VolunteerItem({item}: {item: getVltrSearchWordListItem}) {
    const [like, setLike] = useState(false);
    const navigation = useNavigation() as any;
    const deadline = getDaysLeft(item.noticeEndde);
    return (
        <TouchableOpacity className="flex gap-0.5" onPress={() => navigation.navigate('volunteerDetail', {progrmRegistNo: item.progrmRegistNo})}>
            <View className="flex flex-row justify-between">
                <Text className="flex-1 text-xl font-semibold text-font-black" numberOfLines={2}>
                    {item.progrmSj}
                </Text>
                {like ? (
                    <Ionicons name="heart" size={24} color={'#FFB257'} onPress={() => setLike(false)} />
                ) : (
                    <Ionicons name="heart-outline" size={24} color={'#FFB257'} onPress={() => setLike(true)} />
                )}
            </View>
            <Text className="font-semibold" style={{color: STATUS_COLOR[item.progrmSttusSe] || '#000'}}>
                {STATUS_TEXT[item.progrmSttusSe] || ''}
                {item.progrmSttusSe === 2 ? (deadline === 0 ? ' | Deadline Today' : deadline > 0 ? ` |  ${deadline} day(s) left` : '') : ''}
            </Text>
            <Text className="font-semibold text-font-gray">Location {item.nanmmbyNm}</Text>
            <Text className="font-semibold text-font-gray">
                Recruitment Period {formatDate(item.noticeBgnde)} ~ {formatDate(item.noticeEndde)}
            </Text>
            <Text className="font-semibold text-font-gray">
                Volunteer Period {formatDate(item.progrmBgnde)} ~ {formatDate(item.progrmEndde)}
            </Text>
            <Text className="font-semibold text-font-gray">
                Time {item.actBeginTm}:00 ~ {item.actEndTm}:00 ({item.actEndTm - item.actBeginTm}H)
            </Text>
        </TouchableOpacity>
    );
}
