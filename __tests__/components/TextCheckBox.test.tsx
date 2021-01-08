import React from 'react';
import renderer from 'react-test-renderer';
import { Factions } from '../../src/models/Faction';
import TextCheckBox from '../../src/components/TextCheckBox';

describe('<DrawerContent />', () => {
	it('renders correctly', () => {
		const factionName = Factions[0].name;
		const onFactionToggle = () => true;
		const textCheckBox = renderer
			.create(
				<TextCheckBox
					key={factionName}
					text={factionName}
					onFactionToggle={onFactionToggle}
				></TextCheckBox>
			)
			.toJSON();
		expect(textCheckBox).toMatchSnapshot();
	});
});
