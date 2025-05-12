import {Image, View} from 'react-native';
import SignupButton from './components/SignupButton';
import Layout from '../Layout';

import DonationComponents from './components/DonantionItem';
import CenterItem from './components/CenterItem';
import {RowWrapper, ColWrapper} from './components/ContentWrapper';
import RecommendActivity from './components/RecommendActivity';

export default function Home() {
    return (
        <Layout>
            <View className="flex flex-row items-center justify-between">
                <Image className="w-[120px] h-[46px]" source={require('@/assets/logo.png')} />
                <SignupButton />
            </View>
            <RowWrapper title="인천지역 아동센터">
                <CenterItem />
                <CenterItem />
                <CenterItem />
            </RowWrapper>
            <ColWrapper title="실시간 기부현황">
                <DonationComponents />
                <DonationComponents />
            </ColWrapper>
            <ColWrapper title="추천 봉사활동">
                <RecommendActivity />
                <RecommendActivity />
                <RecommendActivity />
            </ColWrapper>
        </Layout>
    );
}
