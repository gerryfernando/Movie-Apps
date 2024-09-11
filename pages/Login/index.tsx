import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import TextInputCom from '../../components/TextInputCom';

function LoginPage(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
        <Text>Login Page</Text>
        <TextInputCom placeholder="Input Username" label="Username" />
        <TextInputCom placeholder="Input Password" label="Password" password />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    // backgroundColor: 'red',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage;
