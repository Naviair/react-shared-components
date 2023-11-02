import React, { createRef, FC, useState } from 'react';
import './styles.scss';
import Draggable, { DraggableData } from 'react-draggable';
import { ModalProps, Modal as AntdModal } from 'antd';

export interface IModal extends ModalProps {
	/* Toggle modal draggable */
	draggable?: boolean;
	/* Title of the modal */
	headerTitle?: React.ReactNode | string;
	/* Modal onClose handler */
	onClose?: () => void;
}

/**
 * ## Modal
 * @example <Modal {...props} footer={[some_buttons]} closable>
			<div className={'modal-content'}>
				<h4>{'some_content'}</h4>
			</div>
		</Modal>				
 * @returns a modal component
 */
export const Modal: FC<IModal> = (props) => {
	const [getDisabledState, setDisabledState] = useState<boolean>(true);
	const [getBoundsState, setBoundsState] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});

	const draggleRef = createRef<HTMLDivElement>();

	/**
	 * Draggable modal wrapper
	 * Updates the modal bounds on drag
	 */
	const onStart = (uiData: DraggableData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (targetRect) {
			setBoundsState({
				left: -targetRect.left + uiData.x,
				right: clientWidth - (targetRect.right - uiData.x),
				top: -targetRect.top + uiData.y,
				bottom: clientHeight - (targetRect.bottom - uiData.y),
			});
		}
	};

	/**
	 * Draggable header wrapper element for title.
	 * If props.draggable is set we render this, to allow dragging.
	 * @returns a header with a draggable cursor indicator
	 */
	const DraggableHeader: React.FC<{ title: React.ReactNode | string }> = (props) => {
		return (
			<div className={'scDraggableHeader'} onMouseOver={() => getDisabledState && setDisabledState(false)} onMouseOut={() => setDisabledState(true)}>
				{props.title}
			</div>
		);
	};

	return (
		<AntdModal
			{...props}
			title={props.draggable ? <DraggableHeader title={props.title} /> : props.title}
			centered
			destroyOnClose
			onCancel={props.onClose}
			modalRender={(modal) => (
				<Draggable nodeRef={draggleRef} disabled={getDisabledState} bounds={getBoundsState} onStart={(_, uiData) => onStart(uiData)}>
					<div ref={draggleRef}>{modal}</div>
				</Draggable>
			)}>
			<div>{props.children}</div>
		</AntdModal>
	);
};
