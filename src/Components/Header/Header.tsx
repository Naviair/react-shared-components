import React from 'react';
import './styles.scss';

export interface IHeader {
	/* Content to be displayed in the left section of the header component */
	left?: JSX.Element;
	/* Content to be displayed in the right section of the header component */
	right?: JSX.Element;
	/** Image to load in the middle section of the header */
	logo: JSX.Element;
}

/**
 * ## Header
 * @example <Header right={<p> Content right </p>} left={<p> Content left </p>} />
 * @returns Standard Naviair header component.
 */
export const Header: React.FC<IHeader> = (props) => {
	return (
		<>
			<div className={'scHeader'}>
				<div className={'scHeaderSection scHeaderLeft'}>{props.left}</div>
				<div className={'scHeaderSection scHeaderCenter'}>
					<div className={'scHeaderLogo'}>{props.logo}</div>
				</div>
				<div className={'scHeaderSection scHeaderRight'}>{props.right}</div>
			</div>
		</>
	);
};
