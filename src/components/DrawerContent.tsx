import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
			<ScrollView style={styles.scrollViewContainer}>
				<View style={styles.checkboxContainer}>
					<View style={styles.centeredCheckboxContainer}>
						{factions.map((faction) => (
							<TextCheckBox
								key={faction.name}
								text={faction.name}
								selected={faction.available}
								onFactionToggle={onFactionToggle}
							></TextCheckBox>
						))}
					</View>
				</View>
			</ScrollView>
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
		color: '#364f6b'
	},
	scrollViewContainer: {
		width: '100%',
		marginVertical: 40
	},
	checkboxContainer: {
		width: '100%',
		alignItems: 'center'
	},
	centeredCheckboxContainer: {
		width: '80%'
	}
});
