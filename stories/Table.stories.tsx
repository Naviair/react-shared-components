/* eslint-disable import/no-default-export */
import React, { useState, ComponentProps, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { Card, Table, ContentLayout, TableFilter } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Styles } from '../src/Styles';
import { Divider, Tag } from 'antd';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Table',
	component: Table,
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{'Drawer popup implementation using Ant Design'}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Table>>;

const validFrom = (stamp: string) => {
	return <Tag color={Styles.BrandColor}> {stamp} </Tag>;
};

const dataRow = [
	{
		data: ['UAEO60 EETN YYGGgg', 'ARS', 'B735 MOD TURB OBS AT 082Z0Z N5900E02330 FL300='],
		validfrom: '2107071600',
		type: 'filter1',
	},
	{
		data: ['asdadadaddad', 'ARS', 'B735 MOD TURB asd82Z0Z N5900E02330 FL300='],
		validfrom: '2107071600',
		type: 'filter2',
	},
	{
		data: ['asdadadaddad', 'ARS', 'B735 MOD TURB asd82Z0Z N5900E02330 FL300='],
		validfrom: '2107071600',
		type: 'filter2',
	},
];

const dataCol = [
	{
		title: 'DATA',
		dataIndex: 'data',
		key: 'data',
		render: (list: string[]) => (
			<p style={{ fontSize: '14px' }}>
				{list.map((info, index) => {
					return (
						<div key={`test1_${index}`}>
							{info} <br />
						</div>
					);
				})}
			</p>
		),
	},
	{
		title: 'VALID FROM',
		dataIndex: 'validfrom',
		key: 'validfrom',
		render: (stamp: string) => validFrom(stamp),
	},
];

const dataCol2 = [
	{
		title: 'DATADD',
		dataIndex: 'data',
		key: 'dataddd',
		render: (list: string[]) => (
			<p style={{ fontSize: '14px' }}>
				{list.map((info, index) => {
					return (
						<div key={`test2_${index}`}>
							{info} <br />
						</div>
					);
				})}
			</p>
		),
	},
];

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Table>> = (args) => {
	return (
		<Card>
			<Table<{}> {...args} columns={dataCol} dataSource={dataRow}></Table>
		</Card>
	);
};

const NaviairGLTable: Story<ComponentProps<typeof GenericTable>> = (props) => {
	return <GenericTable {...props} pageName={'BGGL'} />;
};

type TColumn = {
	title: string;
	dataIndex: string;
	key: string;
	render: (key: string | string[]) => JSX.Element;
};

type TTable<T> = { type: string; columns: TColumn[]; data: T[] }[];

interface IGLTable<T> {
	pageName: string;
	tables: TTable<T>;
}

/* generic table component example */
const GenericTable = <T,>(props: IGLTable<T>) => {
	const [getType, setType] = useState<string[]>();
	const [getFilteredDataSource, setFilteredDataSource] = useState<TTable<T>>();

	const handleType = (filter: string[]) => {
		setType(filter);
	};

	useEffect(() => {
		handleFilteredState(props.tables);
	}, [getType, props.tables]);

	const handleFilteredState = (dataSource: { type: string; columns: TColumn[]; data: T[] }[]) => {
		if (getType === undefined || getType.includes('*')) {
			setFilteredDataSource(dataSource);
		} else {
			setFilteredDataSource(
				dataSource.filter((item) => {
					return getType.includes(item.type);
				})
			);
		}
	};

	return (
		<ContentLayout title={props.pageName}>
			<TableFilter
				onDownloadClick={() => Promise.resolve(console.log('hello'))}
				filters={props.tables.map((item) => ({ key: item.type, translation: item.type, count: item.data.length }))}
				onActiveChange={handleType}
			/>
			<Divider />
			{getFilteredDataSource?.map((table, index: number) =>
				table.data.length !== 0 ? (
					<Table key={`table_${index}`} pagination={false} tableName={table.type} columns={table.columns} dataSource={table.data} />
				) : undefined
			)}
		</ContentLayout>
	);
};

export const Filter = Template.bind({});
Filter.args = {
	pagination: false,
	filter: true,
	tableName: 'Table filter',
};

export const Regular = Template.bind({});
Regular.args = {
	filter: false,
	tableName: 'Table regular',
};

export const Download = Template.bind({});
Download.args = {
	filter: false,
	tableName: 'Table download',
	onDownloadClick: () => new Promise(() => console.log('download')),
};

export const DownloadFilter = Template.bind({});
DownloadFilter.args = {
	filter: true,
	tableName: 'Table download + filter',
	onDownloadClick: () => new Promise(() => console.log('download')),
};

export const NaviairGlTable = NaviairGLTable.bind({});
NaviairGlTable.args = {
	tables: [
		{ type: 'AIREP', columns: dataCol, data: dataRow },
		{
			type: 'METAR/TAF',
			columns: dataCol2,
			data: [
				{
					data: ['asdadadaddad', 'ARS', 'B735 MOD TURB asd82Z0Z N5900E02330 FL300='],
					type: 'filter666',
				},
			],
		},
		{ type: 'SIGMETS', columns: [], data: [] },
	],
};
