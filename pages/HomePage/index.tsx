import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import CardCom from '../../components/CardCom';
import API from '../../services/axios';
import {ActivityIndicator, Text} from 'react-native-paper';
import TextInputCom from '../../components/TextInputCom';

type ResponseMovie = {
  results: Record<string, any>[];
};
function HomePage(): React.JSX.Element {
  const [dataNowPlaying, setDataNowPlaying] = useState<Record<string, any>[]>(
    [],
  );
  const [dataTopRated, setDataTopRated] = useState<Record<string, any>[]>([]);
  const [dataPopular, setDataPopular] = useState<Record<string, any>[]>([]);
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const backgroundStyle = {
    backgroundColor: '#fff',
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      padding: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    column: {
      flexDirection: 'column',
      marginBottom: 10,
    },
  });

  const getMovieData = async () => {
    try {
      setLoading(true);
      const urlNP = 'movie/now_playing';
      const urlTR = 'movie/top_rated';
      const urlP = 'movie/popular';
      const resNowPlaying = await API.get<ResponseMovie>(urlNP, {
        params: {
          page: 1,
        },
      });
      const resTopRated = await API.get<ResponseMovie>(urlTR, {
        params: {
          page: 1,
        },
      });
      const resPopular = await API.get<ResponseMovie>(urlP, {
        params: {
          page: 1,
        },
      });
      setDataNowPlaying(resNowPlaying.data.results);
      setDataPopular(resPopular.data.results);
      setDataTopRated(resTopRated.data.results);
      console.log(resNowPlaying.data.results[0].id);
    } catch {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  useEffect(() => {
    const getUsername = async () => {
      const username = (await AsyncStorage.getItem(
        'username',
      )) as unknown as string;
      setName(username);
    };
    getUsername();
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      {loading ? (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator animating={true} />
        </View>
      ) : (
        <>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <View
              style={{
                backgroundColor: backgroundStyle.backgroundColor,
                paddingHorizontal: 30,
                paddingVertical: 50,
              }}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                Hello, {name}{' '}
              </Text>
              <TextInputCom
                label="Search Bar"
                icon="magnify"
                fullWidth
                // value="123"
                // onChangeText={text => setText(text)}
              />
              <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
                Now Played
              </Text>
              <ScrollView horizontal>
                <View style={styles.row}>
                  {dataNowPlaying?.map(val => {
                    console.log(val);
                    return (
                      <CardCom
                        title={val.original_title}
                        subtitle={val.overview}
                        img={`${process.env.IMAGE_BASE_URL}${val.poster_path}`}
                        idMovie={val?.id}
                      />
                    );
                  })}
                </View>
              </ScrollView>
              <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
                Popular
              </Text>
              <ScrollView horizontal>
                <View style={styles.row}>
                  {dataPopular?.map(val => {
                    return (
                      <CardCom
                        title={val.original_title}
                        subtitle={val.overview}
                        img={`${process.env.IMAGE_BASE_URL}${val.poster_path}`}
                        idMovie={val?.id}
                      />
                    );
                  })}
                </View>
              </ScrollView>
              <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
                Top Rated
              </Text>
              <ScrollView>
                <View style={styles.column}>
                  {dataTopRated?.map(val => {
                    return (
                      <CardCom
                        title={val.original_title}
                        subtitle={val.overview}
                        img={`${process.env.IMAGE_BASE_URL}${val.backdrop_path}`}
                        isFull
                        idMovie={val?.id}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

export default HomePage;
