import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { ITab, Tab } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMap as faSolidMap } from '@fortawesome/pro-solid-svg-icons/faMap';
import { faMap as faLightMap } from '@fortawesome/pro-light-svg-icons/faMap';
import { Button } from 'antd';

/**
 * Add imported icons in project here, or use Icon component
 **/
library.add(faSolidMap, faLightMap);

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Tab',
	component: Tab,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{' Naviair Tab component '}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Tab>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Tab>> = (args) => {
	return (
		<div id={'root'}>
			<Router>
				<Tab {...args} />
			</Router>
		</div>
	);
};

const tabBarContent: ITab = {
	tabs: [
		{
			title: 'Test #1',
			// icon: 'map',
			children: <>Random content...</>,
		},
		{
			title: 'Test #2',
			icon: 'map',
			tabKey: 'key#2',
		},
		{
			title: 'Test #3',
			icon: 'map',
		},
	],
	onChange: (tab) => {
		console.log('Callback - tab selected: ', tab);
		const t = tabBarContent.tabs[Number(tab)];

		if (Number(tab) == 1) {
			tabBarContent.tabs[Number(tab)].children = (
				<>
					Tab Selected: {tab} - {t.title}
				</>
			);
		}
	},
	tabBarExtraContent: <Button>Extra Button</Button>,
};

export const Example = Template.bind({});
Example.args = {
	...tabBarContent,
};
