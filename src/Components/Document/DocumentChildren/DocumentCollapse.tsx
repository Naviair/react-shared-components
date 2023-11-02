import { IDocumentCollapse } from '@naviair/node-shared-interfaces';
import { Collapse } from 'antd';
import React from 'react';

const Panel = Collapse.Panel;

/* Collapse document type, used in extension of document */
export const DocumentCollapse: React.FC<IDocumentCollapse> = (props) => {
	return (
		<div className={'scDocumentCollapse'}>
			<Collapse expandIconPosition={'end'} accordion>
				{props.data.map((entry, index) => {
					return (
						<Panel header={entry.title} key={`collapse_${index}`}>
							<div
								dangerouslySetInnerHTML={{
									__html: entry.details,
								}}
							/>
						</Panel>
					);
				})}
			</Collapse>
		</div>
	);
};
