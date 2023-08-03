import React from 'react';
import { useImperativeHandle, useState } from 'react';
import { Keyboard, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming, withSpring } from 'react-native-reanimated'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')

const BottomSheet = (props, ref) => {
	const [showBg, setShowBg] = useState(false);
	const isOpen = useSharedValue(false);
	const childHeight = useSharedValue(0);

	const gesture = Gesture.Pan().onUpdate((event) => {
		if (event.translationY > 0){
			isOpen.value = false;
			runOnJS(setShowBg)(false);
		}
	});

	const open = () => {
		isOpen.value = true;
		setShowBg(true);
	}

	const close = () => {
		Keyboard.dismiss();
		isOpen.value = false;
		setShowBg(false);
	}

	useImperativeHandle(ref, () => ({open, close}))

	const animatedTranslate = useAnimatedStyle(() => ({transform: [{translateY: isOpen.value ? withSpring(-1*childHeight.value, {damping: 50}) : withSpring(0, {damping: 50})}]}));

	return (
		<Animated.View style={[{position: 'absolute', bottom: -SCREEN_HEIGHT, width: '100%', zIndex: 9}, animatedTranslate, props.style && {}]}>
			{showBg &&
				<TouchableOpacity onPress={close}>
					<View style={{height: 2*SCREEN_HEIGHT, backgroundColor: 'rgba(0, 0, 0, 0.1)'}}/>
				</TouchableOpacity>}
			<GestureDetector gesture={gesture}>
				<View style={{height: SCREEN_HEIGHT, backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
					<View style={{height: '100%', borderRadius: 25, backgroundColor: '#FFF'}}>
						<View onLayout={(event) => {childHeight.value = event.nativeEvent.layout.height}}>
							<View style={{width: 75, height: 4, margin: 16, backgroundColor: 'lightgrey', alignSelf: 'center', borderRadius: 50}}/>
							{props.children}
						</View>
					</View>
				</View>
			</GestureDetector>
		</Animated.View>
	);
}

export default React.forwardRef(BottomSheet);

