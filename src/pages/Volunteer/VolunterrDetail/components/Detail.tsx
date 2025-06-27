import {Text, View} from 'react-native';

import {getVltrPartcptnItemListItem} from '@/types/volunteerTyps';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {formatDate} from '@/utils/formatDate';

function StateIcon({state}: {state: number}) {
    const {text, icon, bgColor, textColor} = {
        1: {
            text: '모집대기',
            icon: <FontAwesome6 name="hourglass-start" size={20} color="#9A9A9A" />,
            bgColor: '#E0E0E0',
            textColor: '#9A9A9A',
        },
        2: {
            text: '모집중',
            icon: <MaterialCommunityIcons name="fire" size={20} color="#FFFFFF" />,
            bgColor: '#FFB257',
            textColor: '#FFFFFF',
        },
        3: {
            text: '모집완료',
            icon: <Ionicons name="ban-outline" size={20} color="#FFFFFF" />,
            bgColor: '#9E9E9E',
            textColor: '#FFFFFF',
        },
    }[state] || {
        icon: null,
        bgColor: 'transparent',
        textColor: 'transparent',
    };

    return (
        <View className="flex flex-row items-center justify-center py-1 gap-0.5 w-[120px] rounded-2xl" style={{backgroundColor: bgColor}}>
            {icon}
            <Text className="text-lg font-semibold" style={{color: textColor}}>
                {text}
            </Text>
        </View>
    );
}

export default function Detail({item}: {item: getVltrPartcptnItemListItem}) {
    return (
        <View className="flex gap-2 py-3">
            <StateIcon state={item.progrmSttusSe} />
            <Text className="text-lg font-semibold">{item.progrmSj}</Text>
            <View className="flex flex-row gap-1 items-center">
                <Ionicons size={24} name="location-outline" color="#484848" />
                <Text className="font-semibold text-font-black">봉사장소 {item.nanmmbyNm}</Text>
            </View>
            <View className="flex flex-row gap-1 items-center">
                <MaterialCommunityIcons size={24} name="calendar-clock-outline" color="#484848" />
                <Text className="font-semibold text-font-black">
                    모집기간 {formatDate(item.noticeBgnde)} ~ {formatDate(item.noticeEndde)}
                </Text>
            </View>
            <View className="flex flex-row gap-1 items-center">
                <MaterialCommunityIcons size={24} name="calendar" color="#484848" />
                <Text className="font-semibold text-font-black">
                    봉사일시 {formatDate(item.progrmBgnde)} ~ {formatDate(item.progrmEndde)}
                </Text>
            </View>
            <View className="flex flex-row gap-1 items-center">
                <MaterialCommunityIcons size={24} name="clock-time-five-outline" color="#484848" />
                <Text className="font-semibold text-font-black">
                    소요시간 {item.actBeginTm}:00 ~ {item.actEndTm}:00 ({item.actEndTm - item.actBeginTm}시간)
                </Text>
            </View>
            <View className="flex flex-row gap-1 items-center">
                <Ionicons size={24} name="person-outline" color="#484848" />
                <Text className="font-semibold text-font-black items-cent">모집인원 {item.rcritNmpr}명</Text>
            </View>
        </View>
    );
}
