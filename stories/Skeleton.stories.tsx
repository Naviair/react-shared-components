import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Skeleton } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description> Skeleton loader animation </Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Skeleton>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Skeleton>> = (args) => <Skeleton {...args} />;

export const Example = Template.bind({});
Example.args = {
	lines: [
		{ leftMarg: '10', topMarg: '15', width: '250', height: '7' },
		{ leftMarg: '10', topMarg: '30', width: '300', height: '7' },
		{ leftMarg: '10', topMarg: '45', width: '300', height: '7' },
	],
};
