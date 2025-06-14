import {Image, View} from 'react-native';

import {useUserRestore} from '@/hook/api/useKakaoInfo';
import {useCenter} from '@/hook/api/useCenter';

import Layout from '../../components/Layout';
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
    if (loading) {
        return <Loading />;
    }
    return (
        <Layout>
            <View className="flex flex-row items-center justify-between">
                <Image className="w-[120px] h-[46px]" source={require('@/assets/logo.png')} />
                <SignupButton />
            </View>
            <TotalDonationAmount />
            <FollowCenter />
            <DonationComponents />
            <CenterItem data={centerData} />
            <LikeVolunteer />
            <RecommendActivity />
            <MonthlyDonationHeroList />
        </Layout>
    );
}
