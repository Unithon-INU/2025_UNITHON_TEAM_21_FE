import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import './global.css';
import NavBar from '@/pages/NavBar';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <NavBar />
    </NavigationContainer>
  );
}
