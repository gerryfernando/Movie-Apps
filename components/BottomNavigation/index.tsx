import * as React from 'react';
import {BottomNavigation as BNavigation} from 'react-native-paper';
import HomePage from '../../pages/HomePage';
import FavoritePage from '../../pages/FavoritePage';
import ProfilPage from '../../pages/ProfilPage';

const HomeRoute = () => <HomePage />;

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
    />
  );
};

export default BottomNavigation;
