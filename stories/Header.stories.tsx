import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { DropDown, GeoSearch, Header } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { Button } from 'antd';
import logo from './assets/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite } from '@fortawesome/pro-regular-svg-icons/faCookieBite';
import { faGlobeAfrica } from '@fortawesome/pro-regular-svg-icons/faGlobeAfrica';
import { faUser } from '@fortawesome/pro-regular-svg-icons/faUser';

import './styles.scss';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Header',
	component: Header,
	parameters: {
		docs: {
			page: () => (
				<>
					<Title />
					<Description>{'Header implementation for Naviair projects'}</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta<ComponentProps<typeof Header>>;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Header>> = (args) => {
	return <Header {...args} />;
};

const GLTemp: Story<ComponentProps<typeof Header>> = (args) => {
	return <GLHeader {...args} />;
};

interface IGLHeader {}

const GLHeader: React.FC<IGLHeader> = (props) => {
	const accessToken = 'pk.eyJ1Ijoia2pvLW5hdmlhaXIiLCJhIjoiY2sweG14M3U5MDVzYjNjbnpqZjllY2FvNyJ9.EtllT6fSJmzyZ3qFFStbCw';
	return (
		<Header
			logo={<img src={logo} alt={logo} />}
			left={
				<>
					<GeoSearch
						mobile={true}
						accessToken={accessToken}
						handleResultClick={() => console.log('RESULT CLICK')}
						searchPlaceholder={'Search'}
						searchCountries={['gl']}
						searchLanguage={'en-GB'}
					/>
				</>
			}
			right={
				<Button onClick={() => console.log(' TEST ')} type={'link'} shape={'circle'} size={'large'}>
					<FontAwesomeIcon icon={faCookieBite} />
				</Button>
			}
		/>
	);
};

export const NaviairGLHeader = GLHeader.bind({});

export const Regular = Template.bind({});
Regular.args = {
	right: <p> {'Content right'} </p>,
	left: <p> {'Content left'} </p>,
	logo: <img src={logo} alt={logo} />,
};

export const DropdownHeader = Template.bind({});
DropdownHeader.args = {
	right: (
		<>
			<DropDown
				icon={faUser}
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
			<DropDown
				icon={faGlobeAfrica}
				menu={{
					items: [
						{ label: 'Danish', key: 'dk' },
						{ label: 'Swedish', key: 'se' },
						{ label: 'English', key: 'en' },
					],
				}}
			/>
		</>
	),
	left: <p> {'Content left'} </p>,
	logo: <img src={logo} alt={logo} />,
};
