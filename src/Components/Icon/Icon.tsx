import { IconDefinition, library, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './styles.scss';

/**
 * Enum for various FontAwesome icon types.
 */
export enum EIconTypes {
	BRANDS = 'fab',
	DUOTONE = 'fad',
	LIGHT = 'fal',
	REGULAR = 'far',
	SOLID = 'fas',
}

export type { IconName };

export interface IIcon {
	/* FontAwesome icon name. */
	name: IconName;
	/* The actual icon definition. Use this if you did not use the library.add method, and wish to directly use the icon. */
	icon?: IconDefinition;
	/* The icon type. (Not necessary if parsing icon directly with icon prop, as type will be inherited from import) */
	type?: EIconTypes;
	/* Set icon color */
	color?: string;
	/* Set icon rotation */
	rotate?: number;
	/* Icon onClick handler */
	onClick?: () => void;
	/* Parse icon className */
	className?: string;
}

/**
 * ## Icon
 * @example <Icon name={'user'} type={EIconTypes.REGULAR} />
 * @returns Icon component with the FontAwesome icon for user.
 */
export const Icon: React.FC<IIcon> = (props) => {
	const [iconLoaded, setIconLoaded] = useState(false);

	/* Automatically add icon to library. */
	useEffect(() => {
		props.icon && library.add(props.icon);
		setIconLoaded(true);
	}, []);

	return iconLoaded ? (
		<FontAwesomeIcon
			icon={[props.type ? props.type : EIconTypes.SOLID, props.name]}
			color={props.color}
			style={{ transform: `rotate(${props.rotate ? props.rotate : 0}deg)` }}
			className={`scIcon ${props.className ? props.className : ''} ${props.onClick ? 'clickable' : ''}`}
			onClick={props.onClick}
		/>
	) : (
		<></>
	);
};
