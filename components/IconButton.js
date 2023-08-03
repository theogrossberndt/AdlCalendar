import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default IconButton = (props) => {
	const opacity = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => ({
		backgroundColor: 'rgba(0.5, 0.5, 0.5, ' + opacity.value + ')'
	}));

	return (
		<Pressable onPress={() => opacity.value = withSequence(withTiming(0.05, {duration: 100}), withTiming(0, {duration: 100}))}>
			<Animated.View style={[styles.wrapper, animatedStyle]}>
				<Icon name={props.name} color={props.color || 'black'} size={props.size || 24}/>
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#eee',
		height: 48,
		width: 48,
		borderRadius: 24
	}
});
