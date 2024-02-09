import { Form, Formik } from 'formik';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';
import Rating from '../Rating/Rating';
import Textarea from '../Textarea/Textarea';
import styles from './FeedbackForm.module.scss';
import { feedbackFormSchema } from './validationSchema';

type formProps = {
	name: string;
	email: string;
	rating: number;
	agreeToTerms: boolean;
	comment?: string;
	contact?: boolean;
};

const initialValues: formProps = {
	name: '',
	email: '',
	rating: 0,
	agreeToTerms: false,
	comment: '',
	contact: false,
};

const FeedbackForm = () => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={feedbackFormSchema}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values);
				setSubmitting(false);
			}}>
			{({ isSubmitting, values }) => (
				<Form className={styles.form}>
					<Input label="Name*" name="name" placeholder="Type a name..." />
					<Input label="Email*" name="email" placeholder="Type an email..." />
					<Rating label="Rate the game*" name="rating" />
					<Checkbox label="I agree to the processing of personal data*" name="agreeToTerms" />
					{values.rating < 4 && values.rating > 0 && (
						<>
							<Checkbox label="Contact me" name="contact" />
							<p className="error">
								We're sorry you didn't enjoy the game. We would like to improve. Please describe any
								issues or ideas in the comments. If you wish us to contact you, please check the box
								above.
							</p>
							<Textarea label="Comment" name="comment" placeholder="Your comment here..." />
						</>
					)}
					<Button type="submit" label="Send" disabled={isSubmitting} />
				</Form>
			)}
		</Formik>
	);
};

export default FeedbackForm;
