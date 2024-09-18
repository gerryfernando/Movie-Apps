/* eslint-disable @typescript-eslint/no-unused-vars */
// import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Button, Card} from 'react-native-paper';

interface Props {
  title?: string;
  subtitle?: string | React.ReactNode;
  img?: string;
  idMovie: string;
}

const CardFavoriteCom: React.FC<Props> = props => {
  const {title, subtitle, img, idMovie} = props;
  // const navigation = useNavigation<any>();
  return (
    <Card
      style={{
        marginVertical: 30,
        marginHorizontal: 8,
      }}>
      <Card.Cover
        style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
        source={{uri: img}}
      />
      <Card.Title title={title} subtitle={subtitle || ''} />
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
