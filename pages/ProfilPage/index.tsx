import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

function ProfilPage(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
        <Text>Profil Page</Text>
      </View>
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
