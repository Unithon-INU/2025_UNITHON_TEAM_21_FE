// src/components/DonationStatus.tsx
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DonationStatus = ({data = [], showHeader = true}) => {
    const navigation = useNavigation();

    return (
        <View>
            {showHeader && (
                <View className="flex-row justify-between mb-3">
                    <Text className="text-lg font-semibold text-font-black">실시간 기부현황</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('DonationStatusDetail')}>
                        <Text className="text-xs font-semibold text-main-color">더보기 &gt;</Text>
                    </TouchableOpacity>
                </View>
            )}

            {data.map(item => (
                <View key={item.id} className="flex-row p-3 mb-3 bg-white rounded-lg">
                    <Image source={{uri: 'https://via.placeholder.com/80'}} className="w-[100px] h-[100px] rounded-xl mr-3" />

                    <View className="justify-center flex-1">
                        <View className="mb-3">
                            <Text className="mb-1 text-base font-semibold text-font-black">{item.center}</Text>
                            <Text className="text-xs font-medium text-font-gray">{item.address}</Text>
                        </View>

                        <View className="flex-row items-end justify-between">
                            <View className="flex-row items-end space-x-2">
                                <Text className="text-xl font-semibold text-main-color">{item.percent}% </Text>
                                <Text className="text-xs font-semibold text-font-gray">{item.amount.toLocaleString()}원</Text>
                            </View>
                            <Text className="text-xs font-semibold text-font-black">{item.remainDays}일 남음</Text>
                        </View>

                        <View className="h-[1px] bg-font-gray mt-1.5">
                            <View style={{width: `${Math.min(item.percent, 100)}%`}} className="h-[1px] bg-main-color" />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default DonationStatus;
