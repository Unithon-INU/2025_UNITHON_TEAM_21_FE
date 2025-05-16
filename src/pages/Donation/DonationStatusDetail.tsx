// src/pages/donation/DonationStatusDetailPage.tsx
import React from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DonationStatus from './components/DonationStatus';
import {donationStatusDummy} from '../../data/donationStatusDummy';

const DonationStatusDetailPage = () => {
    const navigation = useNavigation();

    return (
        <ScrollView className="p-4 bg-white">
            <View className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="mr-2 text-xl text-font-black">{'<'} </Text>
                </TouchableOpacity>
                <Text className="text-xl font-bold text-font-black">Live Donation Status</Text>
            </View>

            <DonationStatus data={donationStatusDummy} showHeader={false} />
        </ScrollView>
    );
};

export default DonationStatusDetailPage;
