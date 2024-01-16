import styles from "./Button.module.css";

type ButtonProps = {
	label: string;
	onClick: () => void;
	type?: "button" | "submit" | "reset";
	className?: string;
};

const Button = ({
	label,
	onClick,
	className,
	type = "button",
}: ButtonProps) => {
	const buttonClass = className
		? `${styles.button} ${styles[className]}`
		: styles.button;

	return (
		<button className={buttonClass} type={type} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
