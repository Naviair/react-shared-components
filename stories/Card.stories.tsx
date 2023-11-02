import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Card } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSoftServe } from '@fortawesome/pro-light-svg-icons/faSoftServe';
import { faQuestionCircle } from '@fortawesome/pro-light-svg-icons/faQuestionCircle';

library.add(faSoftServe, faQuestionCircle);

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description> Naviair Card container </Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Card>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Card>> = (args) => {
	return (
		<Card {...args}>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam voluptates impedit, saepe possimus labore expedita? Nostrum iusto saepe, eveniet ea
				ipsam, dolor molestiae earum aspernatur sit iste aperiam nam. Neque! <br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eligendi nesciunt sed voluptates. Vitae ullam nam laudantium expedita delectus cumque, a,
				culpa quidem unde voluptatibus excepturi dolore? Non, recusandae aspernatur. <br /> <br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis nesciunt, aut iusto veniam quod repellat laborum quis, accusamus corrupti
				aperiam consequuntur rem reprehenderit magni nulla omnis ad dicta at! Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem saepe neque harum,
				architecto magnam ut sequi illum rerum explicabo placeat aliquam quo consequatur iusto! Totam quos magnam animi nostrum alias?
			</p>
		</Card>
	);
};

export const Small = Template.bind({});
Small.args = {
	icon: 'question-circle',
	title: 'Card Small',
	type: 'small',
	fill: true,
	textAlign: 'left',
};

export const Regular = Template.bind({});
Regular.args = {
	icon: 'question-circle',
	title: 'Card Regular',
	type: 'regular',
	fill: true,
	textAlign: 'left',
};
