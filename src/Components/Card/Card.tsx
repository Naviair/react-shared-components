import { IconName } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { EIconTypes, Icon } from '../Icon';
import './styles.scss';

export interface ICard {
	/* Control flex for container. Set to false to remove */
	fill?: boolean;
	/* The icon to be rendered in the title */
	icon?: IconName;
	/* Title string */
	title?: string;
	/* Card type */
	type?: 'small' | 'regular';
	/* Set text alignment */
	textAlign?: 'left' | 'center' | 'right';
}

/**
 * ## Card
 * Wrap content in card-container
 * @example <Card key={'some_key'} fill title={'some_title'} icon={'some_icon'}>
					<h1>This is rendered inside the card</h1>
					<p>Some card text</p>
			</Card>
 * @param props See {@link Card}
 * @returns a card wrapper
 */
export const Card: React.FC<ICard> = (props) => {
	return (
		<div className={'scCardWrapper'}>
			<div className={`${props.fill ? 'scCardFill' : 'scCard'} ${props.type === 'small' ? 'scCardSmall' : ''}`}>
				{(props.title || props.icon) && (
					<div>
						{props.icon && (
							<div className={'scCardIcon'}>
								<Icon name={props.icon} type={EIconTypes.LIGHT} />
							</div>
						)}
						{props.title && <div className={'scCardTitle'}>{props.title}</div>}
					</div>
				)}
				{/* eslint-disable-next-line react/forbid-dom-props*/}
				<div className={'scCardContent'} style={{ textAlign: props.textAlign ? props.textAlign : 'left' }}>
					{props.children}
				</div>
			</div>
		</div>
	);
};
