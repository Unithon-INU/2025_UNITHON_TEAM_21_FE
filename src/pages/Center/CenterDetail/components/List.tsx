import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';

import {ColWrapper} from '@/components/layout/ContentWrapper';
import CustomModal from '@/components/layout/CustomModal'; // 위에서 만든 CustomModal을 import 합니다.
import {ItemDonationType} from '@/types/ItemDonationType';
import {useEditItemDonation} from '@/hook/api/useItemDonation';

// =================================================================
// DonationItemCard Component
// =================================================================
interface DonationItemCardProps {
    item: ItemDonationType;
    isLast: boolean;
    onDonatePress: (item: ItemDonationType) => void;
}

function DonationItemCard({item, isLast, onDonatePress}: DonationItemCardProps) {
    const progress = item.requiredQuantity > 0 ? Math.floor((item.currentQuantity / item.requiredQuantity) * 100) : 0;
    const containerClassName = `p-2 ${isLast ? '' : 'border-b-2 border-bg-gray'}`;

    return (
        <View className={containerClassName}>
            <View className="flex-row justify-between mb-2">
                <Text className="text-base font-semibold text-font-black">{item.itemName}</Text>
                <Text className="text-base font-semibold text-main-color">{progress > 100 ? '100+' : progress}%</Text>
            </View>
            <View className="overflow-hidden h-1 rounded-full bg-bg-gray">
                <View className="h-full bg-main-color" style={[{width: `${Math.min(progress, 100)}%`}]} />
            </View>
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-font-gray">
                    현재 {item.currentQuantity}개 / 필요 {item.requiredQuantity}개
                </Text>
                <TouchableOpacity className="px-3 py-1.5 rounded-full bg-main-color" onPress={() => onDonatePress(item)}>
                    <Text className="font-bold text-white">기부하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function List({items, onRefresh}: {items: ItemDonationType[]; onRefresh: () => void}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ItemDonationType | null>(null);
    const [quantity, setQuantity] = useState('');
    const {editItem} = useEditItemDonation();

    const handleOpenModal = (item: ItemDonationType) => {
        if (item.currentQuantity >= item.requiredQuantity) {
            Alert.alert('알림', '이미 목표 수량을 모두 달성한 물품입니다.');
            return;
        }
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
        setQuantity('');
    };

    const handleDonate = () => {
        if (!selectedItem) return;

        const donationAmount = Number(quantity);
        const neededQuantity = selectedItem.requiredQuantity - selectedItem.currentQuantity;

        if (!quantity || donationAmount <= 0) {
            Alert.alert('알림', '기부할 수량을 정확히 입력해주세요.');
            return;
        }

        if (donationAmount > neededQuantity) {
            Alert.alert('알림', `최대 ${neededQuantity}개까지 기부할 수 있습니다.`);
            return;
        }

        Alert.alert('기부 확인', `${selectedItem.itemName} ${donationAmount}개를 기부하시겠습니까?`, [
            {text: '취소', style: 'cancel'},
            {
                text: '확인',
                onPress: async () => {
                    const newTotalQuantity = selectedItem.currentQuantity + donationAmount;
                    await editItem(selectedItem.id, selectedItem.itemName, selectedItem.requiredQuantity, newTotalQuantity);
                    Alert.alert('감사합니다!', '기부가 성공적으로 완료되었습니다.');
                    handleCloseModal();
                    onRefresh();
                },
            },
        ]);
    };

    return (
        <ColWrapper title="필요 기부물품">
            {items.length > 0 ? (
                items.map((item, index) => <DonationItemCard key={item.id} item={item} isLast={index === items.length - 1} onDonatePress={handleOpenModal} />)
            ) : (
                <Text className="text-base font-semibold text-font-gray">센터에서 아직 필요한 기부품목이 없어요!</Text>
            )}

            {selectedItem && (
                <CustomModal
                    visible={modalVisible}
                    onClose={handleCloseModal}
                    title={`${selectedItem.itemName} 기부하기`}
                    action="donation"
                    onAction={handleDonate}>
                    <View className="items-center w-full">
                        <Text className="mb-3 text-font-gray">기부할 수량을 입력해주세요.</Text>
                        <TextInput
                            className="p-3 w-full text-base text-center rounded-lg border border-bg-gray"
                            // ✨ 개선 사항: placeholder에 최대 기부 가능 수량을 동적으로 표시
                            placeholder={`예: 5 (최대 ${selectedItem.requiredQuantity - selectedItem.currentQuantity}개)`}
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
