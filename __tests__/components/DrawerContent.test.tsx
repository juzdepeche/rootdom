import React from 'react';
import renderer from 'react-test-renderer';
import { Factions } from '../../src/models/Faction';
import { DrawerContent } from '../../src/components/DrawerContent';

describe('<DrawerContent />', () => {
	it('renders correctly', () => {
		const drawerContent = renderer
			.create(
				<DrawerContent
					factions={[...Factions]}
					onFactionToggle={() => null}
				></DrawerContent>
			)
			.toJSON();
		expect(drawerContent).toMatchSnapshot();
	});
});
