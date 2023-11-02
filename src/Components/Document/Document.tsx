import { IDocument } from '@naviair/node-shared-interfaces';
import Dayjs from 'dayjs';
import React from 'react';
import './styles.scss';
import { ISubmitFormResponse } from './DocumentChildren/DocumentForm';
import { DocumentCollapse, DocumentHtml, DocumentTable, DocumentForm, DocumentPdf } from './DocumentChildren';

export interface IDocumentProps extends IDocument {
	/* Latest updated text to display on the document */
	updateText?: string;
	/* OnSubmit handler in case of Form document. Will pass function to Form Document Child. */
	onFormSubmit?: (form: ISubmitFormResponse) => Promise<void>;
	/* Set mobile mode for document */
	mobile?: boolean;
	/* Document children  */
	children?: React.ReactNode;
}

/**
 * ## Document
 *
 * Used to display Documents, typically from the database configuration.
 *
 * @example <Document {...configuration.documents[configuration.settings.app.documents[language][documentIdentifier]]} >
 * {props.children}
 * </Document>
 * @returns a Document variant **based on the props content field: Html, Table or Collapse.**
 */
export const Document: React.FC<IDocumentProps> = (props) => {
	const doc = props;
	return (
		<>
			{doc.content.map(({ html, table, collapse, form, pdf }, index) => {
				if (html) {
					return <DocumentHtml key={`section_${index}`} {...html} />;
				} else if (table) {
					return <DocumentTable key={`section_${index}`} {...table} />;
				} else if (collapse) {
					return <DocumentCollapse key={`section_${index}`} {...collapse} />;
				} else if (form) {
					return <DocumentForm onSubmit={props.onFormSubmit} key={`section_${index}`} form={form} />;
				} else if (pdf) {
					return <DocumentPdf key={`section_${index}`} mobile={props.mobile} {...pdf} />;
				}
			})}
			{props.children}
			<div className={'scDocumentDate'}>
				{props.updateText ? props.updateText : 'Senest opdateret den'} {Dayjs.unix(doc.lastUpdated).format('DD.MM.YYYY')}
			</div>
		</>
	);
};
