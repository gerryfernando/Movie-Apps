/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import CardCom from './components/CardCom';
import API from '../../services/axios';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';
import TextInputCom from '../../components/TextInputCom';
import ConvertGenre from '../../utils/ConvertGenre';
import GenerateUniqueId from '../../utils/GenerateUniqueId';
import {useUser} from '../../components/ContextProvider';
import LoadingComp from '../../components/LoadingCom';

type ResponseMovie = {
  results: Record<string, any>[];
};
function HomePage(): React.JSX.Element {
  const {colors} = useTheme();
  const [dataNowPlaying, setDataNowPlaying] = useState<Record<string, any>[]>(
    [],
  );
  const [dataTopRated, setDataTopRated] = useState<Record<string, any>[]>([]);
  const [dataPopular, setDataPopular] = useState<Record<string, any>[]>([]);
  const [dataSearch, setDataSearch] = useState<Record<string, any>[]>([]);
  const {user} = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [pageNowPlaying, setPageNowPlaying] = useState(1);
  const [pageTopRated, setPageTopRated] = useState(1);
  const [pagePopular, setPagePopular] = useState(1);
  const [pageSearch, setPageSearch] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const backgroundStyle = {
    backgroundColor: '#fff',
    flex: 1,
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

  const getTopRated = async () => {
    const urlTR = 'movie/top_rated';

    return await API.get<ResponseMovie>(urlTR, {
      params: {
        page: pageTopRated,
      },
    }).then(res => {
      const newData = res?.data?.results.map(val => ({
        ...val,
        uniqueId: `${val.id}-${GenerateUniqueId()}`,
      }));
      setDataTopRated([...dataTopRated, ...newData]);
    });
  };

  const getNowPlaying = async () => {
    const urlNP = 'movie/now_playing';

    return await API.get<ResponseMovie>(urlNP, {
      params: {
        page: pageNowPlaying,
      },
    }).then(res => {
      setDataNowPlaying([...dataNowPlaying, ...res.data.results]);
    });
  };

  const getPopular = async () => {
    const urlP = 'movie/popular';

    return await API.get<ResponseMovie>(urlP, {
      params: {
        query: pagePopular,
      },
    }).then(res => {
      setDataPopular([...dataPopular, ...res.data.results]);
    });
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const urlS = 'search/movie';
      if (!search || search === '') {
        setDataSearch([]);
        setIsSearch(false);
        getMovieData();
      } else {
        const res = await API.get<ResponseMovie>(urlS, {
          params: {
            page: pageSearch,
            query: search,
          },
        });
        setDataSearch([...res.data.results]);
        setIsSearch(true);
      }
    } catch {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  const getMovieData = async () => {
    try {
      setLoading(true);
      await getNowPlaying();
      await getTopRated();
      await getPopular();
    } catch {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTopRated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTopRated]);

  //Top Rated Pagination
  const renderItem = ({item}: {item: any}) => (
    <CardCom
      title={item.original_title}
      content={item.overview}
      img={`${process.env.IMAGE_BASE_URL}${item.backdrop_path}`}
      isFull
      idMovie={item.id}
    />
  );

  const renderLoader = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
        }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {loading ? (
        <LoadingComp />
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
                rowGap: 12,
                flexDirection: 'column',
              }}>
              <Text style={{fontWeight: 'bold'}}>
                Welcome,{' '}
                <Text style={{color: colors.primary, fontSize: 18}}>
                  {user || ''}
                </Text>
              </Text>
              <TextInputCom
                label="Search Bar"
                icon={'magnify'}
                fullWidth
                value={search}
                onChangeText={(text: string) => setSearch(text)}
                onClickIcon={() => handleSearch()}
                onEnter={handleSearch}
              />
              {!isSearch ? (
                <>
                  <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
                    Now Played
                  </Text>
                  <ScrollView horizontal>
                    <View style={styles.row}>
                      {dataNowPlaying?.map((val, idx) => {
                        return (
                          <CardCom
                            key={`now-playing-list-${idx}`}
                            title={val.original_title}
                            subtitle={ConvertGenre(val.genre_ids)}
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
                      {dataPopular?.map((val, idx) => {
                        return (
                          <CardCom
                            key={`popular-list-${idx}`}
                            title={val.original_title}
                            subtitle={ConvertGenre(val.genre_ids)}
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
                  {/* <FlatList
                data={dataTopRated}
                renderItem={renderItem}
                keyExtractor={item => `Top-Rated-${item?.uniqueId}`}
                ListFooterComponent={renderLoader}
                onEndReached={() => setPageTopRated(pageTopRated + 1)}
                onEndReachedThreshold={0}
              /> */}
                  <ScrollView>
                    <View style={styles.column}>
                      {dataTopRated?.map((val, idx) => {
                        return (
                          <CardCom
                            key={`top-rated-list-${idx}`}
                            title={val.original_title}
                            content={val.overview}
                            img={`${process.env.IMAGE_BASE_URL}${val.backdrop_path}`}
                            isFull
                            idMovie={val?.id}
                          />
                        );
                      })}
                    </View>
                  </ScrollView>
                </>
              ) : (
                <>
                  <ScrollView>
                    <View style={styles.column}>
                      {dataSearch?.map((val, idx) => {
                        return (
                          <CardCom
                            key={`search-list-${idx}`}
                            title={val.original_title}
                            content={val.overview}
                            img={`${process.env.IMAGE_BASE_URL}${val.backdrop_path}`}
                            isFull
                            idMovie={val?.id}
                          />
                        );
                      })}
                    </View>
                  </ScrollView>
                </>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

export default HomePage;
