import React from 'react';
import {Text, View} from 'react-native';

import {useVolunteerData, useVolunteerNearBy} from '@/hook/api/useVolunteerData';

import SearchBar from './components/SearchBar';
import RecommendButtons from './components/RecommendButtons';
import RecommendActivity from '../Home/components/RecommendVolunteer';
import ChatbotIcon from './components/ChatbotIcon';
import LikeVolunteer from '../Home/components/LikeVolunteer';
import NearbyVolunteerMap from './components/NearbyVolunteerMap';
import NearbyVolunteerList from './components/NearbyVolunteerList';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';

export default function Index() {
    const {items: recommendItems, loading: recommedLoading} = useVolunteerData('0400');
    const {items: nearByItems, loading: nearByLoading} = useVolunteerNearBy();
    if (recommedLoading || nearByLoading) return <Loading />;
    console.log(nearByItems);
    return (
        <>
            <Layout>
                <View className="flex flex-col justify-between py-4">
                    <Text className="text-xl font-bold text-font-black">지역봉사</Text>
                </View>
                <SearchBar />
                <RecommendButtons />
                <NearbyVolunteerMap items={nearByItems} />
                <RecommendActivity items={recommendItems} />
                <NearbyVolunteerList items={nearByItems} />
                <LikeVolunteer />
            </Layout>
            <ChatbotIcon />
        </>
    );
}
