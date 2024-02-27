import React from 'react';
import { createPortal } from 'react-dom';

import IconButton from '../IconButton/IconButton';
import styles from './Modal.module.scss';
type ModalProps = {
	isOpen: boolean;
	text: string;
	textCustomClass?: string;
	onClose: () => void;
	children?: React.ReactNode;
};

const Modal = ({ text, onClose, children, isOpen, textCustomClass }: ModalProps) => {
	const textClickHandler = (event: React.MouseEvent<HTMLParagraphElement>): void => {
		event.stopPropagation();
	};

	if (!isOpen) return null;

	return createPortal(
		<div className={styles.modal} onClick={onClose}>
			<div className={styles.modal__content} onClick={textClickHandler}>
				<IconButton
					className={styles.modal__close}
					onClick={onClose}
					icon={
						<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M18.3,5.71 L18.3,5.71 C17.91,5.32 17.28,5.32 16.89,5.71 L12,10.59 L7.11,5.7 C6.72,5.31 6.09,5.31 5.7,5.7 L5.7,5.7 C5.31,6.09 5.31,6.72 5.7,7.11 L10.59,12 L5.7,16.89 C5.31,17.28 5.31,17.91 5.7,18.3 L5.7,18.3 C6.09,18.69 6.72,18.69 7.11,18.3 L12,13.41 L16.89,18.3 C17.28,18.69 17.91,18.69 18.3,18.3 L18.3,18.3 C18.69,17.91 18.69,17.28 18.3,16.89 L13.41,12 L18.3,7.11 C18.69,6.72 18.69,6.09 18.3,5.71 Z"
								fill="currentColor"
							/>
						</svg>
					}
				/>
				<p className={`${styles.modal__text} ${textCustomClass || ''}`}>{text}</p>
				{children}
			</div>
		</div>,
		document.getElementById('modal-root')!,
	);
};

export default Modal;
