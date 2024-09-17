import React, {useEffect, useState} from 'react';
import {BottomNavigation as BNavigation} from 'react-native-paper';
import FavoritePage from '../../pages/FavoritePage';
import ProfilPage from '../../pages/ProfilPage';
import HomeRouter from '../../pages/HomeRoute';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const BottomNavigation = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation<any>();

  const [routes] = useState([
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
  const [key, setKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => setKey(prevKey => prevKey + 1);
      return unsubscribe;
    }, []),
  );

  // const renderScene = BNavigation.SceneMap({
  //   home: HomeRoute,
  //   favorite: FavoriteRoute,
  //   profil: ProfilRoute,
  // });

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      setIndex(0);
    });
  }, [navigation]);

  const renderScene = ({route}: {route: any}): JSX.Element | null => {
    switch (route.key) {
      case 'home':
        return <HomeRouter key={`${index}_first`} />;
      case 'favorite':
        return <FavoritePage key={`${index}_second`} />;
      case 'profil':
        return <ProfilPage key={`${index}_second`} />;
      default:
        return null;
    }
  };

  return (
    <BNavigation
      key={key}
      navigationState={{index, routes}}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      theme={{colors: {secondaryContainer: '#fff'}}}
      barStyle={{backgroundColor: 'rgba(255, 0, 0, 0.4)'}}
    />
  );
};

export default BottomNavigation;
