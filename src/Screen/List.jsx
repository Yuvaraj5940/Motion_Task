import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const dimension = Dimensions.get('window').width;

const List = ({navigation}) => {
  const [movieList, setMovieList] = useState([]);
  const [layout, setLayout] = useState(1);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      let nextPage = currentPage + 1;
      const res = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&tags=kitten&per_page=10&page=${nextPage}`,
      );
      const data = await res.json();
      setCurrentPage(nextPage);
      setMovieList(val => [...val, ...data?.photos?.photo]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadImg = item => {
    navigation.navigate('Image', {
      url: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`,
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => setLayout(val => (val === 3 ? 1 : val + 1))}>
          <Image source={require('../assets/menu.png')} style={styles.button} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputContainer}
          placeholder="Search Movie"
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList
        onEndReached={() => fetchData()}
        numColumns={layout}
        data={movieList}
        key={layout}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => {
          if (item.title.includes(search)) {
            return (
              <Pressable onPress={() => loadImg(item)}>
                <Image
                  source={{
                    uri: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`,
                  }}
                  style={{
                    width: dimension * (1 / layout).toFixed(1),
                    height: dimension * (1 / layout).toFixed(1),
                    margin: 5,
                  }}
                />
              </Pressable>
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  button: {
    height: dimension / 10,
    width: dimension / 10,
  },
  imageContainer: {
    marginBottom: dimension / 30,
  },
  pagination: {
    height: 40,
    width: 50,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: dimension / 20,
    paddingLeft: dimension / 20,
  },
});

export default List;
