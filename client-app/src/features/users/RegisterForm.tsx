import { ErrorMessage, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { values } from "mobx";
import { observer } from "mobx-react-lite"
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { UserFormValues } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup'
import { Fragment, useState } from "react";
import ValidationError from "../errors/ValidationError";

// export default observer(function RegisterForm() {
//     return (
//         null
//     )
// })

// const RegisterForm = () => {
//     return (
//         <h1>Register</h1>
//     )
// }

//const initialValuesObj: UserFormValues = {
const initialValuesObj = {
    email: '',
    password: '',
    displayName: '',
    userName: '',
    error: null,
}

let msgRequired = 'This field is required';

const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    userName: Yup.string().required(),
    email: Yup.string().required(msgRequired),
    password: Yup.string().required(),
})

function RegisterForm() {
    const {userStore} = useStore();
    const [errors_, setErrors_] = useState(null);

    return (
        <Formik 
            initialValues={initialValuesObj} 
            validationSchema={validationSchema}

            //onSubmit={values => console.log(values)}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(err =>
                setErrors({
                    //error: 'Invalid email or password',
                    error: err,
                }),
                //setErrors_(err),
            )}
            // onSubmit={(values) => userStore.register(values).catch(err => {
            //     console.log(err);  
            //     setErrors_(err); 
            // })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Fragment>
                    {/* <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' > */}
                    <Form className='ui form error' onSubmit={handleSubmit} autoComplete='on' > 
                        <Header as='h2' content='Sign up tp Facebook' color='teal' textAlign='center' />
                        <MyTextInput placeholder={"DisplayName"} name={"displayName"} />
                        <MyTextInput placeholder={"UserName"} name={"userName"} />
                        <MyTextInput placeholder={"ُEmail"} name={"email"} />
                        <MyTextInput placeholder={"Password"} name={"password"} />

                        {/* <ErrorMessage name='error' render={() => <Label content={errors.error} color='red' basic style={{marginBottom: 10}} />} /> */}
                        <ErrorMessage name='error' render={() => <ValidationError errors={errors.error} />} />

                        <Button type='submit' content='Register' positive fluid loading={isSubmitting} disabled={isSubmitting || !isValid || !dirty} />
                    </Form>

                    {/* {errors_ && <ValidationError errors={errors_} />} */}
                </Fragment>
            )}
        </Formik>
    )
}

//export default RegisterForm;
export default observer(RegisterForm);