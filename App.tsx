import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaView, StatusBar, StyleSheet, Platform} from 'react-native';
import NavBar from '@/pages/NavBar';
import LoadingScreen from '@/loading/Loadscreen';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
};

export default function App() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="white" animated />
            <NavigationContainer theme={MyTheme}>
                <LoadingScreen />
                <NavBar />
            </NavigationContainer>
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
