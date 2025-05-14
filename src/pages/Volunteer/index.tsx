import {Text, View} from 'react-native';
import Layout from '../Layout';
import SearchBar from './components/SearchBar';
import RecommendButtons from './components/RecommendButtons';
import RecommendActivity from './components/RecommendActivity';

export default function index() {
    return (
        <Layout>
            <View className="flex flex-col justify-between py-4">
                <Text className="text-2xl font-bold text-font-black">지역봉사</Text>
            </View>
            <SearchBar />
            <RecommendButtons />
            <RecommendActivity />
        </Layout>
    );
}
