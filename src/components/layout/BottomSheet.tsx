import Modal from 'react-native-modal';
import {View} from 'react-native';

interface BottomSheetProps {
    children: React.ReactNode;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}
export default function BottomSheet({children, isVisible, setIsVisible}: BottomSheetProps) {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0.7}
            style={{
                margin: 0,
                justifyContent: 'flex-end',
            }}>
            <View className="p-8 bg-white rounded-t-3xl">{children}</View>
        </Modal>
    );
}
