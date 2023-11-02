import { useState } from 'react';

type TUseModal<T> = { onOpen: () => void; onClose: () => void; isOpen: boolean; onToggle: () => void; setActive: (item: T) => void; activeItem: T | undefined };

/**
 * ## useModalState
 * Modal hook for modal component
 */
export const useModalState = <T,>(initialOpen = false): TUseModal<T> => {
	const [isOpen, setIsOpen] = useState(initialOpen);
	const [activeItem, setActiveItem] = useState<T>();

	const onOpen = () => {
		setIsOpen(true);
	};

	const onClose = () => {
		setActiveItem(undefined);
		setIsOpen(false);
	};

	const onToggle = () => {
		setIsOpen(!isOpen);
	};

	const setActive = (item: T) => {
		setActiveItem(item);
		setIsOpen(true);
	};

	return { onOpen, onClose, isOpen, onToggle, setActive, activeItem };
};
