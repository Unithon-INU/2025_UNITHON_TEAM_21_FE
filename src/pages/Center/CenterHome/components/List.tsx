import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {ColWrapper} from '@/components/layout/ContentWrapper';

import CustomModal from '@/components/layout/CustomModal';

interface DonationItem {
    id: string;
    name: string;
    current: number;
    required: number;
}
const initialDonationItems: DonationItem[] = [
    {id: '1', name: '두루마리 휴지', current: 30, required: 50},
    {id: '2', name: '스케치북', current: 8, required: 20},
    {id: '3', name: '유아용 기저귀 (L)', current: 15, required: 40},
];

interface EditModalProps {
    visible: boolean;
    item: DonationItem | null;
    onClose: () => void;
    onSave: (itemId: string, newCurrentValue: number) => void;
}
function EditDonationModal({visible, item, onClose, onSave}: EditModalProps) {
    const [currentValue, setCurrentValue] = useState<string>('');
    useEffect(() => {
        if (item) setCurrentValue(String(item.required));
    }, [item]);

    const handleSave = () => {
        const newValue = parseInt(currentValue, 10);
        if (item && !isNaN(newValue)) {
            onSave(item.id, newValue);
        }
    };

    if (!item) return null;
    return (
        <CustomModal visible={visible} onClose={onClose} title="기부 물품 수정" onAction={handleSave} action="edit">
            <Text className="mb-2 text-font-gray">{item.name}</Text>
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
    item: DonationItem | null;
    onClose: () => void;
    onConfirm: () => void;
}
function DeleteConfirmModal({visible, item, onClose, onConfirm}: DeleteModalProps) {
    if (!item) return null;
    return (
        <CustomModal visible={visible} onClose={onClose} title="삭제 확인" onAction={onConfirm} action="delete">
            <Text className="mb-4 text-center text-font-gray">{`'${item.name}' 항목을 정말 삭제하시겠습니까?`}</Text>
        </CustomModal>
    );
}
function AddDonationModal({visible, onClose, onSave}: {visible: boolean; onClose: () => void; onSave: (name: string, required: number) => void}) {
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
    item: DonationItem;
    isLast: boolean;
    onEditPress: (item: DonationItem) => void;
    onDeletePress: (item: DonationItem) => void;
}
function DonationItemCard({item, isLast, onEditPress, onDeletePress}: DonationItemCardProps) {
    const progress = item.required > 0 ? Math.floor((item.current / item.required) * 100) : 0;
    const containerClassName = `p-4 ${isLast ? '' : 'border-b border-main-gray'}`;
    return (
        <View className={containerClassName}>
            <View className="flex-row justify-between mb-2">
                <Text className="text-base font-semibold text-font-black">{item.name}</Text>
                <Text className="text-base font-semibold text-main-color">{progress}%</Text>
            </View>
            <View className="h-1.5 overflow-hidden rounded-full bg-bg-gray">
                <View className="h-full bg-main-color" style={[{width: `${progress}%`}]} />
            </View>
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-font-gray">
                    현재 {item.current}개 / 필요 {item.required}개
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

export default function List() {
    const [items, setItems] = useState<DonationItem[]>(initialDonationItems);
    const [selectedItem, setSelectedItem] = useState<DonationItem | null>(null);

    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [isAddModalVisible, setAddModalVisible] = useState<boolean>(false);

    const handleEditPress = (item: DonationItem) => {
        setSelectedItem(item);
        setEditModalVisible(true);
    };

    const handleDeletePress = (item: DonationItem) => {
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

    const handleSaveItem = (itemId: string, newCurrentValue: number) => {
        setItems(prev => prev.map(item => (item.id === itemId ? {...item, required: newCurrentValue} : item)));
        handleCloseModals();
    };

    const handleConfirmDelete = () => {
        if (!selectedItem) return;
        setItems(prev => prev.filter(item => item.id !== selectedItem.id));
        handleCloseModals();
    };

    const handleAddItem = (name: string, required: number) => {
        const newItem: DonationItem = {
            id: Date.now().toString(),
            name,
            required,
            current: 0,
        };
        setItems(prev => [...prev, newItem]);
        handleCloseModals();
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

            <EditDonationModal visible={isEditModalVisible} item={selectedItem} onClose={handleCloseModals} onSave={handleSaveItem} />
            <DeleteConfirmModal visible={isDeleteModalVisible} item={selectedItem} onClose={handleCloseModals} onConfirm={handleConfirmDelete} />
            <AddDonationModal visible={isAddModalVisible} onClose={handleCloseModals} onSave={handleAddItem} />
        </ColWrapper>
    );
}
