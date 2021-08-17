import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Explore from './screens/explore.js';
import RootGuest from './screens/RootGuest.js';
import {RootTabs} from './screens/RootTabs.js';

const Stack = createStackNavigator();

export default function App() {
  return (
<NavigationContainer>
    <RootGuest />
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
