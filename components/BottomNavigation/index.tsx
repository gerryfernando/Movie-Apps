import * as React from 'react';
import {BottomNavigation as BNavigation} from 'react-native-paper';
import FavoritePage from '../../pages/FavoritePage';
import ProfilPage from '../../pages/ProfilPage';
import HomeRouter from '../../pages/HomeRoute';

const HomeRoute = () => <HomeRouter />;

const FavoriteRoute = () => <FavoritePage />;

const ProfilRoute = () => <ProfilPage />;

const BottomNavigation = () => {
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
