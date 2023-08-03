import React, {useState, Fragment, useCallback, useMemo, useRef} from 'react';
import { StyleSheet, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import ActivityCalendar from '../components/ActivityCalendar';

/*
HomeScreen

exposed functions:
	changeStatusBarVisibility(): null	Toggles the visibility of the status bar on the home screen
*/

export default HomeScreen = () => {
	const {colors} = useTheme();

	const {hidden, setHidden} = useState(false);
	const {statusBarStyle, setStatusBarStyle} = useState('light-content');

	const changeStatusBarVisibility = () => setHidden(!hidden);

	return (
		<View style={styles.container}>
			<StatusBar
				backgroundColor={colors.background}
				barStyle={statusBarStyle}
				hidden={hidden}
			/>
			<ActivityCalendar/>
	    </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		backgroundColor: '#eee',
		alignItems: 'center',
	},
});
