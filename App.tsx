import {SafeAreaView, StatusBar, StyleSheet, Platform} from 'react-native';
import './global.css';
import Pages from '@/pages/Page';

export default function App() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="white" animated />
            <Pages />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});
