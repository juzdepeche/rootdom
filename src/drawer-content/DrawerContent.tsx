import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextCheckBox } from './TextCheckBox';
import { Faction } from '../../App';

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
