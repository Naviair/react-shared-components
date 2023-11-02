import { IDocumentTable, TDocumentTableRow } from '@naviair/node-shared-interfaces';
import { v4 as uuid } from 'uuid';
import { Table } from 'antd';
import React from 'react';

/* Table document type, used in extension of document */
export const DocumentTable: React.FC<IDocumentTable> = (props) => {
	const cols = props.columns.map((col) => {
		return { title: col.title, dataIndex: col.index };
	});
	const rows = props.rows;

	return (
		<div className={'scDocumentTable'}>
			{props.title && <div className={'title'}>{props.title}</div>}
			<Table<TDocumentTableRow> scroll={{ x: true }} columns={cols} dataSource={rows} pagination={false} rowKey={() => `row_${props.title}_${uuid()}`} />
		</div>
	);
};
