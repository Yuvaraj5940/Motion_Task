import {StyleSheet, Animated} from 'react-native';
import React, {useRef} from 'react';
import {PinchGestureHandler} from 'react-native-gesture-handler';

const ImagePage = ({route}) => {
  const {url} = route.params;
  console.log(url);
  const scale = useRef(new Animated.Value(1)).current;
  const handlePinch = Animated.event([{nativeEvent: {scale}}], {
    listener: e => e.nativeEvent,
    useNativeDriver: true,
  });
  return (
    <PinchGestureHandler onGestureEvent={handlePinch}>
      <Animated.Image
        source={{uri: url}}
        style={[styles.img, {transform: [{scale}]}]}
      />
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
export default ImagePage;
