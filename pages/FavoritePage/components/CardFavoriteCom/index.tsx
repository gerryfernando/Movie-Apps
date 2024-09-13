import * as React from 'react';
import {Card} from 'react-native-paper';

interface Props {
  title?: string;
  subtitle?: string | React.ReactNode;
  img?: string;
}

const CardFavoriteCom: React.FC<Props> = props => {
  const {title, subtitle, img} = props;
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
    </Card>
  );
};

export default CardFavoriteCom;
