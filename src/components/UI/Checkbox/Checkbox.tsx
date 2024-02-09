import { useField } from 'formik';
import styles from './Checkbox.module.scss';

type CheckboxProps = {
	name: string;
	label: string;
};

const Checkbox = ({ label, name }: CheckboxProps) => {
	const [field, meta, helpers] = useField({ name, type: 'checkbox' });
	return (
		<div className={styles.checkbox}>
			<label className={styles.checkbox__label}>
				<input
					type="checkbox"
					{...field}
					checked={field.value}
					onChange={() => helpers.setValue(!field.value)}
					className={styles.checkbox__input}
				/>
				<span className={styles.checkbox__control}></span>
				{label}
			</label>
			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
		</div>
	);
};

export default Checkbox;
