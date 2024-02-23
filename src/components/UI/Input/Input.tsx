import { useField } from 'formik';
import styles from './Input.module.scss';

type InputProps = {
	label: string;
	name: string;
	placeholder?: string;
};

const Input = ({ label, name, placeholder }: InputProps) => {
	const [field, meta] = useField(name);

	return (
		<div className={styles.input}>
			<label className={styles.input__label}>
				{label}
				<input className={styles.input__field} type="text" placeholder={placeholder} {...field} />
			</label>
			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
		</div>
	);
};

export default Input;
