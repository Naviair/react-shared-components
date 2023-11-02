import React from 'react';
import { Badge } from '../../../../Styles/Styles';
import { Badge as AntdBadge } from 'antd';
import './styles.scss';

interface ITableFilterBadge {
	/* Title of the filter badge */
	title: string;
	/* Filter key. The key we use to lookup which badge is active.*/
	filterKey: string;
	/* The current active keys for all badges. */
	activeKeys: string[];
	/* The amount of entries for this badge */
	count: number;
	/* onClick handler for badge */
	onClick?: (key: string) => void;
	/* Align badges to the left */
	left?: boolean;
}

/**
 * ## TableFilterBadge
 * @returns A filter badge component
 */
export const TableFilterBadge: React.FC<ITableFilterBadge> = (props) => {
	const active = props.activeKeys.includes(props.filterKey);

	return (
		<div className={`scTableFilterBadge ${active && '-active'} ${props.left && '-left'}`} onClick={() => props.onClick?.(props.filterKey)}>
			{props.title}
			<AntdBadge showZero style={active ? Badge.active : Badge.default} count={props.count} />
		</div>
	);
};
