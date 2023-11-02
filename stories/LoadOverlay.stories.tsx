/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-default-export */
import React, { ComponentProps, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { LoadOverlay } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/LoadOverlay',
	component: LoadOverlay,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{' Naviair LoadOverlay component '}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof LoadOverlay>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof LoadOverlay>> = (args) => {
	const [getLoading, setLoading] = useState(true);
	return (
		<>
			<a onClick={() => setLoading(!getLoading)}>{'Click me to trigger loading'}</a>
			{getLoading && <LoadOverlay {...args} />}
			<p>{'Content loaded'}</p>
		</>
	);
};

export const Regular = Template.bind({});
Regular.args = {
	loading: true,
	title: 'Naviair UTM',
	subtitle: 'Powered by Naviair',
};
