import * as React from 'react';
import {Button, Card} from 'react-native-paper';

interface Props {
  title?: string;
  subtitle?: string | React.ReactNode;
  img?: string;
  isFull?: boolean;
  idMovie?: number;
}

const CardCom: React.FC<Props> = props => {
  const {title, subtitle, img, isFull = false, idMovie} = props;

  return (
    <Card
      style={{
        marginVertical: 30,
        marginHorizontal: 8,
        width: isFull ? undefined : 140,
      }}>
      <Card.Cover
        style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
        source={{uri: img}}
      />
      <Card.Title title={title} subtitle={subtitle} />
      {/* <Card.Content>
        <Text variant="bodyMedium">{content}</Text>
      </Card.Content> */}
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => console.log(idMovie)}
          textColor="#fff">
          Detail
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default CardCom;
