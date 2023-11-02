import { IDocumentPdf } from '@naviair/node-shared-interfaces';
import { Document as PDFDocument, Page } from 'react-pdf/dist/esm/entry.webpack'; //Special import for webpack4
import { DocumentProps as PDFDocumentProps, PageProps as PDFPageProps } from 'react-pdf';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons/faArrowRight';
import { faDownload } from '@fortawesome/pro-solid-svg-icons/faDownload';
import React, { useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TailSpin } from 'react-loader-spinner';
import { Styles } from '../../../Styles';

/* PDF document type, used in extension of document */
export interface IDocumentPdfProps extends IDocumentPdf {
	/**
	 * The "file" property is overwritten through the data field, so do not bother setting it in pdfDocumentprops
	 */
	/* Adds scDocumentMobile class if true. */
	mobile?: boolean;
	pdfDocumentProps?: PDFDocumentProps;
	pdfPageProps?: PDFPageProps;
}

export const DocumentPdf: React.FC<IDocumentPdfProps> = ({ data, pdfDocumentProps = {}, pdfPageProps = {}, mobile }) => {
	const pdfContentType = 'data:application/pdf;base64,'; //https://github.com/wojtekmaj/react-pdf/wiki/Frequently-Asked-Questions#how-do-i-load-a-pdf-from-base64
	const pdfFile = pdfContentType.concat(data);

	const [numberOfPages, setNumberOfPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState(1);

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumberOfPages(numPages);
	};

	const changePage = (offset: number) => {
		setPageNumber((prevPageNumber) => prevPageNumber + offset);
	};

	//Download function for PDF
	const onDownload = () => {
		const byteString = window.atob(data);
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const int8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			int8Array[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([int8Array], { type: 'application/pdf' });
		const url = URL.createObjectURL(blob);

		// to open the PDF in a new window
		window.open(url, '_blank');
	};

	const loader = () => (
		<div className={'scDocumentLoader'}>
			<TailSpin width={20} height={20} color={Styles.BrandColor} />
		</div>
	);

	return (
		<div className={`scDocumentPdf ${mobile && 'scDocumentMobile'}`}>
			<div className={'scButtonContainer'}>
				<div className={'scButtonLeft'} />
				<div className={'scButtonCenter'}>
					<Button disabled={pageNumber <= 1} onClick={() => changePage(-1)}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					<Button>{`${pageNumber}/${numberOfPages ?? '?'}`}</Button>
					<Button disabled={!numberOfPages || pageNumber >= numberOfPages} onClick={() => changePage(1)}>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</div>
				<div className={'scButtonRight'}>
					<Button onClick={() => onDownload()}>
						<FontAwesomeIcon icon={faDownload} />
					</Button>
				</div>
			</div>
			<div>
				<PDFDocument onLoadSuccess={onDocumentLoadSuccess} {...pdfDocumentProps} file={pdfFile} loading={loader()}>
					<Page pageNumber={pageNumber} {...pdfPageProps} loading={loader()} />
				</PDFDocument>
			</div>
		</div>
	);
};
