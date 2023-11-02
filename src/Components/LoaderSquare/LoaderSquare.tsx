import React from 'react';
import './styles.scss';

const Square: React.FC = () => <div />;
/**
 * ## LoaderSquare
 * Map loader animation
 * @returns A loader animation
 */
export const LoaderSquare: React.FC = () => {
	return (
		<div className={'scSquareContainer'}>
			<div className={'scSquareLoader'}>
				<Square />
				<Square />
				<Square />
				<Square />
				<Square />
				<Square />
				<Square />
				<Square />
				<Square />
			</div>
		</div>
	);
};
