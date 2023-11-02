/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-default-export */
import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { SingleLayout } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY, Stories } from '@storybook/addon-docs';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Layout/SingleLayout',
	component: SingleLayout,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{'Naviair SingleLayout component'}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
					<Stories />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof SingleLayout>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof SingleLayout>> = (args) => {
	return <SingleLayout {...args} />;
};

export const Regular = Template.bind({});
Regular.args = {
	fill: false,
	children: (
		<div style={{ height: '75vh', width: '75vw', verticalAlign: 'middle', display: 'table-cell', backgroundColor: 'lightblue' }}>
			<p style={{ textAlign: 'center' }}>
				{'The SingleLayout scales to the parent div and the child element.'}
				<br />
				{' Based on the fill property it will invoke 50px padding. The lightblue color is added as an example to showcase the effect.'}
			</p>
		</div>
	),
};
