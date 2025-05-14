import {Image, View} from 'react-native';
import SignupButton from './components/SignupButton';
import Layout from '../Layout';

import DonationComponents from './components/DonantionItem';
import CenterItem from './components/CenterItem';
import RecommendActivity from './components/RecommendActivity';

export default function Home() {
    return (
        <Layout>
            <View className="flex flex-row items-center justify-between">
                <Image className="w-[120px] h-[46px]" source={require('@/assets/logo.png')} />
                <SignupButton />
            </View>
            <CenterItem />
            <DonationComponents />
            <RecommendActivity />
        </Layout>
    );
}
