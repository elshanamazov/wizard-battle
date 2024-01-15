type ButtonProps = {
	label: string;
	onClick: () => void;
	type?: "button" | "submit" | "reset";
};

const Button = ({ label, onClick, type = "button" }: ButtonProps) => {
	return (
		<button className="button" type={type} onClick={onClick}>
			{label}
		</button>
	);
};

export default Button;
