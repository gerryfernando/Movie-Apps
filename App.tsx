import {enableScreens} from 'react-native-screens';

enableScreens();

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Provider from './components/Provider';
import BottomNavigation from './components/BottomNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from './pages/Login';
import {Text} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  useEffect(() => {
    const getUsername = async () => {
      const username = await AsyncStorage.getItem('username');
      setIsLogin(!!username);
    };
    getUsername();
  }, []);

  if (isLogin === null) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <NavigationContainer>
      <Provider>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Main"
              component={BottomNavigation}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
    // <Provider>
    //   <SafeAreaView style={styles.container}>
    //     {isLogin ? <BottomNavigation /> : <LoginPage />}
    //   </SafeAreaView>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
