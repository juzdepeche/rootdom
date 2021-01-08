import React from 'react';
import renderer from 'react-test-renderer';
import { Factions } from '../../src/models/Faction';
import MultiTouch from '../../src/components/MultiTouch';

describe('<MultiTouch />', () => {
	it('renders correctly', () => {
		const multiTouch = renderer
			.create(<MultiTouch factions={[...Factions]}></MultiTouch>)
			.toJSON();
		expect(multiTouch).toMatchSnapshot();
	});
});
