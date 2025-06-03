import {SafeAreaView, StatusBar, StyleSheet, Platform} from 'react-native';
import './global.css';
import Pages from '@/pages/Page';

import {Provider} from 'react-redux';
import {store} from '@/store/store';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="white" animated />
                <Pages />
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});
