import React from 'react';
import { Icon, EIconTypes } from '../../Icon';
import { Link, useLocation } from 'react-router-dom';
import './styles.scss';
import { TSettingsAppMenu } from '@naviair/node-shared-interfaces';

/**
 * A single button for the Navbar
 * @param props see {@link TSettingsAppMenu}
 * @returns a <Link> with icon, text, external/internal handling and custom styles.
 */
const NavMobileListItem: React.FC<TSettingsAppMenu> = (props) => {
	const location = useLocation();

	return (
		<>
			<Link
				onClick={() => {
					props.external && window.open(props.link);
				}}
				to={props.external ? '#' : props.link}
				key={`nav_list_item_${props.name}`}>
				<div className={`scNavMobileItem ${props.link === location.pathname ? '-active' : ''}`}>
					<span className={'icon'}>
						<Icon name={props.icon} type={props.link === location.pathname ? EIconTypes.SOLID : EIconTypes.LIGHT} />
					</span>
					<span className={'title'}>{props.title}</span>
				</div>
			</Link>
		</>
	);
};

export interface INavMobile {
	content: TSettingsAppMenu[];
}

/**
 * ## NavMobile
 *
 * Creates a mobile-oriented Navbar with buttons passed down as props.
 *
 * Typically loaded from configuration so it can be changed on the go.
 *
 * @example <caption>**Configuration example**</caption>
 * <NavMobile {...configuration.settings.app.menu} />
 *
 * @example <caption>**Prop example**</caption>
 * <NavMobile {...[{ name: 'example', title: 'example', icon: 'flag', link: 'https://www.example.com', external: true }, ...]} />
 *
 * @param props see {@link TSettingsAppMenu}
 * @returns a Navbar oriented for mobile devices
 */
export const NavMobile: React.FC<INavMobile> = (props) => {
	return (
		<div className={'scNavMobile'}>
			<div className={'scNavMobileList'}>
				{props.content.map((item, i) => (
					<NavMobileListItem key={`nav_list_item_${i}`} {...item} />
				))}
			</div>
		</div>
	);
};
