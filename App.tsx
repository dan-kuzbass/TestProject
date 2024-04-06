/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/Home'
import Task1Screen from './src/screens/Task1'
import Task2Screen from './src/screens/Task2'
import Task3Screen from './src/screens/Task3'

function App(): React.JSX.Element {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Task1" component={Task1Screen} />
        <Stack.Screen name="Task2" component={Task2Screen} />
        <Stack.Screen name="Task3" component={Task3Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
