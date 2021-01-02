import React, { Component } from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import { MultiTouchView } from '../../lib/multi-touch';
import { Faction } from '../models/Faction';
import {
	ParticipantTarget,
	ParticipantTargetProps
} from '../participant/ParticipantTarget';

const SHOW_TIME = 4000;

class Participant {
	public ready = false;
	public faction: Faction;
	public ref;

	constructor() {
		this.ref = React.createRef();
	}
}

export default class MultiTouch extends Component<{ factions: Faction[] }> {
	get ViableGameSums() {
		const sums = [];
		sums[2] = 17;
		sums[3] = 18;
		sums[4] = 21;
		sums[5] = 25;
		sums[6] = 28;
		return sums;
	}

	state = {
		//https://stackoverflow.com/a/38378350
		touches: {},
		dispatched: false
	};

	participants: Participant[] = [];
	dispatchedParticipantsCount = 0;
	showing = false;

	touchProps = {
		onTouchBegan: (event) => {
			if (this.showing) return;

			this.participants = this.participants.filter(
				(participant) => !!participant
			);

			if (
				this.state.dispatched ||
				this.participants.length >= this.props.factions.length
			)
				return;

			const { identifier } = event;
			this.setState((previous) => ({
				touches: {
					...previous.touches,
					[identifier]: event
				}
			}));
			this.participants[identifier] = new Participant();
		},
		onTouchMoved: (event) => {
			if (this.showing) return;

			const { identifier } = event;
			if (!this.participants[identifier]) return;
			this.setState((previous) => ({
				touches: {
					...previous.touches,
					[identifier]: event
				}
			}));
		},
		onTouchEnded: (event) => this.onTouchRemoved(event),
		onTouchCancelled: (event) => this.onTouchRemoved(event)
	};

	onTouchRemoved = (event) => {
		if (this.showing) return;
		const { identifier, deltaX, deltaY, isTap } = event;

		this.participants = this.participants.filter(
			(participant) => !!participant
		);
		if (this.state.dispatched && !this.participants[identifier]) return;

		if (this.state.dispatched) {
			this.dispatchedParticipantsCount--;
			if (this.dispatchedParticipantsCount <= 0) {
				this.showFactions();
			}
			return;
		}

		if (!this.participants[identifier]) return;
		// this.participants[identifier].ref.current.shrink(this.resetParticipantTarget);
		this.resetParticipantTarget(identifier);
	};

	showFactions = () => {
		this.showing = true;
		setTimeout(() => {
			const keys = this.participants.keys();
			for (const key of keys) {
				this.participants[key].ref.current.shrink(
					this.deleteParticipant
				);
			}
			this.showing = false;
			this.setState({ dispatched: false });
		}, SHOW_TIME);
	};

	participantReady = (index) => {
		if (!this.participants[index]) return;
		this.participants[index].ready = true;
		this.dispatchRoles();
	};

	dispatchRoles = () => {
		this.participants = this.participants.filter(
			(participant) => !!participant
		);
		if (
			this.participants.length > 1 &&
			this.participants.every((p) => p.ready)
		) {
			Vibration.vibrate(100);
			const factions = this.getFactions(this.participants.length);
			this.participants.forEach((participant) => {
				participant.faction = factions.shift();
			});
			this.setState({ dispatched: true });
			this.dispatchedParticipantsCount = this.participants.length;
		}
	};

	getFactions = (playerCount: number): Faction[] => {
		let factionValueSum = 0;
		let factions = [] as Faction[];
		const minimumValueSum = this.ViableGameSums[playerCount];

		let allFactionsValueSum = 0;
		let isImpossibleFactionValueSum = false;
		this.props.factions.forEach((faction) => {
			allFactionsValueSum += faction.value;
		});
		isImpossibleFactionValueSum = allFactionsValueSum < minimumValueSum;

		do {
			factionValueSum = 0;
			factions = this.shuffleFactions();

			for (let i = 0; i < playerCount; i++) {
				factionValueSum += factions[i].value;
			}
		} while (
			factionValueSum <= minimumValueSum &&
			!isImpossibleFactionValueSum
		);
		return factions;
	};

	resetParticipantTarget = (identifier) => {
		this.setState((previous) => ({
			touches: {
				...previous.touches,
				[identifier]: null
			}
		}));
		this.setState({ dispatched: false });
		delete this.participants[identifier];
	};

	private shuffleFactions = () => {
		const { factions } = this.props;
		const roles: Faction[] = [];
		factions.forEach((faction) => {
			roles.push(faction);
		});

		const max = roles.length;
		for (let i = 0; i < roles.length - 1; i++) {
			let randomIndex = Math.floor(Math.random() * (max - i) + i);
			const tempItem = roles[randomIndex];
			roles[randomIndex] = roles[i];
			roles[i] = tempItem;
		}

		return roles;
	};

	deleteParticipant = (index) => {
		delete this.participants[index];
		this.setState((previous) => ({
			touches: {
				...previous.touches,
				[index]: null
			}
		}));
	};

	render() {
		const { touches, dispatched } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<MultiTouchView style={{ flex: 1 }} {...this.touchProps}>
					<View style={styles.container}>
						{Object.values(touches).map((item, index) => {
							if (!item || !this.participants[index]) {
								return null;
							}
							return (
								<ParticipantTarget
									key={index}
									ref={this.participants[index].ref}
									item={item}
									index={index}
									onReadyCallback={this.participantReady}
									dispatched={dispatched}
									faction={this.participants[index].faction}
								/>
							);
						})}
					</View>
				</MultiTouchView>
			</View>
		);
	}
}

const TOUCH_SIZE = 100;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000'
	},
	touch: {
		position: 'absolute',
		aspectRatio: 1,
		width: TOUCH_SIZE,
		borderRadius: TOUCH_SIZE / 2
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#34495e'
	}
});
