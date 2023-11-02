import { useEffect, useState } from 'react';

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
};

/**
 * A hook to get the current window dimensions.
 * Used to make the page compatible with Safari 15 with the search bar in the bottom of the screen.
 * @returns Object with a width and height
 */

export const useWindowDimensions = (): { width: number; height: number } => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
};
