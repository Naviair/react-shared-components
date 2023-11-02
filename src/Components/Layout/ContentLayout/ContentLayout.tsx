import { Divider, Button } from 'antd';
import React from 'react';
import { Card, Icon } from '../../';
import './styles.scss';

export interface IContentLayout {
	/* Title of the page */
	title: string;
	/* Render multiple children rather than the default single. (Remember Card component wrapper) */
	multipage?: boolean;
	/* Wrapper className */
	className?: string;
	/* Add back-button in header and use this handler when pressed */
	handleBackClicked?: () => void;
	/* children */
	children?: React.ReactNode;
}

/**
 * ## ContentLayout
 *
 * Creates a default layout inside a card. Pass content in as children.
 *
 * Typically used in conjunction with the **Document** component.
 * If multiple documents are needed, pass the `multipage` prop and map the documents inside Card components.
 *
 * @example <caption>**Single page**</caption>
 * <ContentLayout title={'Hjælp'}> {...props.document} </ContentLayout>
 *
 * @example <caption>**Multi page**</caption>
 * <ContentLayout title={props.title} multipage>
 * {props.documents.map((doc, index) => {
 *	//map documents into cards
 * 	})}
 *  </ContentLayout>
 *
 * @returns The default Content Layout
 */
export const ContentLayout: React.FC<IContentLayout> = (props) => {
	return (
		<div className={`scContentLayout ${props.className && props.className}`}>
			{props.title && (
				<>
					<div className={'scContentHeader'}>
						{props.handleBackClicked && (
							<Button className={'scContentLayoutBackBtn'} icon={<Icon name={'arrow-left'} />} type={'text'} onClick={props.handleBackClicked} />
						)}
						<h1>{props.title}</h1>
					</div>
					<Divider className={'scContentLayouHeaderDivider'} />
				</>
			)}
			{props.multipage ? props.children : <Card fill>{props.children}</Card>}
		</div>
	);
};
