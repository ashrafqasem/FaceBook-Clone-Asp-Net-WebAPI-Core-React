import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Header, Label } from 'semantic-ui-react';
import { addAbortSignal } from 'stream';
import MyTextInput from '../../app/common/form/MyTextInput';
import ModalContainer from '../../app/common/modals/ModalContainer';
import { UserFormValues } from '../../app/models/user';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
    const {userStore, commonStore} = useStore();
    const navigate = useNavigate();

    const [userFormValues, setUserFormValues] = useState<UserFormValues>({ //' nn
        email: '',
        password: '',
        displayName: '',
        userName: '',
    });

    function handleFormSubmit(userFormValues: UserFormValues) { //' nn
        console.log(userFormValues);

        userStore.login(userFormValues).then(() => navigate('/activities'));
        //userStore.getUser().then(() => navigate('/activities'));

        userFormValues.userName = 'userNameTest';
        userFormValues.displayName = 'displayNameTest';
        //userStore.register(userFormValues).then(() => navigate('/activities'))
    }

    return (
        <Formik
            initialValues={{email: '', password: '', error: null}} 
            //initialValues={userFormValues} //.
            
            //onSubmit={values => console.log(values)} 
            //onSubmit={values => handleFormSubmit(values)} //.
            //onSubmit={values => userStore.login(values)} 
            onSubmit={(values , {setErrors}) => userStore.login(values).catch(err => 
                setErrors({
                    //error: err,
                    error: 'Invalid email or password',
                }),
            )} 
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Facebook' color='teal' textAlign='center' />
                    <MyTextInput placeholder={'Email'} name={'email'} />
                    <MyTextInput placeholder={'Password'} name={'password'} type='password' />
                    <ErrorMessage name='error' render={() => <Label content={errors.error} color='red' basic style={{ marginBottom: 10 }} />} />
                    <Button type='submit' content='Login' positive fluid loading={isSubmitting} disabled={isSubmitting || !isValid || !dirty} />
                </Form>
            )}
        </Formik>
    )
})