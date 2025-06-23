import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

import AnimatedNumber from '@/components/animation/AnimatedNumber';
import CustomModal from '@/components/layout/CustomModal';
import {CenterTotalDonation} from '@/types/DonationType';

interface EditTargetAmountModalProps {
    visible: boolean;
    initialValue: number;
    onClose: () => void;
    onSave: (newAmount: number) => void;
}
function EditTargetAmountModal({visible, initialValue, onClose, onSave}: EditTargetAmountModalProps) {
    const [amount, setAmount] = useState<string>('');

    useEffect(() => {
        setAmount(String(initialValue));
    }, [visible, initialValue]);

    const handleNumberChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setAmount(numericValue);
    };

    const handleSave = () => {
        if (amount) {
            const newAmount = parseInt(amount, 10);
            if (!isNaN(newAmount)) {
                onSave(newAmount);
            }
        }
    };

    return (
        <CustomModal visible={visible} onClose={onClose} title="목표 기부금 수정" action="edit" onAction={handleSave}>
            <TextInput
                className="px-4 py-3 w-full text-base text-center text-black rounded-xl border border-gray-300"
                keyboardType="number-pad"
                value={amount}
                onChangeText={handleNumberChange}
                autoFocus
            />
        </CustomModal>
    );
}

export default function DonationStatus({total}: {total: CenterTotalDonation}) {
    const [targetAmount, setTargetAmount] = useState<number>(100000);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const progressPercent = targetAmount > 0 ? Math.floor((total.totalAmount / targetAmount) * 100) : 0;

    const handleSaveTargetAmount = (newAmount: number) => {
        setTargetAmount(newAmount);
        setModalVisible(false);
    };

    return (
        <View className="flex flex-col gap-3 py-3">
            <View className="flex flex-row justify-between items-center">
                <Text className="text-xl font-semibold text-font-black">기부 현황</Text>
            </View>

            <View className="flex flex-col gap-3">
                <View className="flex flex-col gap-1">
                    <Text className="font-semibold text-font-gray">모인금액</Text>
                    <View className="flex flex-row justify-between">
                        <Text className="text-base font-semibold text-font-black">{total.totalAmount.toLocaleString()}원</Text>
                        <Text className="text-base font-semibold text-main-color">{progressPercent}%</Text>
                    </View>
                    <View className="w-full h-1.5 overflow-hidden rounded-full bg-bg-gray">
                        <View className="h-full bg-main-color" style={{width: `${Math.min(progressPercent, 100)}%`}} />
                    </View>
                    <Text className="text-base font-semibold text-font-black">
                        목표 기부금 : <AnimatedNumber className="text-main-color" value={targetAmount} duration={1500} />
                        <Text className="text-main-color">원</Text>
                    </Text>
                </View>
            </View>

            <TouchableOpacity className="px-3 py-2 rounded-lg bg-main-color" onPress={() => setModalVisible(true)}>
                <Text className="text-base font-semibold text-center text-white">목표 기부금 수정하기</Text>
            </TouchableOpacity>

            <EditTargetAmountModal
                visible={isModalVisible}
                initialValue={targetAmount}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveTargetAmount}
            />
        </View>
    );
}
