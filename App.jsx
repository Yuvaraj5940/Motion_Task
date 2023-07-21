import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import List from './src/Screen/List';
import ImagePage from './src/Screen/Image';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Image" component={ImagePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
