/* eslint-disable @typescript-eslint/no-unused-vars */
// import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Button, Card, Text} from 'react-native-paper';

interface Props {
  title?: string;
  subtitle?: string | React.ReactNode;
  img?: string;
  idMovie: string;
}

const CardFavoriteCom: React.FC<Props> = props => {
  const {title, subtitle, img, idMovie} = props;
  const [errorImage, setErrorImage] = React.useState(false);
  const noImage = require('../../../../assets/noImage.png');
  // const navigation = useNavigation<any>();
  return (
    <Card
      style={{
        marginVertical: 30,
        marginHorizontal: 8,
      }}>
      <Card.Cover
        style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
        source={errorImage ? noImage : {uri: img}}
        onError={e => {
          setErrorImage(true);
        }}
      />
      <Card.Title title={title} />
      {subtitle && (
        <Card.Content>
          <Text variant="bodyMedium">{subtitle}</Text>
        </Card.Content>
      )}
      {/* <Card.Actions>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('Detail', {id: idMovie});
          }}
          textColor="#fff">
          Detail
        </Button>
      </Card.Actions> */}
    </Card>
  );
};

export default CardFavoriteCom;
