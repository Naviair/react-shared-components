// eslint-disable-next-line @typescript-eslint/naming-convention
export const Styles = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	BrandColor: '#96AE09',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	White: '#FFF',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Loader: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		BackgroundColor: '#f3f3f3',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		ForegroundColor: '#96AE09',
	},
};

/**
 * Styles for tableFilterBadge
 * !Alternative solution to CSS as Antd´s Badge component does not support CSS
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Badge = {
	default: {
		backgroundColor: Styles.White,
		borderColor: Styles.BrandColor,
		color: Styles.BrandColor,
		marginLeft: '5px',
	},
	active: {
		backgroundColor: Styles.BrandColor,
		color: Styles.White,
		marginLeft: '5px',
	},
};
