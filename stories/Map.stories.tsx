import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { EMapType, TSidePanel, useMap, createMapButton, IMapOptions } from '../src/Components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAcorn } from '@fortawesome/pro-light-svg-icons/faAcorn';
import { faArrowToRight } from '@fortawesome/pro-light-svg-icons/faArrowToRight';
import { faAddressBook } from '@fortawesome/pro-light-svg-icons/faAddressBook';
library.add(faAcorn, faArrowToRight, faAddressBook);

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Map',
	controls: null,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{' Universal map component for use whenever a map is to be shown. '}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<{ accessToken: string; options: IMapOptions }>;

//👇 We create a “template” of how args map to rendering
const Template: Story<{ accessToken: string; options: IMapOptions }> = (props) => {
	const sidePanels: TSidePanel[] = [
		{ id: 'test', icon: 'acorn', component: <div>TEST TEST KJO</div> },
		{ id: 'test1', icon: 'address-book', component: <div>TEST TEST KJO1</div> },
	];

	const button1 = createMapButton({ id: 'test4', onClick: () => console.log('test'), icon: 'acorn', buttonGroup: 'test' }, 'bottom-left');
	const button2 = createMapButton({ id: 'test4', onClick: () => console.log('test'), icon: 'acorn', title: 'test', buttonGroup: 'test' }, 'bottom-left');

	const buttons = [button1, button2];

	const { renderMap, mapObj } = useMap(props.accessToken, { ...props.options, sidePanels: sidePanels, buttons: buttons });

	return (
		<div>
			<div style={{ width: '500px', height: '500px' }}>{renderMap}</div>
			<p className={'label'}>{'Set map style'}</p>
			<select onChange={(e) => mapObj?.setStyle(e.target.value)}>
				{Object.values(EMapType).map((x, y) => (
					<option key={x}>{x}</option>
				))}
			</select>
			<br />
			<p className={'label'}>{'Set bearing (0-360 degrees)'}</p>
			<input type={'number'} min={0} max={360} placeholder={'Bearing'} onChange={(e) => mapObj?.setBearing(Number(e.target.value))}></input>
			<br />
			<p className={'label'}>{'Set zoom level (the higher number, the closer view (0-20))'}</p>
			<input type={'number'} min={0} max={20} placeholder={'Zoom'} onChange={(e) => mapObj?.setZoom(Number(e.target.value))}></input>
			<br />
			<button
				onClick={() =>
					mapObj?.setMaxBounds([
						[21, 5],
						[-14, 2],
					])
				}>
				{'Bounds'}
			</button>
			<button onClick={() => mapObj?.flyTo({ center: [12.632755, 55.617376], zoom: 10 })}>{'Fly to'}</button>
			<button onClick={() => mapObj?.setCenter([-24, 4])}>{'Center'}</button>
			<button onClick={() => mapObj?.resetNorth()}>{'Reset north'}</button>
		</div>
	);
};

export const Example = Template.bind({});
Example.args = {
	accessToken: 'pk.eyJ1Ijoia2pvLW5hdmlhaXIiLCJhIjoiY2sweG14M3U5MDVzYjNjbnpqZjllY2FvNyJ9.EtllT6fSJmzyZ3qFFStbCw',
	options: {
		mapStyle: EMapType.LIGHT,
		center: [-47.7064127, 66.994174],
		zoom: 5,
		bearing: 0,
		interactive: true,
		doubleClickZoom: true,
	},
};
