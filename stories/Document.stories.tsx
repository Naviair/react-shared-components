/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-default-export */
import React, { ComponentProps, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Card, Document, IconName, SingleLayout } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSoftServe } from '@fortawesome/pro-light-svg-icons/faSoftServe';
import { pdfTest } from './pdfTest';

library.add(faSoftServe);

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Document',
	component: Document,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{' Naviair Document component '}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Document>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Document>> = (args) => {
	const [getOuterState, setOuterState] = useState(true);
	return (
		<>
			<a onClick={() => setOuterState(!getOuterState)}> {getOuterState ? 'Click to hide layout container' : 'Click to show layout container'}</a>
			<p>
				<i>{'(Typically documents are rendered inside a layout component)'}</i>
			</p>
			{getOuterState ? (
				<SingleLayout>
					<Card fill title={args.title} icon={args.icon as IconName}>
						<Document {...args} />
					</Card>
				</SingleLayout>
			) : (
				<Document {...args}></Document>
			)}
		</>
	);
};

export const HTMLDocument = Template.bind({});
HTMLDocument.args = {
	icon: 'soft-serve',
	// updateText: '', //default value
	language: 'daDK',
	title: 'HTML Dokument Titel',
	content: [
		{
			html: {
				title: 'Indre HTML dokument titel',
				data: '<p>Holds any HTML wanted in a string. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor reiciendis perferendis, animi deserunt eos voluptate nemo. Exercitationem vitae animi, quisquam possimus eius quos ipsam aliquid placeat perferendis voluptas porro provident.</p>',
			},
		},
	],
	_id: '1234',
	configurations: ['12345'],
	lastUpdated: 1000,
};

export const FormDocument = Template.bind({});
FormDocument.args = {
	icon: 'soft-serve',
	language: 'daDK',
	title: 'Form Dokument Titel',
	onFormSubmit: (values): Promise<void> =>
		new Promise((resolve, reject) => {
			console.log('submit', values);
			resolve();
		}),
	content: [
		{
			html: {
				title: 'Indre HTML dokument titel',
				data: '<p>Udfyld nedenstående formular og indsend for at få adgang til CRONOS.</p>',
			},
		},
		{
			form: {
				title: 'Ansøg om adgang til CRONOS',
				input: [
					{
						required: true,
						inputId: 'name',
						placeholder: 'Fornavn(e)',
						onInputErrorMessage: 'Navn er ikke gyldigt.',
						autoFocus: true,
					},
					{
						required: true,
						inputId: 'lastname',
						placeholder: 'Efternavn',
						onInputErrorMessage: 'Efternavn er ikke gyldigt.',
					},
					{
						required: true,
						inputId: 'email',
						placeholder: 'Email',
						onInputErrorMessage: 'Email er ikke gyldig.',
						inputType: 'email',
					},
					{
						required: true,
						inputId: 'phone',
						placeholder: 'Telefonnummer',
						onInputErrorMessage: 'Nummeret ikke gyldigt.',
						addonBefore: '+45',
					},
					{
						required: true,
						inputId: 'username',
						placeholder: 'Ønsket brugernavn',
						onInputErrorMessage: 'Brugernavnet ikke gyldigt.',
						addonBefore: 'ek_ext_',
					},
				],
				onFormSuccessMessage: {
					title: 'Din ansøgning blev sendt',
					subtitle: 'Din ansøgning blev sendt, og vil blive behandlet snarest',
				},
				onFormErrorMessage: {
					title: 'Din ansøgning blev ikke sendt',
					subtitle: 'Der skete en fejl under behandlingen af din ansøgning. Prøv igen, eller kontakt support',
				},
				submitButtonText: 'test',
			},
		},
	],
	_id: '1234',
	configurations: ['12345'],
	lastUpdated: 1000,
};

export const TableDocument = Template.bind({});
TableDocument.args = {
	icon: 'soft-serve',
	updateText: 'This table document was last updated',
	language: 'enUS',
	title: 'Table Document Title',
	content: [
		{
			table: {
				title: 'Inner Table Title',
				columns: [
					{ index: '1', title: 'Col 1', textAlign: 'left' },
					{ index: '2', title: 'Col 2', textAlign: 'center' },
					{ index: '3', title: 'Col 3', textAlign: 'right' },
				],
				rows: [
					{ '1': 'Row 1.1', '2': 'Row 1.2', '3': 'Row 1.3' },
					{ '1': 'Row 2.1', '2': 'Row 2.2', '3': 'Row 2.3' },
					{ '1': 'Row 3.1', '2': 'Row 3.2', '3': 'Row 3.3' },
					{ '1': 'Long text', '2': 'Some longer text', '3': 'The longest text in the row' },
				],
			},
		},
	],
	_id: '1234',
	configurations: ['12345'],
	lastUpdated: 1000,
};

export const CollapsibleDocument = Template.bind({});
CollapsibleDocument.args = {
	icon: 'soft-serve',
	// updateText: '', //default value
	language: 'daDK',
	title: 'HTML Dokument Titel',
	content: [
		{
			collapse: {
				title: 'Indre collapse dokument titel',
				data: [
					{ title: 'Title 1', details: 'Content 1' },
					{ title: 'Title 2', details: 'Content 2' },
					{ title: 'Title 3', details: 'Content 3' },
					{
						title: 'Lorem',
						details:
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam cupiditate perferendis incidunt consequatur, aspernatur facere. Rem labore dicta beatae, voluptas doloremque rerum odit reiciendis exercitationem nisi doloribus officiis veniam provident!',
					},
					{ title: 'html', details: '<p style="color: red;">This can also hold HTML text styled by inline CSS</p>' },
				],
			},
		},
	],
	_id: '1234',
	configurations: ['12345'],
	lastUpdated: new Date().getTime() / 1000,
};

export const PdfDocument = Template.bind({});
PdfDocument.args = {
	icon: 'soft-serve',
	// updateText: '', //default value
	language: 'daDK',
	title: 'PDF Dokument Titel',
	content: [
		{
			pdf: {
				title: 'Test PDF',
				data: pdfTest,
			},
		},
	],
	_id: '1234',
	configurations: ['12345'],
	lastUpdated: 1000,
};
