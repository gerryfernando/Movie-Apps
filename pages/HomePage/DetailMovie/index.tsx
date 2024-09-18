import {RouteProp, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Chip, Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import API from '../../../services/axios';
import {RootStackParamList} from '../../HomeRoute';
import LoadingComp from '../../../components/LoadingCom';

type Props = {
  route: RouteProp<RootStackParamList, 'Detail'> | any;
  navigation: any;
};

const DetailMovie: React.FC<Props> = () => {
  const route = useRoute();
  const {id} = route.params || ({} as any);
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = React.useState<boolean>(false);
  const [data, setData] = useState<Record<string, any>>({});
  const [dataImages, setDataImages] = useState<Record<string, any>[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const getDetail = async () => {
    try {
      const url = 'movie/' + id;

      const res = await API.get<Record<string, any>[]>(url);
      setData(res.data);
    } catch {
      console.log('error');
    }
  };

  const getDetailImages = async () => {
    try {
      const url = `movie/${id}/images`;
      const res = await API.get<Record<string, any>>(url);
      setDataImages([...res.data?.backdrops]);
    } catch {
      console.log('error');
    }
  };

  const getAllData = async () => {
    try {
      setLoading(true);
      await getDetail();
      await getDetailImages();
    } catch {
      console.log('error');
    } finally {
      setLoading(false);
    }
  };

  const AddFavorite = async () => {
    try {
      setLoadingButton(true);
      const userId = process.env.USER_ID;
      const url = `/account/${userId}/favorite`;
      await API.post(
        url,
        {
          media_type: 'movie',
          media_id: id,
          favorite: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      setIsFavorite(true);
    } catch {
      console.log('error');
    } finally {
      setLoadingButton(false);
    }
  };

  const renderPointDetail = (label: string, content: string) => {
    return (
      <View>
        <Text variant="bodyMedium" style={{fontWeight: 'bold'}}>
          {label} :{' '}
        </Text>
        <Text variant="bodyMedium" style={{fontWeight: '600'}}>
          {content}
        </Text>
      </View>
    );
  };

  const renderPointDetailNode = (
    label: string,
    dataArray: Record<string, any>[],
    name: string,
  ) => {
    return (
      <View>
        <Text variant="bodyMedium" style={{fontWeight: 'bold'}}>
          {label} :{' '}
        </Text>
        <View
          style={{
            ...styles.rowContainer,
            rowGap: 2,
            flexWrap: 'wrap',
          }}>
          {dataArray?.map((val: any, idx: number) => {
            return (
              <Text>
                {val[name]} {idx >= dataArray.length - 1 ? '' : ','} {'  '}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingComp />
      ) : (
        <View style={styles.fullHeightView}>
          <View>
            <Image
              style={styles.imageBackdrop}
              source={{
                uri: `${process.env.IMAGE_BASE_URL}${data.backdrop_path}`,
              }}
            />
            <ScrollView>
              <View style={styles.contentContainer}>
                <View style={styles.contentHeader}>
                  <Image
                    style={styles.imagePoster}
                    source={{
                      uri: `${process.env.IMAGE_BASE_URL}${data.poster_path}`,
                    }}
                  />
                  <View style={styles.contentTitle}>
                    <View style={styles.columnContainer}>
                      <View style={{width: 225}}>
                        <Text
                          variant="titleLarge"
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {data?.original_title}
                        </Text>
                      </View>
                      <View style={styles.chipGrid}>
                        {data?.genres?.map((val: any, idx: number) => {
                          if (idx <= 2) {
                            return (
                              <Chip
                                style={{
                                  backgroundColor: colors.primary,
                                  width: 'auto',
                                }}
                                selectedColor={colors.tertiary}>
                                {val?.name}
                              </Chip>
                            );
                          }
                          return true;
                        })}
                      </View>
                    </View>
                    <Button
                      buttonColor={isFavorite ? 'red' : undefined}
                      textColor={isFavorite ? '#fff' : undefined}
                      icon={isFavorite ? 'star' : 'star-outline'}
                      mode="outlined"
                      loading={loadingButton}
                      onPress={AddFavorite}>
                      {isFavorite ? 'My Favorite' : 'Add to Favorite'}
                    </Button>
                  </View>
                </View>
                <View style={{maxHeight: 200}}>
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View
                      style={{
                        ...styles.rowContainer,
                        columnGap: 10,
                      }}>
                      {dataImages?.map(val => {
                        return (
                          <Image
                            style={styles.imageList}
                            source={{
                              uri: `${process.env.IMAGE_BASE_URL}${val.file_path}`,
                            }}
                          />
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
                <View style={{rowGap: 10}}>
                  <View>
                    <Chip
                      style={{
                        backgroundColor: colors.onBackground,
                        width: 95,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      textStyle={{
                        textAlign: 'center',
                      }}
                      selectedColor={colors.tertiary}>
                      {data.status}
                    </Chip>
                  </View>
                  <View>
                    {renderPointDetail(
                      'Release Date',
                      moment(data?.release_date).format('DD MMMM YYYY'),
                    )}
                  </View>
                  <View>
                    {renderPointDetailNode(
                      'Company',
                      data?.production_companies,
                      'name',
                    )}
                  </View>
                  <View>
                    {renderPointDetailNode(
                      'Country',
                      data?.production_countries,
                      'name',
                    )}
                  </View>
                  <View>
                    {renderPointDetailNode(
                      'Language',
                      data?.spoken_languages,
                      'name',
                    )}
                  </View>

                  <View>{renderPointDetail('Synopsis', data?.overview)}</View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullHeightView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageBackdrop: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
  imagePoster: {
    width: 125,
    height: undefined,
    aspectRatio: 12 / 16,
    borderRadius: 10,
  },
  imageList: {
    width: 200,
    aspectRatio: 16 / 10,
    borderRadius: 10,
  },
  contentContainer: {
    paddingLeft: 25,
    paddingVertical: 15,
    rowGap: 30,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    columnGap: 15,
  },
  contentTitle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  columnContainer: {
    flexDirection: 'column',
    rowGap: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    rowGap: 10,
  },
  chipGrid: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    maxWidth: 225,
  },
});

export default DetailMovie;
