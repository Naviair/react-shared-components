import React, { useState, ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Modal } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Modal',
	component: Modal,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>Modal popup implementation using Ant Design</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Modal>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Modal>> = (args) => {
	const [open, setopen] = useState(false);
	return (
		<div>
			<a onClick={open ? () => setopen(false) : () => setopen(true)}>click here to toggle modal </a>
			<Modal {...args} open={open} onOk={() => setopen(false)} onClose={() => setopen(false)}>
				{' '}
				Some content here{' '}
			</Modal>
		</div>
	);
};

export const Regular = Template.bind({});
Regular.args = {
	title: 'Modal',
};
