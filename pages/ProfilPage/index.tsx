import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Dialog,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import API from '../../services/axios';

interface ResponseProfile {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

interface Avatar {
  gravatar: Gravatar;
  tmdb: Tmdb;
}

interface Gravatar {
  hash: string;
}

interface Tmdb {
  avatar_path: any;
}
function ProfilPage(): React.JSX.Element {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const [data, setData] = useState<ResponseProfile | null>(null);
  const [visible, setVisible] = React.useState(false);
  const bgProfil = require('../../assets/bgProfil.jpg');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
    hideDialog();
  };

  const getDataProfil = async () => {
    try {
      const url = 'account';
      const res = await API.get<ResponseProfile>(url);
      setData(res.data);
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    getDataProfil();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <ImageBackground
            style={styles.imageBG}
            source={bgProfil}
            resizeMode="cover"
          />
          <Avatar.Text
            size={125}
            label={data?.username ? data?.username[0].toUpperCase() : ''}
            style={{marginTop: 50}}
          />
        </View>
        <Button
          textColor={colors.tertiary}
          onPress={async () => {
            showDialog();
          }}
          style={{
            width: '90%',
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
          mode="contained">
          Logout
        </Button>
      </View>
      <Portal>
        <Dialog
          style={{backgroundColor: '#fff'}}
          visible={visible}
          onDismiss={hideDialog}>
          <Dialog.Title>Logout Confirm</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure want to do logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={Logout}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    height: '100%',
    alignItems: 'center',
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: 250,
  },
});

export default ProfilPage;
