import React, { Component } from 'react';
import { LogBox, StatusBar, StyleSheet, View } from 'react-native';
import BouncyDrawer from 'react-native-bouncy-drawer';
import { DrawerContent } from './src/components/DrawerContent';
import MultiTouch from './src/components/MultiTouch';
import { Factions } from './src/models/Faction';

export default class App extends Component {
	state = {
		factions: [...Factions],
		usedFactions: [...Factions]
	};

	componentDidMount() {
		LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
	}

	render() {
		StatusBar.setHidden(true, 'slide');
		const { usedFactions } = this.state;

		return (
			<View style={styles.container}>
				<MultiTouch factions={usedFactions}></MultiTouch>
				<BouncyDrawer
					willOpen={() => null}
					didOpen={() => null}
					willClose={() => null}
					didClose={() => null}
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
