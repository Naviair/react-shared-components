/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-default-export */
import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Views, IconName } from '../src/Components';
const { PageView } = Views;
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY, Stories } from '@storybook/addon-docs';
import { IConfiguration, IPage } from '@naviair/node-shared-interfaces';
import { Button } from 'antd';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDatabase } from '@fortawesome/pro-light-svg-icons/faDatabase';

library.add(faDatabase);

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Views/PageView',
	component: PageView,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{' Naviair PageView component '}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
					<Stories />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof PageView>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof PageView>> = (args) => {
	return <PageView {...args} />;
};
/** Typically from configuration */
const pages: IPage<IconName>[] = [
	{
		_id: 'ObjectId(5fd9bff0e4d4b2207ae001f8)',
		configurations: ['ObjectId(afd2bff0c4d4b2307ae001j2)'],
		name: 'PageView with a single page referencing a single document',
		language: 'en-US',
		data: [
			{
				icon: 'database',
				title: 'Page title',
				documentId: '1234',
			},
		],
	},
	{
		_id: 'ObjectId(abd2cde5e4d4b2207ae007j1)',
		configurations: ['ObjectId(afd2bff0c4d4b2307ae001j2)'],
		name: 'PageView with a single page referencing two documents',
		language: 'en-US',
		data: [
			{
				icon: 'database',
				title: 'Page title',
				documentId: '1234',
			},
			{
				icon: 'download',
				title: 'Second page title',
				documentId: '4321',
			},
		],
	},
];

/** Typically from configuration */
const singleDocument: IConfiguration['documents'] = {
	'1234': {
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
	},
};

/** Typically from configuration */
const multipleDocumentsCol = {
	...singleDocument,
	...{
		'4321': {
			_id: '4321',
			title: 'Andet info om Naviair UTM',
			// icon: 'badge-check',
			lastUpdated: 1628757627,
			language: 'da-DK',
			configurations: ['ObjectId(afd2bff0c4d4b2307ae001j2)'],
			content: [
				{
					html: {
						data: '<div style="text-align:left"><h3 style="color: blue;">This is a different document than the one above</h3><p>The blue text is written as inline CSS. <br/><br/>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto at et consequatur sit laborum deserunt tenetur explicabo quaerat in omnis voluptates voluptas vitae iure, rerum, quasi ipsam iste necessitatibus non!</p><br/><br/><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas consequuntur ut incidunt enim cum reprehenderit placeat nobis odit vero dolore doloribus ipsam provident facere dicta ducimus animi, facilis eligendi!</p></div>',
					},
				},
			],
		},
	},
};

export const Single_Document = Template.bind({});
Single_Document.args = {
	page: pages[0],
	documents: singleDocument,
	children: undefined,
};

export const MultipleDocuments = Template.bind({});
MultipleDocuments.args = {
	page: pages[1],
	documents: multipleDocumentsCol,
	children: undefined,
};

export const withChildren = Template.bind({});
withChildren.args = {
	page: { ...pages[1], name: pages[1].name + ' (with children)' },
	documents: multipleDocumentsCol,
	children: (
		<div style={{ backgroundColor: 'mediumseagreen', margin: '5px' }}>
			<hr />
			<p>{'We now have a button child element (and this text)'}</p>
			<Button type={'primary'} onClick={() => alert('Child button Clicked')}>
				{'Child button'}
			</Button>
		</div>
	),
};
