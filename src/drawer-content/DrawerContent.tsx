import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Faction } from '../models/Faction';
import { TextCheckBox } from './TextCheckBox';

type DrawerContentProps = {
	factions: Faction[];
	onFactionToggle: (factionName: string, isSelected: boolean) => void;
};

export const DrawerContent = ({
	factions,
	onFactionToggle
}: DrawerContentProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Factions</Text>
			<View style={styles.checkboxContainer}>
				{factions.map((faction) => (
					<TextCheckBox
						key={faction.name}
						text={faction.name}
						onFactionToggle={onFactionToggle}
					></TextCheckBox>
				))}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		marginTop: 20
	},
	header: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#364f6b',
		marginBottom: 40,
		paddingTop: 40
	},
	checkboxContainer: {
		width: '80%',
		alignItems: 'center'
	}
});
