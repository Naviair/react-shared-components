/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-default-export */
import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { MainLayout, Header, Nav, NavMobile } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY, Stories } from '@storybook/addon-docs';
import { EScreenType, TSettingsAppMenu } from '@naviair/node-shared-interfaces';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from '../src/Assets/Logo.svg';
import { faMap } from '@fortawesome/pro-light-svg-icons/faMap';
import { faMapMarkedAlt } from '@fortawesome/pro-light-svg-icons/faMapMarkedAlt';
import { faDroneAlt } from '@fortawesome/pro-light-svg-icons/faDroneAlt';
import { faClipboardListCheck } from '@fortawesome/pro-light-svg-icons/faClipboardListCheck';
import { faQuestionCircle } from '@fortawesome/pro-light-svg-icons/faQuestionCircle';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons/faInfoCircle';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faMap, faMapMarkedAlt, faDroneAlt, faClipboardListCheck, faQuestionCircle, faInfoCircle);

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Layout/MainLayout',
	component: MainLayout,
	subcomponents: { Header, Nav, NavMobile },
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>
						{
							" Naviair MainLayout component<br/>Be aware of the enclosing components (&lt;div id={'root'}&gt; and &lt;Router&gt; component)<br/>Note that the link color is based on Antd, so it has to be overwritten (See AntDesign.less)"
						}
					</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
					<Stories />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof MainLayout>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof MainLayout>> = (args) => {
	const navbar = args.screenState == EScreenType.DESKTOP ? <Nav content={navbarContent} /> : <NavMobile content={navbarContent} />;
	return (
		<div id={'root'}>
			<Router>
				<MainLayout {...args} navbar={navbar} />
			</Router>
		</div>
	);
};

/** Typically loaded from configuration */
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

const headerContent = {
	right: <p> {'Content right'} </p>,
	left: <p> {'Content left'} </p>,
	logo: <img src={logo} alt={logo} />,
};

export const Regular = Template.bind({});
Regular.args = {
	screenState: EScreenType.DESKTOP,
	loadOverlayProps: {
		loading: false,
		title: 'Overlay title',
		subtitle: 'Overlay subtitle',
	},
	children: (
		<div style={{ height: 'auto', width: 'auto', maxHeight: 'none', verticalAlign: 'middle' }}>
			<p style={{ textAlign: 'center' }}>{"The main layout scales to the parent div (typically React 'Root') and the content div"}</p>
		</div>
	),
	header: <Header {...headerContent} />,
};
