import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { LoaderSquare } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/LoaderSquare',
	component: LoaderSquare,
	controls: null,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description> Global loader effect for Naviair projects </Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof LoaderSquare>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof LoaderSquare>> = (args) => {
	return <LoaderSquare {...args} />;
};

export const Example = Template.bind({});
