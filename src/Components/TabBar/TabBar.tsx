import React, { useState, useEffect } from 'react';
import { TabPaneProps, Tabs, TabsProps } from 'antd';
import { EIconTypes, Icon } from '../Icon';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import './styles.scss';

const { TabPane } = Tabs;

export interface ITabItem extends TabPaneProps {
	title: string;
	icon?: IconName;
}

export interface ITab extends Omit<TabsProps, 'onChange'> {
	tabs: ITabItem[];
	onChange?: (tab?: string) => void;
}

/**
 * ## Generic Tab Bar Component.
 *
 * Creates a Tab bar with series of Tab pane items.
 *
 * ### Remember when using icons to import both light and solid icons from fontawesome.
 *
 * @example <caption>**Configuration example**</caption>
 * const config = { tabs: [{title: 'test', icon: 'map', children: <></>}]}
 *
 * @returns Tab Component
 */
export const Tab: React.FC<ITab> = (props) => {
	const [selectedTab, setSelectedTab] = useState<string | undefined>(props.activeKey);

	useEffect(() => {
		setSelectedTab(props.activeKey);
	}, [props.activeKey]);

	const onEvent = (tab: string) => {
		setSelectedTab(tab);
		props.onChange?.(tab);
	};

	const iconType = (item: ITabItem, index: number): EIconTypes => {
		const key = item.tabKey ? item.tabKey : String(index);
		return key === selectedTab ? EIconTypes.SOLID : EIconTypes.LIGHT;
	};

	const tabItem = (item: ITabItem, index: number): JSX.Element => (
		<div className={'scTabBarItem'}>
			{item.icon ? (
				<span className={'scTabBarIcon'}>
					<Icon name={item.icon} type={iconType(item, index)} />
				</span>
			) : (
				<></>
			)}
			<span className={'title'}>{item.title}</span>
		</div>
	);

	return (
		<Tabs className={'scTabBar'} {...props} onChange={onEvent}>
			{props.tabs.map((item, index) => (
				<TabPane tab={item.tab ? item.tab : tabItem(item, index)} key={item.tabKey ? item.tabKey : index}>
					{item.children ? item.children : 'No content added!'}
				</TabPane>
			))}
		</Tabs>
	);
};
