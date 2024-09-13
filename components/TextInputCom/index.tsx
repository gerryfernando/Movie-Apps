import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

type Props = {
  placeholder?: string;
  label?: string;
  password?: boolean;
  icon?: string;
  fullWidth?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  onClickIcon?: () => void;
  RHF?: any;
  name?: string;
  required?: boolean;
};

function TextInputCom(props: Props): React.JSX.Element {
  const {
    placeholder,
    label,
    password = false,
    icon,
    fullWidth,
    value,
    onChangeText,
    RHF,
    onClickIcon = null,
    name,
    required = false,
  } = props;

  const {control = {}, formState: {errors = {}} = {}} = RHF || {};
  const [passwordVisible, setPasswordVisible] = useState(true);
  const styles = StyleSheet.create({
    textInput: {
      width: fullWidth ? undefined : 250,
      overflow: 'hidden',
      borderRadius: 10,
    },
  });

  const rightComp = password ? (
    <TextInput.Icon
      icon={passwordVisible ? 'eye-off' : 'eye'}
      onPress={() => setPasswordVisible(!passwordVisible)}
    />
  ) : icon ? (
    <TextInput.Icon
      icon={icon}
      onPress={() => {
        !onClickIcon ? undefined : onClickIcon();
      }}
    />
  ) : (
    <></>
  );
  return (
    <View>
      {name ? (
        <>
          <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={{required: required && 'This field is requred!'}}
            render={({field}) => (
              <TextInput
                mode="flat"
                underlineColor="transparent"
                label={label}
                style={styles.textInput}
                value={field?.value}
                onChangeText={field.onChange}
                placeholder={placeholder}
                secureTextEntry={password && passwordVisible}
                theme={{roundness: 10}}
                right={rightComp}
                {...props}
              />
            )}
          />
          {errors[name] && (
            <HelperText
              visible={errors[name]}
              children={<> {errors[name].message}</>}
              style={{color: '#fff'}}
              type={'info'}
            />
          )}
        </>
      ) : (
        <TextInput
          mode="flat"
          underlineColor="transparent"
          label={label}
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={password && passwordVisible}
          theme={{roundness: 10}}
          right={rightComp}
          {...props}
        />
      )}
    </View>
  );
}

export default TextInputCom;
