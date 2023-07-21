import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const List = ({navigation}) => {
  const [movieList, setMovieList] = useState([]);
  const [layout, setLayout] = useState(1);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const iconList = [
    {icon: require('../assets/menu.png')},
    {icon: require('../assets/grid.png')},
    {icon: require('../assets/list.png')},
  ];

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
        <Text style={styles.title}>List of Images</Text>
        <TouchableOpacity
          onPress={() => setLayout(val => (val === 3 ? 1 : val + 1))}>
          <Image source={iconList[layout - 1].icon} style={styles.button} />
        </TouchableOpacity>
      </View>
      <View style={styles.TextContain}>
        <TextInput
          style={styles.inputContainer}
          placeholder="Search Movie"
          onChangeText={text => setSearch(text)}
        />
      </View>
      <View style={styles.imageContainer}>
        <FlatList
          onEndReached={() => fetchData()}
          numColumns={layout}
          data={movieList}
          key={layout}
          style={{flex: 1}}
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
                      width: Dimensions.get('window').width / layout,
                      height: Dimensions.get('window').width / layout,
                      borderWidth: 2,
                      borderColor: '#ffff',
                    }}
                  />
                </Pressable>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  button: {
    height: 20,
    width: 20,
    tintColor: '#808080',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: '#404040',
  },
  imageContainer: {
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: 10,
  },
  TextContain: {paddingHorizontal: 20},
});

export default List;
