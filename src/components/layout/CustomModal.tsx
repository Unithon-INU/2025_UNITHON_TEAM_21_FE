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
    onAction?: () => void;
    action?: 'delete' | 'edit' | 'add' | 'none' | 'cancel';
}
export default function CustomModal({visible, onClose, children, title, onAction, action = 'none'}: CustomModalProps) {
    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="items-center justify-center flex-1 bg-black/30">
                    <View className="bg-white px-6 py-5 rounded-2xl w-[300px] items-center shadow-lg">
                        <Text className="mb-4 text-lg font-bold text-font-black">{title}</Text>
                        {children}
                        {action !== 'none' && (
                            <View className="flex-row justify-between gap-3 mt-5">
                                <TouchableOpacity className="items-center flex-1 px-4 py-3 rounded-lg bg-bg-gray" onPress={onClose}>
                                    <Text className="font-bold text-font-black">닫기</Text>
                                </TouchableOpacity>
                                {action === 'edit' && (
                                    <TouchableOpacity className="items-center flex-1 px-4 py-3 rounded-lg bg-main-color" onPress={onAction}>
                                        <Text className="font-bold text-white">수정</Text>
                                    </TouchableOpacity>
                                )}
                                {action === 'delete' && (
                                    <TouchableOpacity className="items-center flex-1 px-4 py-3 rounded-lg bg-bg-red" onPress={onAction}>
                                        <Text className="font-bold text-white">삭제</Text>
                                    </TouchableOpacity>
                                )}
                                {action === 'add' && (
                                    <TouchableOpacity className="items-center flex-1 px-4 py-3 rounded-lg bg-main-color" onPress={onAction}>
                                        <Text className="font-bold text-white">추가</Text>
                                    </TouchableOpacity>
                                )}
                                {action === 'cancel' && (
                                    <TouchableOpacity className="items-center flex-1 px-4 py-3 rounded-lg bg-main-color" onPress={onAction}>
                                        <Text className="font-bold text-white">예</Text>
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
