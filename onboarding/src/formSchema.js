import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    name: Yup
        .string()
        .required('You must provide your name!'),
    email: Yup
        .string()
        .email('You must provide a valid email address!')
        .required('You must provide your email address!'),
    password: Yup
        .string()
        .min(8, 'Passwords must be 8 characters or longer!')
        .required('You must enter a password!'),
    tos: Yup
        .boolean()
        .oneOf([true], 'You must accept the terms of service!')
});

export default formSchema;
