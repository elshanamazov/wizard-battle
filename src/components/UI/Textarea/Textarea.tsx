import { useField } from 'formik';
import styles from './Textarea.module.scss';

type TextareaProps = {
	label: string;
	name: string;
	placeholder?: string;
};

const Textarea = ({ label, name, placeholder }: TextareaProps) => {
	const [field, meta] = useField(name);

	return (
		<div className={styles.textarea}>
			<label className={styles.textarea__label}>
				{label}
				<textarea className={styles.textarea__field} {...field} placeholder={placeholder} />
			</label>
			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
		</div>
	);
};

export default Textarea;
