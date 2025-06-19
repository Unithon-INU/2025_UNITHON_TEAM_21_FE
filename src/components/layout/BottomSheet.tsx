import React, {useRef, useMemo, useEffect} from 'react';
import {BottomSheetModal, BottomSheetView, BottomSheetBackdrop} from '@gorhom/bottom-sheet';

interface BottomSheetProps {
    className?: string;
    children: React.ReactNode;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    snapPoints?: (string | number)[];
}

export default function BottomSheet({className = '', children, isVisible, setIsVisible, snapPoints: customSnapPoints}: BottomSheetProps) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => customSnapPoints || ['30%', '30%'], [customSnapPoints]);

    useEffect(() => {
        if (isVisible) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [isVisible]);

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onDismiss={() => setIsVisible(false)}
            enablePanDownToClose={true}
            backdropComponent={props => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />}
            handleIndicatorStyle={{backgroundColor: '#E0E0E0'}}>
            <BottomSheetView className={`p-8 bg-white rounded-t-3xl ${className}`}>{children}</BottomSheetView>
        </BottomSheetModal>
    );
}
