import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import MultiTouch from './src/multi-touch/MultiTouch';
import PickerCheckBox from 'react-native-picker-checkbox';
import { Checkbox } from 'react-native-paper';
import BouncyDrawer from 'react-native-bouncy-drawer';
import Constants from 'expo-constants';
import { DrawerContent } from './src/drawer-content/DrawerContent';
import images from './assets/images';

const items = [
	{
		itemKey: 1,
		itemDescription: 'Item 1'
	},
	{
		itemKey: 2,
		itemDescription: 'Item 2'
	},
	{
		itemKey: 3,
		itemDescription: 'Item 3'
	}
];

export class Faction {
	public name: string;
	public value: number;
	public color: string;
	public image;

	constructor(name: string, value: number, color: string, image?) {
		this.name = name;
		this.value = value;
		this.color = color;
		this.image = image;
	}
}

export default class App extends Component {
	state = {
		factions: [
			new Faction('Marquise de Cat', 10, '#FD5200', images.cat),
			new Faction('Underground Duchy', 8, '#D7A872', images.taupe),
			new Faction('Eyrie Dynasties', 7, '#4774B7', images.bird),
			new Faction('Vagabond', 5, '#FCFEFD', images.vagabond),
			new Faction('Riverfolk Company', 5, '#61DDFB', images.otter),
			new Faction('Woodland Alliance', 3, '#59BA53', images.mouse),
			new Faction('Corvid Consipiracy', 3, '#290D7E', images.raven),
			new Faction('Lizard Cult', 2, '#f1f435', images.lizard)
		],
		usedFactions: [
			new Faction('Marquise de Cat', 10, '#FD5200', images.cat),
			new Faction('Underground Duchy', 8, '#D7A872', images.taupe),
			new Faction('Eyrie Dynasties', 7, '#4774B7', images.bird),
			new Faction('Vagabond', 5, '#FCFEFD', images.vagabond),
			new Faction('Riverfolk Company', 5, '#61DDFB', images.otter),
			new Faction('Woodland Alliance', 3, '#59BA53', images.mouse),
			new Faction('Corvid Consipiracy', 3, '#290D7E', images.raven),
			new Faction('Lizard Cult', 2, '#f1f435', images.lizard)
		]
	};

	render() {
		StatusBar.setHidden(true, 'slide');
		const { usedFactions } = this.state;

		return (
			<View style={styles.container}>
				<MultiTouch factions={usedFactions}></MultiTouch>
				<BouncyDrawer
					willOpen={() => console.log('will open')}
					didOpen={() => console.log('did open')}
					willClose={() => console.log('will close')}
					didClose={() => console.log('did close')}
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

	onCheckBoxSelected = () => {
		this.setState({});
	};

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
				faction => faction.name !== factionName
			);
		} else {
			const newFaction = this.state.factions.filter(
				faction => faction.name === factionName
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
