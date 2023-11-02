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
const NavListItem: React.FC<TSettingsAppMenu> = (props) => {
	const location = useLocation();
	return (
		<>
			<Link
				onClick={() => {
					props.external && window.open(props.link);
				}}
				className={'scNavLink'}
				to={props.external ? '#' : props.link}
				key={`nav_list_item_${props.name}`}>
				<div className={`scNavWebItem ${props.link === location.pathname ? '-active' : ''}`}>
					<>
						<span className={'icon'}>
							<Icon name={props.icon} type={props.link === location.pathname ? EIconTypes.SOLID : EIconTypes.LIGHT} />
						</span>
						<span className={'title'}>{props.title}</span>
					</>
				</div>
			</Link>
		</>
	);
};

export interface INavProps {
	content: TSettingsAppMenu[];
}

/**
 * ## Nav
 *
 * Creates a Navbar with buttons passed down as props.
 *
 * Typically loaded from configuration so it can be changed on the go.
 *
 * @example <caption>**Configuration example**</caption>
 * <Nav {...configuration.settings.app.menu} />
 *
 * @example <caption>**Prop example**</caption>
 * <Nav {...[{ name: 'example', title: 'example', icon: 'flag', link: 'https://www.example.com', external: true }, ...]} />
 *
 * @param props see {@link TSettingsAppMenu}
 * @returns a Navbar
 */
export const Nav: React.FC<INavProps> = (props) => {
	return (
		<div className={'scNavWeb'}>
			<div className={'scNavWebList'}>
				{props.content.map((item, i) => (
					<NavListItem key={`nav_list_item_${i}`} {...item} />
				))}
			</div>
		</div>
	);
};
