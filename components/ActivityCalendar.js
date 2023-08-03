import React, {useState, Fragment, useCallback, useMemo, useRef} from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import IconButton from './IconButton';

const INITIAL_DATE = '2023-07-19';

export default ActivityCalendar = () => {
	const [selected, setSelected] = useState(INITIAL_DATE);
	const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

	const onDayPress = useCallback(day => setSelected(day.dateString));

	const marked = useMemo(() => ({
		['2023-07-18']: {
			dotColor: 'red',
			marked: true
		},
		[selected]: {
			selected: true,
			disableTouchEvent: true,
			selectedColor: 'orange',
			selectedTextColor: 'red'
		}
	}), [selected]);

	const {height, width, scale, fontScale} = useWindowDimensions();

	const header = () => (
		<View style={styles.calendarHeader}>
			<IconButton name='chevron-left' color='black' size={24}/>
			<Text style={styles.monthText} numberOfLines={1} adjustsFontSizeToFit>July</Text>
			<IconButton name='chevron-right' backgroundColor='#0000' color='black'/>
		</View>
	);

	return (
			<Calendar
				testID={'first-calendar'}
				enableSwipeMonths
				current={INITIAL_DATE}
				style={[{width: width}, styles.calendar]}
				onDayPress={onDayPress}
				markedDates={marked}
				customHeader={header}
			/>
	);
}

const styles = StyleSheet.create({
	calendar: {
		padding: 0,
	},
	calendarHeader: {
		height: 48,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	monthText: {
		fontSize: 100,
		padding: 4,
		textAlign: 'center'
	}
});
