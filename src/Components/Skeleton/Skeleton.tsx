import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { Styles } from '../../Styles';

type TLine = {
	/* Left margin */
	leftMarg: string;
	/* Top margin */
	topMarg: string;
	/* Width of line */
	width: string;
	/* Height of line */
	height: string;
};

export interface ISkeletonProps extends IContentLoaderProps {
	/* The line specification. */
	lines: TLine[];
	/* Line backgroundColor */
	backgroundColor: string;
	/* Line foregroundColor */
	foregroundColor: string;
}

/**
 * ## Skeleton
 * @example <Skeleton
						speed={0.8}
						lines={[
							{ leftMarg: '10', topMarg: '15', width: '250', height: '7' },
							{ leftMarg: '10', topMarg: '30', width: '300', height: '7' },
							{ leftMarg: '10', topMarg: '45', width: '300', height: '7' },
						]}
					/>
 * A content component loader
 * @returns a skeleton loader component
 */
export const Skeleton: React.FC<ISkeletonProps> = (props) => {
	return (
		<div className={props.className ? props.className : 'style_skeleton'}>
			<ContentLoader
				speed={props.speed ? props.speed : 1}
				height={props.height ? props.height : 80}
				backgroundColor={props.backgroundColor ? props.backgroundColor : Styles.Loader.BackgroundColor}
				foregroundColor={props.foregroundColor ? props.foregroundColor : Styles.Loader.ForegroundColor}>
				<>
					{props.lines.map((e, index) => (
						<rect key={'rect_' + index} x={e.leftMarg} y={e.topMarg} rx={'0'} ry={'0'} width={e.width} height={e.height} />
					))}
				</>
			</ContentLoader>
		</div>
	);
};
