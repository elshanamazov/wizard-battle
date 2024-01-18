import styles from "./IconButton.module.scss";

type IconButtonProps = {
	label?: string;
	onClick: () => void;
	type?: "button" | "submit" | "reset";
	className?: string;
	icon: React.ReactNode;
};

const IconButton = ({
	label,
	onClick,
	className,
	type = "button",
	icon,
}: IconButtonProps) => {
	const buttonClass = className
		? `${styles.IconButton} ${className || ""}`
		: styles.IconButton;

	return (
		<button className={buttonClass} type={type} onClick={onClick}>
			{label}
			{icon}
		</button>
	);
};

export default IconButton;
