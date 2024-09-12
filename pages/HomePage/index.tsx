import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function HomePage(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
          }}>
          <Text style={{fontWeight: 'bold'}}>Home Page</Text>
          <Text style={{fontWeight: 'bold'}}>Movie List</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomePage;
