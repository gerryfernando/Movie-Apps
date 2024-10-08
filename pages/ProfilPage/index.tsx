import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import API from '../../services/axios';
import {useUser} from '../../components/ContextProvider';
import LoadingComp from '../../components/LoadingCom';
import ImageView from 'react-native-image-viewing';

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
  const {setUser, setSession} = useUser();
  const navigation = useNavigation<any>();
  const [data, setData] = useState<ResponseProfile | null>(null);
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [errorImage, setErrorImage] = React.useState(false);
  const bgProfil = require('../../assets/bgProfil.jpg');
  const noImage = require('../../assets/noImage.png');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const Logout = async () => {
    setUser(null);
    setSession(null);
    navigation.navigate('Login');
    hideDialog();
  };

  const getDataProfil = async () => {
    try {
      setLoading(true);
      const url = 'account';
      const res = await API.get<ResponseProfile>(url);
      setData(res.data);
    } catch {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  const renderPointDetail = (label: string, content: string) => {
    return (
      <View style={{marginBottom: 10, rowGap: 10}}>
        <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
          {label} :{' '}
        </Text>
        <Text variant="titleMedium" style={{fontWeight: '600'}}>
          {content}
        </Text>
        <Divider />
      </View>
    );
  };
  useEffect(() => {
    getDataProfil();
  }, []);
  return loading ? (
    <LoadingComp />
  ) : (
    <SafeAreaView style={styles.centeredView}>
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <View style={styles.containerBG}>
            <ImageBackground
              style={styles.imageBG}
              source={bgProfil}
              resizeMode="cover"
            />
            {data?.avatar.gravatar.hash ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setShowImage(true);
                  }}>
                  <Avatar.Image
                    size={125}
                    source={
                      errorImage
                        ? noImage
                        : {
                            uri: `https://www.gravatar.com/avatar/${data?.avatar.gravatar.hash}?s=200`,
                          }
                    }
                    onError={() => {
                      setErrorImage(true);
                    }}
                    style={{marginTop: 50}}
                  />
                </TouchableOpacity>
                <ImageView
                  images={[
                    {
                      uri: `https://www.gravatar.com/avatar/${data?.avatar.gravatar.hash}?s=200`,
                    },
                  ]}
                  imageIndex={0}
                  visible={showImage}
                  onRequestClose={() => {
                    setShowImage(false);
                  }}
                />
              </>
            ) : (
              <Avatar.Text
                size={125}
                label={data?.username ? data?.username[0].toUpperCase() : ''}
                style={{marginTop: 50}}
              />
            )}
          </View>
          <View style={styles.containerContent}>
            {renderPointDetail('ID', data?.id.toString() || '-')}
            {renderPointDetail('Username', data?.username || '-')}
            {renderPointDetail('Name', data?.name || '-')}
            {renderPointDetail('Country', data?.iso_3166_1 || '-')}
          </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingBottom: 50,
  },
  centeredView: {
    height: '100%',
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: 250,
  },
  containerBG: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 100,
  },
  containerContent: {
    width: '100%',
    padding: 30,
  },
});

export default ProfilPage;
