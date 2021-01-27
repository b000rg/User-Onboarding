import React, { useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';


const SignUp = styled.form`

`;

const Input = styled.input`

`;

const Button = styled.button`

`;

const Form = () => {
    const formDefault = {name: '', email: '', password: '', tos: false};

    const [formData, setFormData] = useState({...formDefault});
    const [errors, setErrors] = useState({name: '', email: '', password: '', tos: ''});

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Please enter your name."),
        email: yup
            .string()
            .email("Must be a valid email address.")
            .required("Please enter your name."),
        password: yup
            .string()
            .min(8, "Your password must be at least 8 characters long.")
            .required("Please enter your password."),
        tos: yup
            .boolean()
            .oneOf([true], 'You must accept the terms of service.')
    });

    const handleSubmit = event => {
        event.preventDefault();
        let req = {
            data: {...formData}
        };
        axios.get('https://reqres.in/api/users', req)
            .then(res => {console.log(res)})
            .catch(err => {console.log(err)});
        setFormData({...formDefault});
    };

    const handleInput = event => {
        event.persist();
        yup.reach(schema, event.target.name)
            .validate(event.target.type === 'checkbox' ? event.target.checked : event.target.value)
            .then(valid => {
                setErrors({...errors, [event.target.name]: ''});
            })
            .catch(err => {
                setErrors({...errors, [event.target.name]: err.errors[0]});
            })

        setFormData({...formData, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value});
    };

    return (
        <SignUp onSubmit={handleSubmit}>
            <Input name="name" value={formData.name} type="text" onChange={handleInput} />
            {errors.name ? <p className="error">{errors.name}</p> : null}
            <Input name="email" value={formData.email} type="email" onChange={handleInput} />
            {errors.email ? <p className="error">{errors.email}</p> : null}
            <Input name="password" value={formData.password} type="password" onChange={handleInput} />
            {errors.password ? <p>{errors.password}</p> : null}
            <Input name="tos" checked={formData.tos} type="checkbox" onChange={handleInput} />
            {errors.tos ? <p>{errors.tos}</p> : null}
            <Button>Submit</Button>
        </SignUp>
    );
};

export default Form;
