import * as React from 'react';
import { View } from 'react-native';

import Svg, {
	Circle,
	Ellipse,
	G,
	Text,
	TSpan,
	TextPath,
	Path,
	Polygon,
	Polyline,
	Line,
	Rect,
	Use,
	Image,
	Symbol,
	Defs,
	LinearGradient,
	RadialGradient,
	Stop,
	ClipPath,
	Pattern,
	Mask
} from 'react-native-svg';

export const SvgComponent = (props) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', padding: 0 }}>
			<Svg height="100%" width="100%" viewBox="0 0 300 300" {...props}>
				<G id="circle">
					<Circle
						r={100}
						x={150}
						y={150}
						fill="none"
						stroke="none"
						strokeWidth={0}
						transform="rotate(-135)"
					/>
				</G>
				<Text fontSize="14">
					<Text fontSize="14">
						<TextPath href="#circle">
							<TSpan dy={0}>Text along a curved path...</TSpan>
						</TextPath>
					</Text>
				</Text>
			</Svg>
		</View>
	);
};
