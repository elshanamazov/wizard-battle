import styles from './Checkbox.module.scss';

type CheckboxProps = {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
	return (
		<div className={styles.checkbox}>
			<label className={styles.checkbox__label}>
				<input
					type="checkbox"
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
					className={styles.checkbox__input}
				/>
				<span className={styles.checkbox__control}></span>
				{label}
			</label>
		</div>
	);
};

export default Checkbox;
