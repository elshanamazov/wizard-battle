import Button from "../Button/Button";
import styles from "./Modal.module.css";

type ModalProps = {
	text: string;
	onClose: () => void;
	children?: React.ReactNode;
};

const Modal = ({ text, onClose, children }: ModalProps) => {
	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<Button label="X" onClick={onClose} className="closeButton" />
				<p className={styles.modalText}>{text}</p>
				{children}
			</div>
		</div>
	);
};

export default Modal;
