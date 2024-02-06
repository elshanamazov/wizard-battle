import styles from './Textarea.module.scss';

type TextareaProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
};

const Textarea = ({ label, value, onChange, placeholder }: TextareaProps) => {
	return (
		<div className={styles.textarea}>
			<label className={styles.textarea__label}>
				{label}
				<textarea
					className={styles.textarea__field}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
				/>
			</label>
		</div>
	);
};

export default Textarea;
