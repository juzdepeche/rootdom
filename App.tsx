import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import MultiTouch from './src/multi-touch/MultiTouch';
import PickerCheckBox from 'react-native-picker-checkbox';
import { Checkbox } from 'react-native-paper';
import BouncyDrawer from 'react-native-bouncy-drawer';
import Constants from 'expo-constants';
import { DrawerContent } from './src/drawer-content/DrawerContent';
import { Factions } from './src/models/Faction';

export default class App extends Component {
	state = {
		factions: [...Factions],
		usedFactions: [...Factions]
	};

	render() {
		StatusBar.setHidden(true, 'slide');
		const { usedFactions } = this.state;

		return (
			<View style={styles.container}>
				<MultiTouch factions={usedFactions}></MultiTouch>
				<BouncyDrawer
					titleStyle={{ color: '#fff', fontSize: 20, marginLeft: -3 }}
					closedHeaderStyle={{ backgroundColor: 'transparent' }}
					openedHeaderStyle={{ backgroundColor: 'transparent' }}
					defaultOpenButtonIconColor="#fff"
					defaultCloseButtonIconColor="#000"
					renderContent={this.renderContent}
					closeBounciness={0}
					closeSpeed={35}
				/>
			</View>
		);
	}

	renderContent = () => {
		return (
			<DrawerContent
				factions={this.state.factions}
				onFactionToggle={this.onFactionToggle}
			/>
		);
	};

	onFactionToggle = (factionName: string, isSelected: boolean) => {
		let newFactions = [];
		if (!isSelected) {
			newFactions = this.state.usedFactions.filter(
				(faction) => faction.name !== factionName
			);
		} else {
			const newFaction = this.state.factions.filter(
				(faction) => faction.name === factionName
			);
			newFactions = this.state.usedFactions;
			newFactions.push(newFaction[0]);
		}
		this.setState({
			usedFactions: newFactions
		});
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	black: {
		backgroundColor: '#000'
	}
});
