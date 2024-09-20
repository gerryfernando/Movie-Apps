import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import TextInputCom from '../../components/TextInputCom';
import {Button, useTheme} from 'react-native-paper';
import {FormProvider, useForm} from 'react-hook-form';
import API from '../../services/axios';
import {useUser} from '../../components/ContextProvider';

function LoginPage({navigation}: {navigation: any}): React.JSX.Element {
  const {colors} = useTheme();
  const {setUser, setSession} = useUser();
  const RHF = useForm();
  const {handleSubmit, reset} = RHF;
  const [loading, setLoading] = useState(false);
  const bgLogin = require('../../assets/bgLogin.jpg');
  const logo = require('../../assets/logo.png');
  const styles = StyleSheet.create({
    buttonLogin: {
      width: 220,
      marginTop: 20,
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
    formContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      rowGap: 12,
    },
  });

  const onSubmitLogin = async (data: any) => {
    try {
      setLoading(true);

      const resReqToken = await API.get('authentication/token/new');

      await API.post('authentication/token/validate_with_login', {
        username: data?.username,
        password: data?.password,
        request_token: resReqToken?.data?.request_token,
      });

      const resSession = await API.post(
        'authentication/session/new',
        {request_token: resReqToken?.data?.request_token},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      setUser(data?.username);
      setSession(resSession?.data?.session_id);
      navigation.navigate('Main');
      reset({});
    } catch (error) {
      Alert.alert('Login Failed', 'Incorrect password or username ', [
        {text: 'OK'},
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
        <ImageBackground
          source={bgLogin}
          resizeMode="cover"
          style={styles.imageBg}>
          <Image
            style={{width: 100, height: 100, marginBottom: 20}}
            source={logo}
          />
          <FormProvider {...RHF}>
            <View style={styles.formContainer}>
              <TextInputCom
                RHF={RHF}
                required
                name="username"
                placeholder="Input Username"
                label="Username"
              />
              <TextInputCom
                RHF={RHF}
                required
                name="password"
                placeholder="Input Password"
                label="Password"
                password
              />
              <Button
                textColor={colors.tertiary}
                style={styles.buttonLogin}
                onPress={handleSubmit(onSubmitLogin)}
                loading={loading}
                mode="contained">
                Login
              </Button>
              {/* <Button
                textColor={colors.tertiary}
                style={styles.buttonLogin}
                onPress={() => {
                  navigation.navigate('Main');
                  setUser('Guest');
                }}
                loading={loading}
                mode="contained">
                Login As Guest
              </Button> */}
            </View>
          </FormProvider>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;
