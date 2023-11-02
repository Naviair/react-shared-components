import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Card, Error, SingleLayout } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { faHome } from '@fortawesome/pro-regular-svg-icons/faHome';
import { faExclamationCircle } from '@fortawesome/pro-light-svg-icons/faExclamationCircle';
import { Button } from 'antd';
import './errorStyles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faExclamationCircle);

//👇 This default export determines where your story goes in the story list
// eslint-disable-next-line import/no-default-export
export default {
	title: 'Components/Error',
	component: Error,
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{'Error component implementation for Naviair projects'}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Error>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Error>> = (args) => {
	return (
		<SingleLayout>
			<Card fill textAlign={'center'} type={'small'} title={args.errorTitle} icon={'exclamation-circle'}>
				<h3>
					{'Error'} {'418'}
				</h3>
				<div>{"I'm a teapot"}</div>
				<div className={'errorBtnContainer'}>
					<Button type={'primary'} icon={<FontAwesomeIcon icon={faHome} />} onClick={() => console.log("navigate(' / ')")}>
						{args.buttonText}
					</Button>
				</div>
			</Card>
		</SingleLayout>
	);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Regular = Template.bind({});
Regular.args = {
	errorTitle: 'Der skete en fejl',
	buttonText: 'Hjem',
};
