import {StyleSheet, Animated, Image, Pressable} from 'react-native';
import React, {useRef} from 'react';
import {PinchGestureHandler} from 'react-native-gesture-handler';

const ImagePage = ({navigation, route}) => {
  const {url} = route.params;
  console.log(url);
  const scale = useRef(new Animated.Value(1)).current;
  const handlePinch = Animated.event([{nativeEvent: {scale}}], {
    listener: e => e.nativeEvent,
    useNativeDriver: true,
  });
  return (
    <>
      <PinchGestureHandler onGestureEvent={handlePinch}>
        <Animated.Image
          source={{uri: url}}
          style={[styles.img, {transform: [{scale}]}]}
        />
      </PinchGestureHandler>
      <Pressable
        style={styles.backIcon}
        onPress={() => navigation.navigate('List')}>
        <Image source={require('../assets/back.png')} style={styles.icon} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
export default ImagePage;
