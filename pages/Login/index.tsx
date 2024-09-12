import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TextInputCom from '../../components/TextInputCom';
import {Button, useTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage({navigation}: {navigation: any}): React.JSX.Element {
  const {colors} = useTheme();
  const bgLogin = require('../../assets/bgLogin.jpg');
  const onLoginClick = async () => {
    await AsyncStorage.setItem('username', 'Aku User 1123');
    navigation.navigate('Main');
  };

  const styles = StyleSheet.create({
    buttonLogin: {
      width: 220,
      marginVertical: 20,
      backgroundColor: colors?.onPrimary,
    },
    centeredView: {
      backgroundColor: colors.background,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textTitle: {
      color: colors.tertiary,
      marginVertical: 20,
      fontSize: 25,
      fontWeight: 'bold',
    },
    imageBg: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
        <ImageBackground
          source={bgLogin}
          resizeMode="cover"
          style={styles.imageBg}>
          <Text style={styles.textTitle}>Login Page</Text>
          <TextInputCom placeholder="Input Username" label="Username" />
          <TextInputCom
            placeholder="Input Password"
            label="Password"
            password
          />
          <Button
            textColor={colors.tertiary}
            onPress={onLoginClick}
            style={styles.buttonLogin}
            mode="contained">
            Login
          </Button>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;
