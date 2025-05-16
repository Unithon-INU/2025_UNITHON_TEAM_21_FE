import React from 'react';
import {Text, View} from 'react-native';
import TotalDonationAmount from './TotalDonationAmount';
import MonthlyDonationHeroList from './MonthlyDonationHeroList';
import DonationItem from '../Home/components/DonantionItem';
import Layout from '../Layout';

const DonatePage = () => {
    return (
        <Layout>
            <View className="flex flex-col justify-between py-4">
                <Text className="text-xl font-bold text-font-black">Donate</Text>
            </View>
            <TotalDonationAmount />
            <DonationItem />
            <MonthlyDonationHeroList />
        </Layout>
    );
};

export default DonatePage;
