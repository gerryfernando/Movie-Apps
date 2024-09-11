import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

type Props = {
  placeholder?: string;
  label?: string;
  password?: boolean;
};

function TextInputCom(props: Props): React.JSX.Element {
  const {placeholder, label, password = false} = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View>
      <TextInput
        mode="outlined"
        label={label}
        style={styles.textInput}
        placeholder={placeholder}
        secureTextEntry={password && passwordVisible}
        right={
          password && (
            <TextInput.Icon
              icon={passwordVisible ? 'eye-off' : 'eye'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          )
        }
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    marginBottom: 12,
  },
});
export default TextInputCom;
