import React, {
	useEffect,
	useState,
	forwardRef,
	useImperativeHandle
} from 'react';
import { View, StyleSheet, Animated, Image, Text } from 'react-native';
import { Faction } from '../models/Faction';

const colors = [
	'red',
	'blue',
	'yellow',
	'green',
	'orange',
	'cyan',
	'plum',
	'gray',
	'purple'
];
const TOUCH_SIZE = 100;
const TIME_NEEDED = 1500;
const SCALE_ANIMATION_DURATION = 1500;
const SHRINK_ANIMATION_DURATION = 100;
const SHRINK_ANIMATION_DURATION_RANGE = 250;

export type ParticipantTargetProps = {
	item;
	index;
	onReadyCallback;
	dispatched: boolean;
	faction: Faction;
};

export const ParticipantTarget = forwardRef(
	(
		{
			item,
			index,
			onReadyCallback,
			dispatched,
			faction
		}: ParticipantTargetProps,
		ref
	) => {
		const scale = 1 + (item.force || 0) * 2;
		const startOpacity = 0.6;

		const [pulsePercantageValue] = useState(new Animated.Value(scale));
		const [opacityPercentageValue] = useState(
			new Animated.Value(startOpacity)
		);
		const [animation, setAnimation] = useState(
			{} as Animated.CompositeAnimation
		);

		const startTimer = () => {
			return setTimeout(() => {
				onReadyCallback(index);
			}, TIME_NEEDED);
		};

		const startScaleAndOpacityAnimation = () => {
			Animated.timing(opacityPercentageValue, {
				toValue: 1,
				duration: TIME_NEEDED
			}).start();

			const pulseAnimation = Animated.timing(pulsePercantageValue, {
				toValue: 3,
				duration: SCALE_ANIMATION_DURATION
			});

			setAnimation(pulseAnimation);

			Animated.loop(pulseAnimation).start();
		};

		useEffect(() => {
			const handler = startTimer();
			startScaleAndOpacityAnimation();

			//when componenet is destroyed
			return () => {
				clearTimeout(handler);
			};
		}, []);

		useImperativeHandle(ref, () => ({
			shrink(destroyCallback: (index) => void) {
				animation.stop();
				Animated.spring(pulsePercantageValue, {
					toValue: 0,
					speed: 20
				}).start(() => destroyCallback(index));
			}
		}));

		const pulsePercentage = pulsePercantageValue.interpolate({
			inputRange: [0, 1, 1.9, 3],
			outputRange: [0, 1, 1.1, 1]
		});

		const opacityPercentage = opacityPercentageValue.interpolate({
			inputRange: [startOpacity, 1],
			outputRange: [0.6, 1]
		});

		return (
			<View>
				{/* {!dispatched ? null : (
					<Text
						style={[
							styles.text,
							{
								top: item.pageY - TOUCH_SIZE,
								left: item.pageX - TOUCH_SIZE / 2
							}
						]}
					>
						{faction.name}
					</Text>
				)} */}
				<Animated.View
					style={[
						styles.touch,
						{
							transform: [
								{ translateX: -TOUCH_SIZE / 2 },
								{ translateY: -TOUCH_SIZE / 2 },
								{ scale: pulsePercentage }
							],
							opacity: opacityPercentage,
							backgroundColor: faction?.color
								? faction?.color
								: colors[index % colors.length],
							top: item.pageY,
							left: item.pageX
						}
					]}
				>
					{faction?.image ? (
						<Image source={faction?.image} style={styles.image} />
					) : null}
				</Animated.View>
			</View>
		);
	}
);

const styles = StyleSheet.create({
	touch: {
		position: 'absolute',
		aspectRatio: 1,
		width: TOUCH_SIZE,
		borderRadius: TOUCH_SIZE / 2
	},
	text: {
		position: 'absolute',
		color: 'white',
		zIndex: 10,
		fontSize: 20,
		alignItems: 'center',
		backgroundColor: 'blue'
	},
	image: {
		width: TOUCH_SIZE,
		height: TOUCH_SIZE
	}
});
