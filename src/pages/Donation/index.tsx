// src/pages/donation/DonatePage.tsx
import React from 'react';
import {ScrollView, View} from 'react-native';
import TotalDonationAmount from './TotalDonationAmount';
import MonthlyDonationHeroList from './MonthlyDonationHeroList';
import DonationStatus from './components/DonationStatus';
import {donationStatusDummy} from '../../data/donationStatusDummy';

const DonatePage = () => {
    return (
        <ScrollView>
            <View className="p-4">
                <TotalDonationAmount />
                <DonationStatus data={donationStatusDummy} showHeader={true} />
                <MonthlyDonationHeroList />
            </View>
        </ScrollView>
    );
};

export default DonatePage;
