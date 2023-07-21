import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const dimension = Dimensions.get('window').width;

const List = ({navigation}) => {
  const [movieList, setMovieList] = useState([]);
  const [layout, setLayout] = useState(false);
  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&tags=kitten&per_page=10&page=1',
      );
      const data = await res.json();
      setMovieList(data?.photos?.photo);
      console.log(data);
    } catch (error) {
      console.log(error);

    }
  };

  const loadImg = (item) => {
    navigation.navigate('Image');
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setLayout(!layout)}>
        <Image source={require('../assets/menu.png')} style={styles.button} />
      </Pressable>
      <FlatList
        numColumns={layout ? 2 : 0}
        data={movieList}
        renderItem={({item}) => (
          <Pressable onPress={() => loadImg(item)}>
            <Image
              source={{
                uri: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`,
              }}
              style={[styles.image, {width: layout ? '50%' : '100%'}]}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: dimension / 30,
  },
  image: {
    height: 200,
    width: '100%',
    margin: 5,
  },
  button: {
    height: dimension / 10,
    width: dimension / 10,
  },
  imageContainer: {
    marginBottom: dimension / 30,
  },
});

export default List;
