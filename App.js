import * as React from 'react';
import Products from './display/Products';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from './display/Details'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen name="Products" component={Products} options={{ title: 'Product page' }} />
        <Stack.Screen name="Details" component={Details} options={{ title: ' Product details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
