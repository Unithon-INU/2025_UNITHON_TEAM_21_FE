import {BackHandler, Image, Text, View} from 'react-native';

import {useCenter} from '@/hook/api/useCenter';
import {useVolunteerData} from '@/hook/api/useVolunteerData';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import {useCallback, useEffect, useState} from 'react';
import {fetchLocation} from '@/store/slice/locationSlice';

import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import SignupButton from './components/SignupButton';
import DonationComponents from './components/DonantionItem';
import CenterItem from './components/CenterItem';
import RecommendActivity from './components/RecommendVolunteer';
import TotalDonationAmount from './components/TotalDonationAmount';
import MonthlyDonationHeroList from './components/MonthlyDonationHeroList';
import FollowCenter from './components/FollowCenter';
import LikeVolunteer from './components/LikeVolunteer';
import {useFocusEffect} from '@react-navigation/native';
import CustomModal from '@/components/layout/CustomModal';

export default function Home() {
    const [isExitModalVisible, setExitModalVisible] = useState(false);

    const {centerData, loading} = useCenter(180);
    const {items: recommendItems, loading: recommendLoading} = useVolunteerData('0400');
    const locationLoading = useSelector((state: RootState) => state.location.loading);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchLocation());
    }, [dispatch]);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                setExitModalVisible(true);
                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, []),
    );

    if (loading || recommendLoading || locationLoading === 'pending') {
        return <Loading />;
    }
    return (
        <Layout>
            <View className="flex flex-row justify-between items-center">
                <Image className="w-[100px] h-[36px]" source={require('@/assets/logo.png')} />
                <SignupButton />
            </View>
            <TotalDonationAmount />
            <FollowCenter />
            <CenterItem items={centerData} />
            <DonationComponents items={centerData} />
            <RecommendActivity items={recommendItems} />
            <LikeVolunteer />
            <MonthlyDonationHeroList />
            <CustomModal
                visible={isExitModalVisible}
                title="앱 종료"
                action="exit"
                onClose={() => setExitModalVisible(false)}
                onAction={() => BackHandler.exitApp()}>
                <Text className="text-center text-font-gray">앱을 정말로 종료하시겠습니까?</Text>
            </CustomModal>
        </Layout>
    );
}
