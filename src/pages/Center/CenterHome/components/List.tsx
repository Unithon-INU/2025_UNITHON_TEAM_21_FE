import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {ColWrapper} from '@/components/layout/ContentWrapper';

import {ItemDonationType} from '@/types/ItemDonationType';
import {useEditItemDonation} from '@/hook/api/useItemDonation';

import CustomModal from '@/components/layout/CustomModal';

interface EditModalProps {
    visible: boolean;
    item: ItemDonationType | null;
    onClose: () => void;
    onSave: (newCurrentValue: number) => void;
}
function EditDonationModal({visible, item, onClose, onSave}: EditModalProps) {
    const [currentValue, setCurrentValue] = useState<string>('');
    useEffect(() => {
        if (item) setCurrentValue(String(item.requiredQuantity));
    }, [item]);

    const handleSave = () => {
        const newValue = parseInt(currentValue, 10);
        if (item && !isNaN(newValue)) {
            onSave(newValue);
        }
    };

    if (!item) return null;
    return (
        <CustomModal visible={visible} onClose={onClose} title="기부 물품 수정" onAction={handleSave} action="edit">
            <Text className="mb-2 text-font-gray">{item.itemName}</Text>
            <TextInput
                className="px-4 py-3 w-full text-base text-center text-black rounded-xl border border-gray-300"
                keyboardType="number-pad"
                value={currentValue}
                onChangeText={setCurrentValue}
                autoFocus
            />
        </CustomModal>
    );
}
interface DeleteModalProps {
    visible: boolean;
    item: ItemDonationType | null;
    onClose: () => void;
    onConfirm: () => void;
}
function DeleteConfirmModal({visible, item, onClose, onConfirm}: DeleteModalProps) {
    if (!item) return null;
    return (
        <CustomModal visible={visible} onClose={onClose} title="삭제 확인" onAction={onConfirm} action="delete">
            <Text className="mb-4 text-center text-font-gray">{`'${item.itemName}' 항목을 정말 삭제하시겠습니까?`}</Text>
        </CustomModal>
    );
}
interface AddModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (name: string, required: number) => void;
}
function AddDonationModal({visible, onClose, onSave}: AddModalProps) {
    const [name, setName] = useState('');
    const [required, setRequired] = useState('');

    const handleSave = () => {
        const requiredValue = parseInt(required, 10);
        if (name.trim() && !isNaN(requiredValue) && requiredValue > 0) {
            onSave(name.trim(), requiredValue);
            setName('');
            setRequired('');
        }
    };

    return (
        <CustomModal visible={visible} onClose={onClose} title="기부 물품 추가" onAction={handleSave} action="add">
            <TextInput
                className="px-4 py-3 mb-3 w-full text-base text-black rounded-xl border border-gray-300"
                placeholder="품목 이름"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                className="px-4 py-3 w-full text-base text-black rounded-xl border border-gray-300"
                placeholder="필요 수량"
                keyboardType="number-pad"
                value={required}
                onChangeText={setRequired}
            />
        </CustomModal>
    );
}

interface DonationItemCardProps {
    item: ItemDonationType;
    isLast: boolean;
    onEditPress: (item: ItemDonationType) => void;
    onDeletePress: (item: ItemDonationType) => void;
}
function DonationItemCard({item, isLast, onEditPress, onDeletePress}: DonationItemCardProps) {
    const progress = item.requiredQuantity > 0 ? Math.floor((item.currentQuantity / item.requiredQuantity) * 100) : 0;
    const containerClassName = `p-4 ${isLast ? '' : 'border-b border-main-gray'}`;
    return (
        <View className={containerClassName}>
            <View className="flex-row justify-between mb-2">
                <Text className="text-base font-semibold text-font-black">{item.itemName}</Text>
                <Text className="text-base font-semibold text-main-color">{progress}%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded-full bg-bg-gray">
                <View className="h-full bg-main-color" style={[{width: `${progress}%`}]} />
            </View>
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-font-gray">
                    현재 {item.currentQuantity}개 / 필요 {item.requiredQuantity}개
                </Text>
                <View className="flex-row gap-2">
                    <TouchableOpacity className="px-3 py-1.5 rounded-full bg-main-color" onPress={() => onEditPress(item)}>
                        <Text className="font-bold text-white">수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-3 py-1.5 rounded-full bg-bg-red" onPress={() => onDeletePress(item)}>
                        <Text className="font-bold text-white">삭제</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default function List({items, centerId, onRefresh}: {items: ItemDonationType[]; centerId: number; onRefresh: () => void}) {
    const [selectedItem, setSelectedItem] = useState<ItemDonationType | null>(null);

    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);

    const {addItem, editItem, deleteItem} = useEditItemDonation();

    const handleEditPress = (item: ItemDonationType) => {
        setSelectedItem(item);
        setEditModalVisible(true);
    };

    const handleDeletePress = (item: ItemDonationType) => {
        setSelectedItem(item);
        setDeleteModalVisible(true);
    };

    const handleAddPress = () => {
        setAddModalVisible(true);
    };

    const handleCloseModals = () => {
        setEditModalVisible(false);
        setDeleteModalVisible(false);
        setAddModalVisible(false);
        setSelectedItem(null);
    };

    const handleEdit = async (newrequiredQuantity: number) => {
        if (!selectedItem) return;
        await editItem(centerId, selectedItem.itemName, newrequiredQuantity, selectedItem.currentQuantity);
        handleCloseModals();
        onRefresh();
    };

    const handleDelete = async () => {
        if (!selectedItem) return;
        await deleteItem(selectedItem.id);
        handleCloseModals();
        onRefresh();
    };

    const handleAdd = async (name: string, required: number) => {
        await addItem(centerId, name, required);
        handleCloseModals();
        onRefresh();
    };

    return (
        <ColWrapper title="기부 물품">
            {items.length > 0 ? (
                items.map((item, index) => (
                    <DonationItemCard
                        key={item.id}
                        item={item}
                        isLast={index === items.length - 1}
                        onEditPress={handleEditPress}
                        onDeletePress={handleDeletePress}
                    />
                ))
            ) : (
                <Text className="text-base font-semibold text-center text-font-gray">아직 등록하신 기부품목이 없네요!</Text>
            )}
            <TouchableOpacity
                className="flex-row justify-center items-center p-4 mt-4 bg-gray-50 rounded-lg border-2 border-gray-300 border-dotted"
                onPress={handleAddPress}>
                <Image className="mr-2 w-4 h-4" source={require('@/assets/add.png')} />
                <Text className="font-bold text-font-gray">기부 물품 추가하기</Text>
            </TouchableOpacity>

            <EditDonationModal visible={isEditModalVisible} item={selectedItem} onClose={handleCloseModals} onSave={handleEdit} />
            <DeleteConfirmModal visible={isDeleteModalVisible} item={selectedItem} onClose={handleCloseModals} onConfirm={handleDelete} />
            <AddDonationModal visible={isAddModalVisible} onClose={handleCloseModals} onSave={handleAdd} />
        </ColWrapper>
    );
}
