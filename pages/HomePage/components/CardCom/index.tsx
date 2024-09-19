import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Button, Card, Text} from 'react-native-paper';

interface Props {
  title?: string;
  subtitle?: string | React.ReactNode;
  img?: string;
  isFull?: boolean;
  content?: string | React.ReactNode;
  idMovie?: number;
}

const CardCom: React.FC<Props> = props => {
  const {title, subtitle, img, isFull = false, idMovie, content} = props;
  const [errorImage, setErrorImage] = React.useState(false);
  const noImage = require('../../../../assets/noImage.png');

  const navigation = useNavigation<any>();
  return (
    <Card
      style={{
        marginVertical: 30,
        marginHorizontal: 8,
        width: isFull ? undefined : 140,
      }}>
      <Card.Cover
        style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
        source={errorImage ? noImage : {uri: img}}
        onError={() => {
          setErrorImage(true);
        }}
      />
      <Card.Title title={title} subtitle={subtitle || ''} />
      {content && (
        <Card.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Card.Content>
      )}
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('Detail', {id: idMovie});
          }}
          textColor="#fff">
          Detail
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CardCom;
