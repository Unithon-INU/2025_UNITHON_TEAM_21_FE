import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import CustomModal from '@/components/layout/CustomModal';

const initialDonationItems = [
    {id: '1', name: '두루마리 휴지', current: 30, required: 50},
    {id: '2', name: '스케치북', current: 8, required: 20},
    {id: '3', name: '유아용 기저귀 (L)', current: 15, required: 40},
];

interface DonationItemType {
    id: string;
    name: string;
    current: number;
    required: number;
}

interface DonationItemCardProps {
    item: DonationItemType;
    isLast: boolean;
    onDonatePress: (item: DonationItemType) => void;
}

function DonationItemCard({item, isLast, onDonatePress}: DonationItemCardProps) {
    const progress = item.required > 0 ? (item.current / item.required) * 100 : 0;
    const containerClassName = `p-2 ${isLast ? '' : 'border-b-2 border-bg-gray'}`;

    return (
        <View className={containerClassName}>
            <View className="flex-row justify-between mb-2">
                <Text className="text-base font-semibold text-font-black">{item.name}</Text>
                <Text className="text-base font-semibold text-main-color">{progress}%</Text>
            </View>
            <View className="overflow-hidden h-1 rounded-full bg-bg-gray">
                <View className="h-full bg-main-color" style={[{width: `${progress}%`}]} />
            </View>
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-font-gray">
                    현재 {item.current}개 / 필요 {item.required}개
                </Text>
                <TouchableOpacity className="px-3 py-1.5 rounded-full bg-main-color" onPress={() => onDonatePress(item)}>
                    <Text className="font-bold text-white">기부하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function List() {
    const [donationItems, setDonationItems] = useState(initialDonationItems);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DonationItemType | null>(null);
    const [quantity, setQuantity] = useState('');

    const handleOpenModal = (item: DonationItemType) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
        setQuantity('');
    };

    const handleDonate = () => {
        if (!selectedItem || !quantity || Number(quantity) <= 0) {
            Alert.alert('알림', '올바른 수량을 입력해주세요.');
            return;
        }

        const donationAmount = Number(quantity);
        Alert.alert('기부 확인', `${selectedItem.name} ${donationAmount}개를 기부하시겠습니까?`, [
            {text: '취소', style: 'cancel'},
            {
                text: '확인',
                onPress: () => {
                    console.log(`${selectedItem.name} ${donationAmount}개 기부 완료!`);
                    const newItems = donationItems.map(item => (item.id === selectedItem.id ? {...item, current: item.current + donationAmount} : item));
                    setDonationItems(newItems);
                    handleCloseModal();
                },
            },
        ]);
    };

    return (
        <ColWrapper title="필요 기부물품">
            {donationItems.length > 0 ? (
                donationItems.map((item, index) => (
                    <DonationItemCard key={item.id} item={item} isLast={index === donationItems.length - 1} onDonatePress={handleOpenModal} />
                ))
            ) : (
                <Text className="text-base font-semibold text-font-gray">센터에서 아직 필요한 기부품목이 없어요!</Text>
            )}

            {selectedItem && (
                <CustomModal
                    visible={modalVisible}
                    onClose={handleCloseModal}
                    title={`${selectedItem.name} 기부하기`}
                    action="donation"
                    onAction={handleDonate}>
                    <View className="items-center w-full">
                        <Text className="mb-3 text-font-gray">기부할 수량을 입력해주세요.</Text>
                        <TextInput
                            className="p-3 w-full text-base text-center rounded-lg border border-bg-gray"
                            placeholder="예: 5"
                            keyboardType="number-pad"
                            value={quantity}
                            onChangeText={setQuantity}
                            autoFocus
                        />
                    </View>
                </CustomModal>
            )}
        </ColWrapper>
    );
}
