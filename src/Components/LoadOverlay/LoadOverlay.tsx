import React, { FC } from 'react';
import { LoaderSquare } from '../LoaderSquare/LoaderSquare';
import './styles.scss';

export interface ILoadOverlay {
	/* If false, the component is hidden by css. Make sure to render appropriately, do not hide instead of destroying. */
	loading?: boolean;
	/* Main (bold) text to show below LoaderSquare */
	title?: string;
	/* Any additional text to show below the title */
	subtitle?: string;
	children?: React.ReactNode;
}

/**
 * ## LoadOverlay
 *
 * Displays a fullpage LoaderSquare and a 'powered by' footer.
 *
 * Enforce conditional rendering, so that the overlay is destroyed when no longer needed.
 *
 * @example {props.loading && <LoadOverlay show={props.loading} />}
 * @returns a loading square overlay while show is true
 */
export const LoadOverlay: FC<ILoadOverlay> = (props = { loading: true }) => {
	return (
		<div className={`scLoadOverlay ${props.loading ? '' : 'hidden'}`}>
			<LoaderSquare />
			<div className={'scOverlayFooter'}>
				<b>{props.title}</b>
				<br />
				{props.subtitle}
				{props.children}
			</div>
		</div>
	);
};
