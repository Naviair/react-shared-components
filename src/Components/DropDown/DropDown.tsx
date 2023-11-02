import React from 'react';
import { Icon, EIconTypes } from '..';
import { Button, Dropdown, DropDownProps } from 'antd';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface IDropDown extends DropDownProps {
	/* onClick handler for the DropDown button */
	onClick?: () => void;
	/* Icon to be rendered as DropDown button */
	icon: IconDefinition;
}

/**
 * ## Dropdown 
 * @example <DropDown
				icon={'globe-europe'}
				className={props.className}
				placement={props.placement}
				trigger={['click']}
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
				]}}/>
 * @returns a responsive dropdown menu 
 */
export const DropDown: React.FC<IDropDown> = (props) => {
	return (
		<div>
			<Dropdown {...props} arrow>
				<Button onClick={props.onClick && props.onClick} type={'link'} shape={'circle'} size={'large'}>
					{props.icon ? <Icon name={props.icon.iconName} icon={props.icon} type={EIconTypes.REGULAR} /> : <span>{props.icon}</span>}
				</Button>
			</Dropdown>
		</div>
	);
};
