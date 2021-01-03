import React from 'react';
import renderer from 'react-test-renderer';
import { Factions } from '../models/Faction';
import { DrawerContent } from './DrawerContent';

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
