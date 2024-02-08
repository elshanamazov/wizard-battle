import styles from './Input.module.scss';

type InputProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	checked?: boolean;
};

const Input = ({ label, value, onChange, placeholder }: InputProps) => {
	return (
		<div className={styles.input}>
			<label className={styles.input__label}>
				{label}
				<input
					className={styles.input__field}
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
				/>
			</label>
		</div>
	);
};

export default Input;
