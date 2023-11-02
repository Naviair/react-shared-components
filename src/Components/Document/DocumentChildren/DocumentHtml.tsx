import { IDocumentHtml } from '@naviair/node-shared-interfaces';
import React from 'react';

/* HTML document type, used in extension of document */
export const DocumentHtml: React.FC<IDocumentHtml> = (props) => {
	return (
		<div
			className={'scDocumentHtml'}
			dangerouslySetInnerHTML={{
				__html: props.data,
			}}
		/>
	);
};
