import React from 'react';
import renderer from 'react-test-renderer';
import { Factions } from '../../src/models/Faction';
import ParticipantTarget from '../../src/components/ParticipantTarget';

jest.useFakeTimers();

describe('<ParticipantTarget />', () => {
	it('renders correctly', () => {
		const key = 1;
		const ref = { current: {} } as any;
		const touch = { pageX: 100, pageY: 200 };
		const onReadyCallback = () => true;
		const dispatched = false;
		const faction = Factions[0];
		spyOn(React, 'createRef').and.returnValue(ref);
		const participantTarget = renderer
			.create(
				<ParticipantTarget
					key={key}
					ref={ref}
					item={touch}
					index={key}
					onReadyCallback={onReadyCallback}
					dispatched={dispatched}
					faction={faction}
				></ParticipantTarget>
			)
			.toJSON();
		expect(participantTarget).toMatchSnapshot();
	});
});
