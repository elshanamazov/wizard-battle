import Button from "./Button";

type ModalProps = {
	text: string;
	onClose: () => void;
	children?: React.ReactNode;
};

const Modal = ({ text, onClose, children }: ModalProps) => {
	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<Button label="X" onClick={onClose} />
				<p className="modal-text">{text}</p>
				{children}
			</div>
		</div>
	);
};

export default Modal;
