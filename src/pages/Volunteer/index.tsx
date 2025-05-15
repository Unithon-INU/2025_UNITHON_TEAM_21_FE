import React from 'react';
import {Text, View} from 'react-native';
import Layout from '../Layout';
import SearchBar from './components/SearchBar';
import RecommendButtons from './components/RecommendButtons';
import RecommendActivity from './components/RecommendActivity';
import ChatbotIcon from './components/ChatbotIcon';

export default function index() {
    return (
        <>
            <Layout>
                <View className="flex flex-col justify-between py-4">
                    <Text className="text-xl font-bold text-font-black">지역봉사</Text>
                </View>
                <SearchBar />
                <RecommendButtons />
                <RecommendActivity />
            </Layout>
            <ChatbotIcon />
        </>
    );
}
