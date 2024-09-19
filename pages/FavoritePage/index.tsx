import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import API from '../../services/axios';
import {Text} from 'react-native-paper';
import CardFavoriteCom from './components/CardFavoriteCom';
import ConvertGenre from '../../utils/ConvertGenre';
import {useFocusEffect} from '@react-navigation/native';
import LoadingComp from '../../components/LoadingCom';

type ResponseFavorite = {
  results: Record<string, any>[];
};
function FavoritePage(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [dataFavorite, setDataFavorite] = useState<Record<string, any>[]>([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 50,
      rowGap: 12,
      flexDirection: 'column',
    },
    column: {
      flexDirection: 'column',
      marginBottom: 10,
    },
  });
  const getDataFavorite = async () => {
    try {
      setLoading(true);
      const userId = process.env.USER_ID;
      const url = `/account/${userId}/favorite/movies`;
      const res = await API.get<ResponseFavorite>(url, {
        params: {
          language: 'en-US',
          page: 1,
        },
      });
      setDataFavorite(res.data?.results);
    } catch {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getDataFavorite();

      return () => {};
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <Text variant="titleLarge">My Favorite</Text>

          <ScrollView>
            <View style={styles.column}>
              {(dataFavorite || [])?.map((val, idx: number) => {
                return (
                  <CardFavoriteCom
                    key={`favorite-list-${idx}`}
                    title={val.original_title}
                    subtitle={ConvertGenre(val.genre_ids)}
                    img={`${process.env.IMAGE_BASE_URL}${val.backdrop_path}`}
                    idMovie={val.id}
                  />
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

export default FavoritePage;
