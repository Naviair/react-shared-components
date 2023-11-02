import React from 'react';
import './styles.scss';

export interface ISingleLayout {
	/* Set true to remove default padding */
	fill?: boolean;
	/* children */
	children?: React.ReactNode;
}

/**
 * ## SingleLayout
 *
 * Creates the default Single Layout which is used as a container for full- or near fullpage Views.
 *
 * Pass contents as children.
 *
 * @example
 * <SingleLayout>
 * 	{props.children}
 *  </SingleLayout>
 * @returns two div wrappers with a specific styleset.
 */
export const SingleLayout: React.FC<ISingleLayout> = (props) => {
	return (
		<div className={'scSingleLayout'}>
			<div className={`scSingleContent${props.fill ? 'Fill' : ''}`}>{props.children}</div>
		</div>
	);
};
