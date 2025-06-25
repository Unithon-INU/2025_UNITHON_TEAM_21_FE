import {KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title: string;
    /**
     * Defines the action button to display in the modal.
     * - 'delete': Shows a delete button.
     * - 'edit': Shows an edit button.
     * - 'add': Shows an add button.
     * - 'none': No action buttons are displayed.
     */
    action?: 'delete' | 'edit' | 'add' | 'none' | 'cancel' | 'donation' | 'exit';
    onAction?: () => void;
    restricted?: boolean;
}
export default function CustomModal({visible, onClose, children, title, onAction, action = 'none', restricted}: CustomModalProps) {
    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={restricted ? undefined : onClose}>
            <TouchableWithoutFeedback onPress={restricted ? undefined : onClose}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 justify-center items-center bg-black/30">
                    <View className="bg-white px-6 py-5 rounded-2xl w-[300px] items-center shadow-lg">
                        <Text className="mb-4 text-lg font-bold text-font-black">{title}</Text>
                        {children}
                        {action !== 'none' && (
                            <View className="flex-row gap-3 justify-between mt-5">
                                <TouchableOpacity className="flex-1 items-center px-4 py-3 rounded-lg bg-bg-gray" onPress={onClose}>
                                    <Text className="font-bold text-font-black">닫기</Text>
                                </TouchableOpacity>
                                {action === 'edit' && (
                                    <TouchableOpacity className="flex-1 items-center px-4 py-3 rounded-lg bg-main-color" onPress={onAction}>
                                        <Text className="font-bold text-white">수정</Text>
                                    </TouchableOpacity>
                                )}
                                {action === 'delete' && (
                                    <TouchableOpacity className="flex-1 items-center px-4 py-3 rounded-lg bg-bg-red" onPress={onAction}>
                                        <Text className="font-bold text-white">삭제</Text>
                                    </TouchableOpacity>
                                )}
                                {action === 'add' && (
                                    <TouchableOpacity className="flex-1 items-center px-4 py-3 rounded-lg bg-main-color" onPress={onAction}>
                                        <Text className="font-bold text-white">추가</Text>
                                    </TouchableOpacity>
                                )}
                                {action === 'cancel' && (
                                    <TouchableOpacity className="flex-1 items-center px-4 py-3 rounded-lg bg-main-color" onPress={onAction}>
                                        <Text className="font-bold text-white">예</Text>
                                    </TouchableOpacity>
                                )}
                                {action === 'donation' && (
                                    <TouchableOpacity className="flex-1 items-center px-4 py-3 rounded-lg bg-main-color" onPress={onAction}>
                                        <Text className="font-bold text-white">기부</Text>
                                    </TouchableOpacity>
                                )}
                                {action === 'exit' && (
                                    <TouchableOpacity className="flex-1 items-center px-4 py-3 rounded-lg bg-main-color" onPress={onAction}>
                                        <Text className="font-bold text-white">종료</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
