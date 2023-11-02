/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-default-export */
import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Views } from '../src/Components';
const { MaintenanceView } = Views;
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY, Stories } from '@storybook/addon-docs';
import { EScreenType } from '@naviair/node-shared-interfaces';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Views/MaintenanceView',
	component: MaintenanceView,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{'Naviair MaintenanceView'}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
					<Stories />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof MaintenanceView>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof MaintenanceView>> = (args) => {
	return (
		<div id={'root'} style={{ height: '85vh', width: '85vw' }}>
			<MaintenanceView {...args} />
		</div>
	);
};

export const Regular = Template.bind({});
Regular.args = {
	screenState: EScreenType.DESKTOP,
	title: 'Naviair MaintenanceView Title',
	subtitle: [
		'Siden er midlertidigt nede for planlagt opdatering. Siden forventes at være oppe igen kl. 16.00',
		'Senest opdateret den 23/08-2021 kl. 13.40.',
		'Bottom Text',
	],
};

export const WithChildren = Template.bind({});
WithChildren.args = {
	screenState: EScreenType.MOBILE,
	title: 'Naviair MaintenanceView Title',
	subtitle: 'Single subtitle (not an array)',
	children: <div style={{ backgroundColor: 'lightblue' }}>{`The current time is ${new Date().toTimeString()} (this is a children div)`}</div>,
};
