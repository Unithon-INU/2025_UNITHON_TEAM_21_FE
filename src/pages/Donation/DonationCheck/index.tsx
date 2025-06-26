import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import Layout from '@/components/Layout';
import Error from '@/components/Error';
import {useSelector} from 'react-redux';

export default function DonationCheck() {
    const route = useRoute();
    const navigation = useNavigation() as any;
    const {profile} = useSelector((state: any) => state.user);
    const {id, name} = route.params as {id: number; name: string};
    if (!profile) return <Error text="로그인 후 이용해주세요." />;

    return (
        <Layout>
            <HeaderBackButton />
            <Text className="mb-8 text-2xl font-bold text-center text-font-black">기부금 전달 절차 안내</Text>
            <View className="p-5 mb-10 bg-gray-100 rounded-lg">
                <Text className="mb-4 text-lg font-bold text-main-color">기부는 2단계로 진행돼요!</Text>

                <Text className="mb-1 text-base font-bold text-font-black">1단계: 센터 계좌로 직접 송금</Text>
                <Text className="mb-4 text-sm leading-5 text-font-gray">
                    먼저, 후원하실 금액을 센터 계좌로 직접 이체해주세요. {'\n'}계좌 정보는 다음 화면에서 확인하실 수 있습니다.
                </Text>

                <Text className="mb-1 text-base font-bold text-font-black">2단계: 앱에서 기부 내역 전달</Text>
                <Text className="text-sm leading-5 text-font-gray">
                    송금이 완료되면, 이 앱에서 기부 내역을 작성하여 센터에 알려주세요. 센터 담당자가 입금을 확인한 후 기부를 최종 승인합니다.
                </Text>
            </View>

            <Text className="mb-6 text-sm text-center text-font-gray">
                센터에서 승인한 내역은 '내정보 &gt; 기부내역' 메뉴에서 공식적으로 확인하실 수 있습니다.
            </Text>
            <View className="flex flex-col mb-16">
                <TouchableOpacity
                    className="flex flex-row justify-center items-center py-4 mt-6 w-full rounded-xl bg-main-color"
                    onPress={() => navigation.navigate('remittance', {name, id})}>
                    <Text className="text-lg font-semibold text-white">계좌 확인하고 기부 내역 전달하기</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
}
