import { Button, message } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { TableFilterBadge } from '../..';
import './styles.scss';

export type TFilter = { key: string; translation: string; count: number };

export interface ITableFilter {
	/* Filters to be included */
	filters: TFilter[];
	/* The function to call on  */
	onActiveChange: (id: string[]) => void;
	/* Render download button, and handle download click */
	onDownloadClick?: () => Promise<void>;
	/* Sets the active item. If this is passed, it will serve as the initialState for the active filter. */
	defaultActiveItem?: string[];
}

export interface ITableFilterRef {
	setActiveItem: (activeItem?: string[]) => void;
}

/**
 * ## TableFilter
 * If props.defaultActiveItem is passed it will serve as the initialState for the active filter.
 * @example <TableFilter data={props.data} onActiveChange={setType} />
 * @returns filter functionality for table component
 */
export const TableFilter = forwardRef<ITableFilterRef, React.PropsWithChildren<ITableFilter>>((props, ref): JSX.Element => {
	const [getActiveFilterState, setActiveFilterState] = useState<string[]>(props.defaultActiveItem ?? ['*']);
	const [downloadLoadingState, setDownloadLoadingState] = useState(false);

	useImperativeHandle(ref, () => ({
		setActiveItem(activeItem) {
			if (activeItem) {
				setActiveFilterState(activeItem);
				props.onActiveChange(activeItem);
			}
		},
	}));

	/**
	 * Sets the active state
	 * @param key
	 * @returns void
	 */
	const handleSetActive = (key: string) => {
		if (key === '*') {
			setActiveFilterState(['*']);
			props.onActiveChange(['*']);
		} else if (getActiveFilterState.includes(key)) {
			const filters = getActiveFilterState.filter((filter) => filter !== key && filter !== '*');
			setActiveFilterState(filters.length > 0 ? filters : ['*']);
			props.onActiveChange(filters.length > 0 ? filters : ['*']);
		} else {
			const filters = getActiveFilterState.concat([key]).filter((filter) => filter !== '*');
			setActiveFilterState(filters.length > 0 ? filters : ['*']);
			props.onActiveChange(filters.length > 0 ? filters : ['*']);
		}
	};

	const handleDownload = () => {
		setDownloadLoadingState(true);
		props
			.onDownloadClick?.()
			.catch((err) => {
				message.error(err);
			})
			.finally(() => setDownloadLoadingState(false));
	};
	/**
	 * If mobile device, render filters in Dropdown menu
	 * */
	return (
		<div className={'scTableFilter'}>
			<div className={'scTableSection scTableLeft'}>
				{props.filters.map((obj, index) => {
					return (
						<TableFilterBadge
							key={`tableFilterItem${index}`}
							title={obj.translation}
							filterKey={obj.key}
							count={obj.count}
							activeKeys={getActiveFilterState}
							onClick={handleSetActive}
						/>
					);
				})}
			</div>
			<div className={'scTableSection scTableRight'}>
				{props.onDownloadClick && (
					<Button onClick={handleDownload} loading={downloadLoadingState} icon={<DownloadOutlined />} type={'primary'}>
						{'Download'}
					</Button>
				)}
			</div>
		</div>
	);
});
