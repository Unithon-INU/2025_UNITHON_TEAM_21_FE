// src/pages/donation/TotalDonationAmount.tsx
import React from 'react';
import {View, Text} from 'react-native';

const TotalDonationAmount = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    return (
        <View className="mb-6">
            <Text className="mb-5 text-xl font-semibold text-left text-font-black">Total Donations via 기봉사</Text>

            <View className="flex-row justify-center items-end mb-2.5">
                <Text className="text-4xl font-semibold text-center text-main-color">12,345,678</Text>
                <Text className="mb-1 ml-1 text-base font-semibold text-main-color">KRW</Text>
            </View>

            <Text className="ml-32 text-xs font-normal text-center text-font-gray">As of {formattedDate}</Text>
        </View>
    );
};

export default TotalDonationAmount;
