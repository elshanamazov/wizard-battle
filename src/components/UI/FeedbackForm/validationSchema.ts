import * as Yup from 'yup';

export const feedbackFormSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email address').required('Email is required'),
	rating: Yup.number().required('Rating is required').min(1).max(5),
	agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the processing of personal data'),
	comment: Yup.string(),
});
