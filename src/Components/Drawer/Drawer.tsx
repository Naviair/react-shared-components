import { Button, DrawerProps, Modal, Drawer as AntdDrawer } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import './styles.scss';

export interface IDrawer extends DrawerProps {
	/* Drawer onClose handler */
	onClose?: () => void;
	/* Drawer onDownload handler */
	onDownload?: () => void;
	/* Drawer onSave handler */
	onSave?: () => void;
	/* Enable render in dom */
	renderInDom?: boolean;
	/* Use standard footer */
	standardFooter?: boolean;
	/* Component children */
	children: React.ReactNode;
}

export interface IDrawerRef {
	/* Open reffed drawer handler */
	open: () => void;
	/* Close reffed drawer handler */
	close: () => void;
}

/**
 * ## Drawer
 * @example <Drawer
 * 				renderInDom
 * 				width={300}
 * 				mask={false}
 * 				ref={drawerRef}
 * 				>{props.children}</Drawer>
 * @returns A drawer component
 */
export const Drawer = forwardRef<IDrawerRef, React.PropsWithChildren<IDrawer>>((props, ref) => {
	const [getShowState, setShowState] = useState<boolean>(false);
	const [, modalContextHolder] = Modal.useModal();

	/**
	 * Allows direct interaction with the DOM element, and gives us control over the return value
	 * Open and close the drawer.
	 * @param ref The ref drawer element to handle
	 */
	useImperativeHandle(ref, () => ({
		open(): void {
			setShowState(true);
		},
		close(): void {
			handleClose();
		},
	}));

	useEffect(() => {
		if (props.open !== undefined) {
			props.open ? setShowState(true) : handleClose();
		}
	}, [props.open]);

	/**
	 * Close the drawer
	 * If props.onClose is set, we call the function.
	 * If not, just close.
	 */
	const handleClose = () => {
		props.onClose?.();
		setShowState(false);
	};

	/**
	 * Save and close the drawer
	 * If props.onSave is set, call the function
	 * If not, call {@function handleClose()}
	 */
	const handleSave = () => {
		props.onSave?.();
		handleClose();
	};

	/**
	 * Header wrapper element for props.title.
	 * Will only render if props.title is set.
	 * @returns a header drawer element
	 */
	const DrawerHeader: React.FC = () => (
		<div className={'scDrawerHeader'}>
			<div className={'scDrawerHeaderLeft'}>{props.title}</div>
			{props.onDownload && (
				<div className={'scDrawerHeaderRight'}>
					<Button icon={<DownloadOutlined />} onClick={props.onDownload}>
						{'Download'}
					</Button>
				</div>
			)}
		</div>
	);

	/**
	 * Will render props.standardFooter element if set to true.
	 * @returns a footer element for the drawer.
	 */
	const Footer: React.FC = () => (
		<div className={'scDrawerButton'}>
			<Button onClick={handleClose} className={'cancel'}>
				{'Annuller'}
			</Button>
			<Button type={'primary'} onClick={handleSave}>
				{'Gem'}
			</Button>
		</div>
	);

	return (
		<AntdDrawer
			{...props}
			title={props.title && <DrawerHeader />}
			style={{ position: props.renderInDom ? 'absolute' : undefined, textAlign: 'left' }}
			getContainer={props.renderInDom ? false : undefined}
			footer={props.standardFooter ? <Footer /> : undefined}
			open={getShowState}>
			{props.children}
			<div>{modalContextHolder}</div>
		</AntdDrawer>
	);
});
