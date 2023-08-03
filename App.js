import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: '#ff0',
		primary: 'rgb(255, 45, 85)',
	},
};

export default function App() {
	return (
		<NavigationContainer theme={MyTheme}>
			<HomeScreen/>
		</NavigationContainer>
	);
}
