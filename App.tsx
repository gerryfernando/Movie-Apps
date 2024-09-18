import {enableScreens} from 'react-native-screens';

enableScreens();

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Provider from './components/Provider';
import BottomNavigation from './components/BottomNavigation';
import LoginPage from './pages/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContextProvider from './components/ContextProvider';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <NavigationContainer>
      <Provider>
        <ContextProvider>
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
        </ContextProvider>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
