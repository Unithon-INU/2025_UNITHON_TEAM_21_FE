import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {ColWrapper} from '@/components/layout/ContentWrapper';
import {DonationInquiry} from '@/types/DonationType';

import CustomModal from '@/components/layout/CustomModal';
import {useConfirmDonation} from '@/hook/api/useDonation';
import Loading from '@/components/Loading';

const formatDonationDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
};

interface ModalProps {
    visible: boolean;
    item: DonationInquiry | null;
    onClose: () => void;
    onAction: () => void;
    actionType: 'cancel' | 'delete' | null;
    loading: boolean;
}
function ConfirmationModal({visible, item, actionType, onClose, onAction, loading}: ModalProps) {
    if (!visible || !item || !actionType) return null;

    const isApprove = actionType === 'cancel';
    const title = isApprove ? '기부 승인 확인' : '기부 거부 확인';
    const message = `${item.donorNickName}님의 기부를 정말로 ${isApprove ? '승인' : '거부'}하시겠습니까?`;
    if (loading)
        <CustomModal visible={visible} onClose={onClose} title={title} action="none">
            <Loading />
        </CustomModal>;
    return (
        <CustomModal visible={visible} onClose={onClose} title={title} onAction={onAction} action={actionType}>
            <Text className="text-center text-font-gray">{message}</Text>
        </CustomModal>
    );
}

export default function Waiting({items, onRefresh}: {items: DonationInquiry[]; onRefresh: () => void}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DonationInquiry | null>(null);
    const [actionType, setActionType] = useState<'cancel' | 'delete' | null>(null);
    const [loading, setLoading] = useState(false);
    const pendingItems = items.filter(item => item.status === 'PENDING');
    const {confirm} = useConfirmDonation();

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
        setActionType(null);
    };

    const handlePressApprove = (item: DonationInquiry) => {
        setSelectedItem(item);
        setActionType('cancel');
        setModalVisible(true);
    };

    const handlePressReject = (item: DonationInquiry) => {
        setSelectedItem(item);
        setActionType('delete');
        setModalVisible(true);
    };

    const handleConfirmAction = async () => {
        if (!selectedItem || !actionType || loading) return;
        setLoading(true);
        try {
            await confirm(selectedItem.donationId);
            Alert.alert('성공', `${selectedItem.donorNickName}님의 기부를 승인했습니다.`);
        } catch (error) {
            Alert.alert('오류', '처리 중 문제가 발생했습니다.');
        } finally {
            setLoading(false);
            handleCloseModal();
            onRefresh();
        }
    };

    if (!pendingItems || pendingItems.length === 0) {
        return (
            <ColWrapper title="승인 대기중인 기부목록">
                <View className="mb-10">
                    <Text className="text-base font-semibold text-font-gray">{'아직 기부하신 분이 안 계시네요...\n저희가 열심히 찾고있어요!'}</Text>
                </View>
            </ColWrapper>
        );
    }

    return (
        <ColWrapper title="승인 대기중인 기부목록">
            {pendingItems.map((item, idx) => (
                <View className={`py-4 bg-white ${idx === items.length - 1 ? '' : 'border-b border-main-gray'}`} key={item.donationId}>
                    <View className="flex-row items-center">
                        <View className="flex-1">
                            <Text className="text-base font-bold text-font-black">
                                {item.donorNickName} 님 | <Text className="text-main-color">승인 대기중</Text>
                            </Text>
                            <Text className="mt-1 text-base text-font-black">
                                기부금액 : <Text className="font-semibold text-main-color"> {item.amount.toLocaleString()}원</Text>
                            </Text>
                            <Text className="mt-1 text-xs text-font-gray">기부일 : {formatDonationDate(item.donatedAt)}</Text>
                        </View>
                    </View>
                    <View className="flex-row gap-3 mt-4">
                        <TouchableOpacity className="flex-1 py-2.5 bg-gray-200 rounded-lg items-center justify-center" onPress={() => handlePressReject(item)}>
                            <Text className="font-bold text-font-black">거부</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 py-2.5 bg-main-color rounded-lg items-center justify-center"
                            onPress={() => handlePressApprove(item)}>
                            <Text className="font-bold text-white">승인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            <ConfirmationModal
                visible={isModalVisible}
                item={selectedItem}
                actionType={actionType}
                onClose={handleCloseModal}
                onAction={handleConfirmAction}
                loading={loading}
            />
        </ColWrapper>
    );
}
