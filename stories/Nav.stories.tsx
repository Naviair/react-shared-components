/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-default-export */
import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Nav } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { TSettingsAppMenu } from '@naviair/node-shared-interfaces';
import { BrowserRouter as Router } from 'react-router-dom';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/NavBar/Nav',
	component: Nav,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{' Naviair Nav component '}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Nav>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Nav>> = (args) => {
	return (
		<div id={'root'}>
			<Router>
				<Nav {...args} />
			</Router>
		</div>
	);
};

const navbarContent: TSettingsAppMenu[] = [
	{
		name: 'map',
		title: 'Kort',
		icon: 'map',
		link: '/iframe.html',
		tooltip: 'test',
		external: false,
	},
	{
		name: 'operation',
		title: 'Plan',
		icon: 'map-marked-alt',
		link: '/app/list/operation',
		tooltip: 'test',
		external: false,
	},
	{
		name: 'equipment',
		title: 'Udstyr',
		icon: 'drone-alt',
		link: '/app/list/equipment',
		tooltip: 'test',
		external: false,
	},
	{
		name: 'dronerules',
		title: 'Regler',
		icon: 'clipboard-list-check',
		link: 'https://droneregler.dk',
		tooltip: 'test',
		external: true,
	},
	{
		name: 'help',
		title: 'Hjælp',
		icon: 'question-circle',
		link: '/app/pages/help',
		tooltip: 'test',
		external: false,
	},
	{
		name: 'about',
		title: 'Om',
		icon: 'info-circle',
		link: '/app/pages/about',
		tooltip: 'test',
		external: false,
	},
];
export const Regular = Template.bind({});
Regular.args = {
	content: navbarContent,
};
