import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function LoadingComp() {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator animating={true} />
    </View>
  );
}
