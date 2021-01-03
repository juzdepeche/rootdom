import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

type TextCheckBoxProps = {
	text: string;
	onFactionToggle: (factionName: string, isSelected: boolean) => void;
};

export const TextCheckBox = ({ text, onFactionToggle }: TextCheckBoxProps) => {
	const [isSelected, setIsSelected] = useState(true);

	const onToggle = () => {
		onFactionToggle(text, !isSelected);
		setIsSelected(!isSelected);
	};

	return (
		<TouchableOpacity onPress={() => onToggle()} style={styles.item}>
			<CheckBox value={isSelected} onChange={() => onToggle()} />
			<Text
				style={[
					{
						...styles.checkBoxTxt,
						color: isSelected ? '#364f6b' : 'gray',
						fontWeight: isSelected ? 'bold' : 'normal',
						fontSize: 20
					}
				]}
				onPress={() => onToggle()}
			>
				{text}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	item: {
		width: '100%',
		backgroundColor: '#f6f6f6',
		borderRadius: 20,
		padding: 10,
		marginBottom: 10,
		flexDirection: 'row'
	},
	checkBoxTxt: {
		marginLeft: 20
	}
});
