import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { DropDown } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { faUser } from '@fortawesome/pro-regular-svg-icons/faUser';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/DropDown',
	component: DropDown,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description> Dropdown implementation using Ant Design </Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof DropDown>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof DropDown>> = (args) => {
	return (
		<DropDown
			{...args}
			menu={{
				items: [
					{
						label: 'Profile',
						key: 'profile',
					},
					{
						label: 'Settings',
						key: 'settings',
					},
					{
						label: 'Log out ',
						key: 'log out',
					},
				],
			}}
		/>
	);
};

export const Example = Template.bind({});
Example.args = {
	trigger: ['hover'],
	icon: faUser,
};
