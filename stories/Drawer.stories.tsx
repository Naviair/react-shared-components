import React, { useState, ComponentProps, createRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Story, Meta } from '@storybook/react';
import { Drawer, IDrawerRef, Tab } from '../src/Components';
import { Title, Description, Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';
import { message, Divider, Badge, Button } from 'antd';
import './assets/drawer.scss';

//👇 This default export determines where your story goes in the story list
export default {
	title: 'Components/Drawer',
	component: Drawer,
	parameters: {
		layout: 'centered',
		docs: {
			page: () => (
				<>
					<Title />
					<Description>Drawer popup implementation using Ant Design</Description>
					<Primary />
					<ArgsTable story={PRIMARY_STORY} />
				</>
			),
		},
	},
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Drawer>> = (args) => {
	const [open, setopen] = useState(false);
	return (
		<div>
			<a onClick={open ? () => setopen(false) : () => setopen(true)}>{'click here to toggle drawer'} </a>
			<Drawer {...args} open={open} onSave={() => setopen(false)} onClose={() => setopen(false)}>
				{' '}
				{'Some content here'}{' '}
			</Drawer>
		</div>
	);
};

const NaviairGlMenu: Story<ComponentProps<typeof Drawer>> = () => {
	return (
		<Menu
			content={[
				{ header: { title: 'NOTAM/SNOWTAM' }, content: TESTCONTENT, linkAction: (link: string) => message.success(`routing to: ${link}`) },
				{ header: { title: 'SIGMETS' }, content: TESTCONTENT2, linkAction: (link: string) => message.success(`routing to: ${link}`) },
				{ header: { title: 'Help' }, linkAction: (link: string) => message.success(`routing to: ${link}`) },
				{ header: { title: 'About' }, linkAction: (link: string) => message.success(`routing to: ${link}`) },
			]}></Menu>
	);
};

const InFlightSidePanel: Story<ComponentProps<typeof Drawer>> = () => {
	const tab = (
		<Tab
			tabs={[
				{
					title: 'Test #1',
				},
				{
					title: 'Test #2',
					children: <>Here are some new content...</>,
				},
			]}
			tabBarExtraContent={<Button>Settings</Button>}
		/>
	);

	const drawer = (
		<Drawer closable={false} open={true} placement={'right'} mask={false} zIndex={2}>
			{tab}
		</Drawer>
	);

	return drawer;
};

interface IMenuContentChildren {
	/* The title of the menu content */
	title: string;
	/* Link url */
	link: string;
	/* The badge count */
	count?: number; // should probably be some kind of array so we can map and match names
	/* If the window should be opened externally */
	external?: boolean;
}

interface IMenuContent {
	/* Header object of the content */
	header: { title: string; link?: string };
	/* Content of the content */
	content?: IMenuContentChildren[];
	/* Link action handler if user clicks on content */
	linkAction: (link: string) => void;
}

const MenuContent: React.FC<IMenuContent> = (props) => {
	const [content, setContent] = useState<IMenuContentChildren[]>();

	/* Set content on component load */
	useEffect(() => {
		setContent(props.content);
	}, []);

	return (
		<>
			<div className={'content-div'}>
				<h4 onClick={props.header.link ? () => message.success(`route to: ${props.header.link}`) : undefined} className={'drawerTitle'}>
					{props.header.title}
				</h4>
				{content?.map((obj: IMenuContentChildren, index: number) => (
					<div key={`menuContainer_${index}`}>
						{/*<Link onClick={() => props.linkAction(obj.link)} to={obj.link}>*/}
						<div className={'content-body'}>
							<div className={'left'}>{obj.title}</div>
							<div className={'center'}></div>
							<div className={'right'}>
								{
									<Badge
										showZero
										count={
											obj.count ? obj.count : 0 /*() =>
											
											getBadgeCount(
												obj.title,
												[] 
											)
											*/
										}
										style={{ backgroundColor: '#96ae09' }}
									/>
								}
							</div>
						</div>
						{/*</Link>*/}
					</div>
				))}
			</div>
			<Divider className={'divider'} />
		</>
	);
};

interface IMenu {
	/* The menu content from configurations */
	content?: IMenuContent[];
	/* Set if client is on a mobile device */
	mobile?: boolean;
}

/**
 * ## Menu
 * The menu component
 * @returns An interactive menu component
 **/
const Menu: React.FC<IMenu> = (props) => {
	const drawerRef = createRef<IDrawerRef>();
	/* Dont show on mobile */
	const show = useMediaQuery({ query: '(min-width:575px)' });

	return (
		<Drawer
			renderInDom
			open={show}
			mask={false}
			closable={false}
			placement={'left'}
			/* z Index = 2, assuming that we have same component composition as Naviair UTM */
			zIndex={2}
			ref={drawerRef}>
			<div style={{ marginTop: '10px' }}>
				{props.content?.map((obj: IMenuContent, index: number) => (
					<MenuContent key={`menuContent_${index}`} linkAction={obj.linkAction} header={obj.header} content={obj.content}></MenuContent>
				))}
			</div>
		</Drawer>
	);
};

const TESTCONTENT: IMenuContentChildren[] = [
	{
		title: 'BGGL',
		link: '/search/BGGL',
		count: 6,
	},
	{
		title: 'BIRD',
		link: '/search/BIRD',
		count: 4,
	},
	{
		title: 'CYxx',
		link: '/search/CYXX',
		count: 2,
	},
	{
		title: 'ENxx',
		link: '/search/ENXX',
	},
];

const TESTCONTENT2: IMenuContentChildren[] = [
	{
		title: 'BGGL',
		link: '/search/BGGL',
	},
	{
		title: 'BIRD',
		link: '/search/BIRD',
	},
	{
		title: 'CZxx',
		link: '/search/CZxx',
	},
];

export const Right = Template.bind({});
Right.args = {
	placement: 'right',
	title: 'Right drawer',
	open: true,
	mask: true,
	maskClosable: true,
	closable: true,
	width: 400,
};

export const Left = Template.bind({});
Left.args = {
	placement: 'left',
	title: 'Left drawer',
	open: true,
	mask: true,
	maskClosable: true,
	closable: true,
	width: 400,
};

export const Top = Template.bind({});
Top.args = {
	placement: 'top',
	title: 'Top drawer',
	open: true,
	mask: true,
	maskClosable: true,
	closable: true,
	width: 400,
};

export const Bottom = Template.bind({});
Bottom.args = {
	placement: 'bottom',
	title: 'Bottom drawer',
	open: true,
	mask: true,
	maskClosable: true,
	closable: true,
	width: 400,
};

export const NaviairGlSideMenu = NaviairGlMenu.bind({});

export const InFlightPanel = InFlightSidePanel.bind({});
