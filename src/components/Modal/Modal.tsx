import Button from "../Button/Button";
import styles from "./Modal.module.scss";

type ModalProps = {
	text: string;
	onClose: () => void;
	children?: React.ReactNode;
};

const Modal = ({ text, onClose, children }: ModalProps) => {
	return (
		<div className={styles.modal}>
			<div className={styles.modal__content}>
				<Button label="X" onClick={onClose} className="closeButton" />
				<p className={styles.modal__text}>{text}</p>
				{children}
			</div>
		</div>
	);
};

export default Modal;
