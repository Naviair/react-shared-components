/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-default-export */
import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { IconName, Views } from '../src/Components';
const { DocumentView } = Views;
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY, Stories } from '@storybook/addon-docs';
import { IDocument } from '@naviair/node-shared-interfaces';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Views/DocumentView',
	component: DocumentView,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{' Naviair DocumentView component '}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
					<Stories />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof DocumentView>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof DocumentView>> = (args) => {
	return <DocumentView {...args} />;
};

/** Typically from configuration */
const singleDocument: IDocument<IconName> = {
	_id: '1234',
	title: 'Betingelser for brug af Naviair UTM',
	icon: 'badge-check',
	lastUpdated: 1628757627,
	language: 'da-DK',
	configurations: ['ObjectId(afd2bff0c4d4b2307ae001j2)'],
	content: [
		{
			html: {
				data: '<div style="text-align:left"><h3>Document &lt;h3&gt; title</h3><p>Everything is HTML.<br/>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto at et consequatur sit laborum deserunt tenetur explicabo quaerat in omnis voluptates voluptas vitae iure, rerum, quasi ipsam iste necessitatibus non!</p><br/><br/><p>The linebreaks are made with &lt;br&gt;.<br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas consequuntur ut incidunt enim cum reprehenderit placeat nobis odit vero dolore doloribus ipsam provident facere dicta ducimus animi, facilis eligendi!</p></div>',
			},
		},
	],
};

export const Single_Document = Template.bind({});
Single_Document.args = {
	document: singleDocument,
};
