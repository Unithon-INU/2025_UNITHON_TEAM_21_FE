import {Image, View} from 'react-native';

import {useUserRestore} from '@/hook/api/useKakaoInfo';
import {useCenter} from '@/hook/api/useCenter';
import {useVolunteerData} from '@/hook/api/useVolunteerData';

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

export default function Home() {
    useUserRestore();

    const {centerData, loading} = useCenter();
    const {volunteerData: recommendItems, loading: recommendLoading} = useVolunteerData('0400');

    if (loading || recommendLoading) {
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
            <DonationComponents items={centerData} />
            <CenterItem items={centerData} />
            <RecommendActivity items={recommendItems} />
            <LikeVolunteer />
            <MonthlyDonationHeroList />
        </Layout>
    );
}
