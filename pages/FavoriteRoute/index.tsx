import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FavoritePage from '../FavoritePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button} from 'react-native-paper';
import DetailMovie from '../HomePage/DetailMovie';

const FavoriteTab = createBottomTabNavigator<any>();

function FavoriteRoute(): React.JSX.Element {
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.navigate('Favorite');
  }, [navigation]);

  const BackButton = (
    <Button
      key="backButton"
      onPress={() => navigation.navigate('Favorite')}
      icon={'arrow-left'}>
      {' '}
    </Button>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FavoriteTab.Navigator
        screenOptions={{
          tabBarStyle: {display: 'none'},
        }}
        initialRouteName={'Favorite'}>
        <FavoriteTab.Screen
          name="Favorite"
          component={FavoritePage}
          options={{headerShown: false}}
        />
        <FavoriteTab.Screen
          name="Detail"
          component={DetailMovie}
          // eslint-disable-next-line react/no-unstable-nested-components
          options={{headerLeft: () => BackButton}}
        />
      </FavoriteTab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavoriteRoute;
