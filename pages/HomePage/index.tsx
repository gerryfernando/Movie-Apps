import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CardCom from '../../components/CardCom';

function HomePage(): React.JSX.Element {
  const [name, setName] = useState<string>('');
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
  });

  // const getMovieData = () => {
  //    const url = "/food-order/foods";
  //   API.get<ResponseGetFood>(url, {
  //     params: {
  //       ...params,
  //       pageNumber: params.pageNumber ? Number(params.pageNumber) : 1,
  //       pageSize: params.pageSize ? Number(params.pageSize) : 10,
  //     },
  //   })
  //     .then(({ data }) => {
  //       setTotalPages(data.total);
  //       setDataRow(data.data);
  //     })
  //     .catch((error: unknown) => console.log(error))
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

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
          <Text style={{fontWeight: 'bold'}}>Hello, {name} </Text>
          <Text style={{fontWeight: 'bold'}}>Home Page</Text>

          <Text style={{fontWeight: 'bold'}}>Now Played</Text>
          <ScrollView horizontal>
            <View style={styles.row}>
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//6PCnxKZZIVRanWb710pNpYVkCSw.jpg"
              />
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//6PCnxKZZIVRanWb710pNpYVkCSw.jpg"
              />
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//6PCnxKZZIVRanWb710pNpYVkCSw.jpg"
              />
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//6PCnxKZZIVRanWb710pNpYVkCSw.jpg"
              />
            </View>
          </ScrollView>
          <Text style={{fontWeight: 'bold'}}>Popular</Text>
          <ScrollView horizontal>
            <View style={styles.row}>
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/4ft6TR9wA6bra0RLL6G7JFDQ5t1.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
              />
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/4ft6TR9wA6bra0RLL6G7JFDQ5t1.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
              />
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/4ft6TR9wA6bra0RLL6G7JFDQ5t1.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
              />
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/4ft6TR9wA6bra0RLL6G7JFDQ5t1.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//wWba3TaojhK7NdycRhoQpsG0FaH.jpg"
              />
            </View>
          </ScrollView>
          <Text style={{fontWeight: 'bold'}}>Top Rated</Text>
          <ScrollView horizontal>
            <View style={styles.row}>
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/nnl6OWkyPpuMm595hmAxNW3rZFn.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg"
              />
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/nnl6OWkyPpuMm595hmAxNW3rZFn.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg"
              />
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/nnl6OWkyPpuMm595hmAxNW3rZFn.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg"
              />
              <CardCom
                title="Despicable Me 4"
                subtitle="2020,Movie"
                img="https://image.tmdb.org/t/p/w500/nnl6OWkyPpuMm595hmAxNW3rZFn.jpg"
              />
              <CardCom
                title="The Killer"
                subtitle="2024"
                content="tes aja"
                img="https://image.tmdb.org/t/p/w500//pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg"
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomePage;
