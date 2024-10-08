import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomePage from '../HomePage';
import DetailMovie from '../HomePage/DetailMovie';
import {useNavigation} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Detail: {id: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeRouter(): React.JSX.Element {
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Detail" component={DetailMovie} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeRouter;
