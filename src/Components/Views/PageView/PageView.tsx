import { IDocument, IPage } from '@naviair/node-shared-interfaces';
import React, { useEffect } from 'react';
import { Card } from '../../Card';
import { ContentLayout } from '../../Layout';
import { IconName } from '../../';
import { Document, ISubmitFormResponse } from '../../Document/';

/** ## IPageViewProps
 * These properties are usually loaded from configuration (based on language if multi-language app).
 */
export interface IPageView {
	/** An {@link IPage} containing documents to render.
	 *
	 * Extends {@link IconName} from FontAwesome for list of allowed icon names
	 * */
	page: IPage<IconName>;
	/** A collection of documents to match with the pages based on page {@link IPage}.
	 * Only documents related to the page is rendered using the common denominator `documentId`.
	 * See {@link IPage.data} and its link to the configurations {@link IConfiguration['documents']}
	 */
	documents: { [key: string]: IDocument };
	/** Called when component loads */
	onLoad?: () => void;
	/* Update text when "Sidst opdateret text" should be different */
	updateText?: string;
	/* Called on form submit */
	onFormSubmit: (form: ISubmitFormResponse) => Promise<void>;
	/* Set mobile mode */
	mobile: boolean;
	children?: React.ReactNode;
}

/**
 * ## PageView
 * Renders a page of documents within Card components.
 * Typically the pages and documents are loaded from configuration.
 * @example <PageView documents={configuration.documents} page={configuration.pages[language][pageID]}/>
 * @returns a ContentLayout rendering the documents within Card components based on the `page` prop.
 */
export const PageView: React.FC<IPageView> = (props) => {
	useEffect(() => props.onLoad?.(), []);
	return (
		<ContentLayout title={props.page.name} multipage>
			{props.page.data.map((section, index) => {
				const doc = props.documents[section.documentId];
				return (
					<Card type={'small'} key={`sectionCard_${index}`} fill title={section.title} icon={section.icon}>
						<Document {...doc} onFormSubmit={props.onFormSubmit} mobile={props.mobile} updateText={props.updateText}>
							{props.children}
						</Document>
					</Card>
				);
			})}
		</ContentLayout>
	);
};
