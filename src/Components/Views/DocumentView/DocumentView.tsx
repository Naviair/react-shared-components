import React from 'react';
import { IDocument } from '@naviair/node-shared-interfaces';
import { SingleLayout } from '../../Layout';
import { Card } from '../../Card';
import { Document } from '../../Document';
import { IconName } from '../../Icon';

export interface IDocumentView {
	/**  Document to be rendered {@link IDocument}. Parse IconName genericly to interface.  **/
	document: IDocument<IconName>;
}

/**
 * ## DocumentView
 * Loads a single document
 * @example <DocumentView document={doc} />}
 * @returns a SingleLayout component and the document rendered within a Card component.
 */
export const DocumentView: React.FC<IDocumentView> = (props) => {
	const doc = props.document;
	return (
		<SingleLayout>
			<Card key={`informationCardDocument_${1}`} fill title={doc.title} icon={doc.icon}>
				<Document {...props.document} />
			</Card>
		</SingleLayout>
	);
};
