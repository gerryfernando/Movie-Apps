import * as React from 'react';
import {BottomNavigation as BNavigation} from 'react-native-paper';
import FavoritePage from '../../pages/FavoritePage';
import ProfilPage from '../../pages/ProfilPage';
import HomeRouter from '../../pages/HomeRoute';
import {useNavigation} from '@react-navigation/native';

const HomeRoute = () => <HomeRouter />;

const FavoriteRoute = () => <FavoritePage />;

const ProfilRoute = () => <ProfilPage />;

const BottomNavigation = () => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'favorite',
      title: 'Favorite',
      focusedIcon: 'star',
      unfocusedIcon: 'star-outline',
    },
    {
      key: 'profil',
      title: 'Profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BNavigation.SceneMap({
    home: HomeRoute,
    favorite: FavoriteRoute,
    profil: ProfilRoute,
  });

  React.useEffect(() => {
    setIndex(0);
  }, [navigation]);

  return (
    <BNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      theme={{colors: {secondaryContainer: '#fff'}}}
      barStyle={{backgroundColor: 'rgba(255, 0, 0, 0.4)'}}
    />
  );
};

export default BottomNavigation;
