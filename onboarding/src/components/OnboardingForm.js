import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import formSchema from '../formSchema';

const OnboardingForm = ({addUser}) => {
    const defaultData = {name: '', email: '', password: '', tos: false};
    const [formData, setFormData] = useState({...defaultData});
    const [errors, setErrors] = useState({name: '', email: '', password: '', tos: ''});
    const [formValid, setFormValid] = useState(false);
    
    const handleInput = evt => {
        evt.persist();

        Yup
            .reach(formSchema, evt.target.name)
            .validate((evt.target.type === 'checkbox') ? evt.target.checked : evt.target.value)
            .then(() => {
                setErrors({...errors, [evt.target.name]: ''});
            })
            .catch(err => {
                setErrors({...errors, [evt.target.name]: err.errors[0]})
            });

        setFormData({...formData, [evt.target.name]: (evt.target.type === 'checkbox') ? evt.target.checked : evt.target.value});
    };

    const handleSubmit = evt => {
        evt.preventDefault();

        axios
            .post('https://reqres.in/api/users', formData)
            .then(res => {
                addUser(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        setFormData({...defaultData});
    };

    useEffect(() => {
        formSchema
            .isValid(formData)
            .then(valid => {
                if (valid !== formValid) setFormValid(valid);
            });
    }, [formData]);

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" value={formData.name} onChange={handleInput} />
                </div>
                {(errors.name) ? errors.name : null}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="text" value={formData.email} onChange={handleInput} />
                </div>
                {(errors.email) ? errors.email : null}
                <div>
                    <label htmlFor="password">Password:</label>
                    <input name="password" type="password" value={formData.password} onChange={handleInput} />
                </div>
                {(errors.password) ? errors.password : null}
                <div>
                    <label htmlFor="tos">Terms of Service:</label>
                    <input name="tos" type="checkbox" checked={formData.tos} onChange={handleInput} />
                </div>
                {(errors.tos) ? errors.tos : null}
                <button disabled={!formValid}>Submit</button>
            </Form>
        </div>
     );
};

const Form = styled.form`
    width: 50%;
    margin: auto 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export default OnboardingForm;
