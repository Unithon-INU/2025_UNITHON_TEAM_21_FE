import React from 'react';
import {View, Text, Image} from 'react-native';
import ShowMoreButton from '@/components/button/ShowMoreButton';

const thisMonthData = [
    {id: '1', name: '레인', amount: 10200300},
    {id: '2', name: 'DAFASF', amount: 1000000},
    {id: '3', name: '봉사킹', amount: 900000},
    {id: '4', name: '안양양반간카워용우리', amount: 1000},
    {id: '5', name: '유후', amount: 100},
];

const lastMonthData = [
    {id: '3', name: '봉사킹', amount: 800000},
    {id: '1', name: '레인', amount: 10000000},
    {id: '5', name: '유후', amount: 500},
    {id: '2', name: 'DAFASF', amount: 11000000},
    {id: '4', name: '안양양반간카워용우리', amount: 1000},
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

const MonthlyDonationHeroList = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    return (
        <View className="mt-3">
            <View className="flex-row justify-between mb-3">
                <Text className="text-xl font-semibold text-font-black">이번달 기부히어로</Text>
                <ShowMoreButton href="heroListDetail" />
            </View>
            <Text className="text-xs font-normal text-right text-font-gray">{formattedDate} 기준</Text>

            {[...mergedData]
                .sort((a, b) => b.amount - a.amount)
                .map((item, index) => (
                    <View key={item.id} className="flex-row items-center justify-between py-3">
                        <Text className="w-4 font-semibold">{index + 1}</Text>

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
                ))}
        </View>
    );
};

export default MonthlyDonationHeroList;
