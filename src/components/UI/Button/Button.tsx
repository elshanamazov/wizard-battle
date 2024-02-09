import styles from './Button.module.scss';

type ButtonProps = {
	label: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	className?: string;
};

const Button = ({ label, onClick, className, type = 'button', disabled }: ButtonProps) => {
	const buttonClass = className ? `${styles.button} ${styles[className]}` : styles.button;

	return (
		<button className={buttonClass} type={type} disabled={disabled} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
