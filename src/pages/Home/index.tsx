import React from 'react';
import {Image, View} from 'react-native';
import Layout from '../Layout';

import SignupButton from './components/SignupButton';
import DonationComponents from './components/DonantionItem';
import CenterItem from './components/CenterItem';
import RecommendActivity from './components/RecommendActivity';
import TotalDonationAmount from './components/TotalDonationAmount';
import MonthlyDonationHeroList from './components/MonthlyDonationHeroList';

export default function Home() {
    return (
        <Layout>
            <View className="flex flex-row items-center justify-between">
                <Image className="w-[120px] h-[46px]" source={require('@/assets/logo.png')} />
                <SignupButton />
            </View>
            <TotalDonationAmount />
            <CenterItem />
            <DonationComponents />
            <RecommendActivity />
            <MonthlyDonationHeroList />
        </Layout>
    );
}
