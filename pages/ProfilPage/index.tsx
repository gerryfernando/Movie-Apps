import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Dialog, Portal, Text, useTheme} from 'react-native-paper';
// import {API_BASE_URL} from '@env';

function ProfilPage(): React.JSX.Element {
  const {colors} = useTheme();
  const navigation = useNavigation<any>();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  // console.log(API_BASE_URL);

  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
        <Text>Profil Page</Text>
        <Button
          textColor={colors.tertiary}
          onPress={async () => {
            showDialog();
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfilPage;
