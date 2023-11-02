import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { Search, GeoSearch } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { message } from 'antd';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Search',
	component: Search,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{'Search and GeoSearch component implementation'}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Search>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Search>> = (args) => {
	return (
		<>
			<Search {...args} key={'search-input'}></Search>
		</>
	);
};

const Template2: Story<ComponentProps<typeof GeoSearch>> = (args) => {
	return (
		<>
			<GeoSearch {...args} key={'geosearch-key'} />
		</>
	);
};

const handleResultClick = (key?: string) => {
	message.success(`Clicked on ${key}`);
};

const handleOnChangeTest = (key: string) => {
	console.log('content ', key);
};

export const SearchRegular = Template.bind({});
SearchRegular.args = {
	suggests: [
		{ key: 'f1', title: 'result 1', description: 'some information about result 1', tags: ['tag1', 'tag2'] },
		{ key: 'f2', title: 'result 2', description: 'some information about result 2', tags: ['tag99', 'tag1'] },
	],
	placeholder: 'Search fixed result example',
	onRecordClick: (key?: string) => {
		message.success(`Clicked on ${key}`);
	},
	onSearch: handleOnChangeTest,
};

export const SearchMultiple = Template.bind({});
SearchMultiple.args = {
	suggests: [
		{ key: 'f1', title: 'result 1', description: 'some information about result 1', tags: ['tag1', 'tag2'] },
		{ key: 'f2', title: 'result 2', description: 'some information about result 2', tags: ['tag99', 'tag1'] },
		{ key: 'f3', title: 'result 3', description: 'some information about result 3', tags: ['tag3', 'tag1'] },
		{ key: 'f4', title: 'result 4', description: 'some information about result 4', tags: ['tag25', 'tag2'] },
	],
	multiple: true,
	placeholder: 'Select multiple tags',
	onRecordClick: (key?: string) => {
		message.success(`Clicked on ${key}`);
	},
	onSearchSubmit: (val) => {
		console.log(`Submitted:`, val);
	},
	onSearch: handleOnChangeTest,
};

// Access token
const accessToken = 'pk.eyJ1Ijoia2pvLW5hdmlhaXIiLCJhIjoiY2sweG14M3U5MDVzYjNjbnpqZjllY2FvNyJ9.EtllT6fSJmzyZ3qFFStbCw';

export const GeoSearchGlobal = Template2.bind({});
GeoSearchGlobal.args = {
	accessToken: accessToken,
	handleResultClick: handleResultClick,
	//handleChange: () => console.log('custom handlechange trigger'),
	searchPlaceholder: 'Find global address',
	searchCountries: [],
	searchLanguage: undefined,
};

export const GeoSearchDenmark = Template2.bind({});
GeoSearchDenmark.args = {
	accessToken: accessToken,
	handleResultClick: handleResultClick,
	searchPlaceholder: 'Find denmark address',
	searchCountries: ['dk'],
	searchLanguage: 'da-DK',
};
