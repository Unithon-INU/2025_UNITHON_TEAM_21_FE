import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const thisMonthData = [
    {id: '1', name: '레인', amount: 10200300},
    {id: '2', name: 'DAFASF', amount: 1000000},
    {id: '3', name: '봉사킹', amount: 900000},
    {id: '4', name: '안양양반간카워용우리', amount: 1000},
    {id: '5', name: '유후', amount: 100},
    {id: '6', name: '홍길동', amount: 700000},
    {id: '7', name: '박보검', amount: 1230000},
    {id: '8', name: '김연아', amount: 400000},
    {id: '9', name: '손흥민', amount: 200000},
    {id: '10', name: '이순신', amount: 500000},
    {id: '11', name: '정약용', amount: 300000},
    {id: '12', name: '강감찬', amount: 1200000},
    {id: '13', name: '세종대왕', amount: 1500000},
    {id: '14', name: '이황', amount: 600000},
    {id: '15', name: '율곡이이', amount: 800000},
    {id: '16', name: '장보고', amount: 1100000},
    {id: '17', name: '김구', amount: 950000},
    {id: '18', name: '윤봉길', amount: 760000},
    {id: '19', name: '안중근', amount: 830000},
    {id: '20', name: '유관순', amount: 870000},
];

const lastMonthData = [
    {id: '1', name: '레인', amount: 10000000},
    {id: '2', name: 'DAFASF', amount: 11000000},
    {id: '3', name: '봉사킹', amount: 800000},
    {id: '4', name: '안양양반간카워용우리', amount: 1000},
    {id: '5', name: '유후', amount: 500},
    {id: '6', name: '홍길동', amount: 600000},
    {id: '7', name: '박보검', amount: 1000000},
    {id: '8', name: '김연아', amount: 200000},
    {id: '9', name: '손흥민', amount: 180000},
    {id: '10', name: '이순신', amount: 510000},
    {id: '11', name: '정약용', amount: 290000},
    {id: '12', name: '강감찬', amount: 1000000},
    {id: '13', name: '세종대왕', amount: 1300000},
    {id: '14', name: '이황', amount: 650000},
    {id: '15', name: '율곡이이', amount: 750000},
    {id: '16', name: '장보고', amount: 900000},
    {id: '17', name: '김구', amount: 1000000},
    {id: '18', name: '윤봉길', amount: 700000},
    {id: '19', name: '안중근', amount: 870000},
    {id: '20', name: '유관순', amount: 850000},
];

const sortedThis = [...thisMonthData].sort((a, b) => b.amount - a.amount);
const sortedLast = [...lastMonthData].sort((a, b) => b.amount - a.amount);

const mergedData = sortedThis.map((item, index) => {
    const prevIndex = sortedLast.findIndex(prev => prev.id === item.id);
    let diff = null;
    let change = 0;

    if (prevIndex !== -1) {
        if (prevIndex > index) {
            diff = 'up';
            change = prevIndex - index;
        } else if (prevIndex < index) {
            diff = 'down';
            change = index - prevIndex;
        } else {
            diff = 'same';
        }
    }

    return {
        ...item,
        diff,
        change,
        profileUrl: 'https://via.placeholder.com/24',
    };
});

const HeroListDetail = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const navigation = useNavigation();

    return (
        <View className="flex-1 p-4 bg-white">
            <View className="flex-row items-center mb-2">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="text-xl text-font-black">{'<'}</Text>
                </TouchableOpacity>
                <Text className="ml-2 text-xl font-semibold">Donation Hero</Text>
            </View>

            <Text className="mb-4 text-xs text-right text-font-gray">{formattedDate} 기준</Text>

            <FlatList
                data={mergedData}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                    <View className="flex-row items-center justify-between py-3">
                        <Text className="w-6 font-semibold">{index + 1}</Text>

                        <View className="flex-row items-center flex-1 ml-2">
                            {item.diff === 'up' && <Text className="mr-1 text-lg text-green-500">▲</Text>}
                            {item.diff === 'down' && <Text className="mr-1 text-lg text-red-500">▼</Text>}
                            {item.diff === 'same' && <Text className="mr-1 text-lg text-neutral-500">●</Text>}

                            <Image source={{uri: item.profileUrl}} className="w-[30px] h-[30px] rounded-full mr-1.5" />
                            <Text className="flex-1 font-semibold" numberOfLines={1}>
                                {item.name}
                            </Text>
                        </View>

                        <Text className="font-semibold">{item.amount.toLocaleString()}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default HeroListDetail;
