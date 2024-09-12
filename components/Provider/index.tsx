import React, {ReactNode} from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

type Props = {
  children: ReactNode;
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C7253E',
    onPrimary: '#821131',
    secondary: '#E85C0D',
    onSecondary: '#FABC3F',
    background: '#fff',
    tertiary: '#fff',
  },
};

function Provider(props: Props): React.JSX.Element {
  const {children} = props;
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}

export default Provider;
