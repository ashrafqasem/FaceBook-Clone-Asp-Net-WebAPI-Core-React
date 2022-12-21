import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';

//import { Button, Form, Segment } from 'semantic-ui-react';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react'; //. Form -> formik

import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

// interface Props {
//     //activity: Activity | undefined;
//     //closeForm: () => void;
//     //cearteOrEdit: (activity: Activity) => void ;
//     //submitting: boolean;
// }

//export default function ActivityForm({activity: selectedActivity, closeForm, cearteOrEdit, submitting}: Props) {
//export default function ActivityForm({cearteOrEdit, submitting}: Props) {
export default observer(function ActivityForm() {

    const {activityStore} = useStore(); //' nw

    //const {selectedActivity, formClose: closeForm} = activityStore; //' nw
    //const {selectedActivity, formClose: closeForm, createActivity, updateActivity, loading: submitting} = activityStore; //' nw
    const {selectedActivity, createActivity, updateActivity, loading: submitting, loadActivity, loadingInitial} = activityStore; //' nw
    const {id} = useParams();  //' nw
    const navigate  = useNavigate();//' nw

    //const [activity, setActivity] = useState(initialState);
    // const initialState = selectedActivity ?? {
    //     id: '',
    //     title: '',
    //     category: '',
    //     description: '',
    //     date: '',
    //     city: '',
    //     venue: ''
    // }

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        //date: '',
        date: null,
        city: '',
        venue: ''
    });

    let msgRequired = 'This field is required';

    const validationSchema = Yup.object({
        title: Yup.string().required('this field is required'),
        category: Yup.string().required(msgRequired),
        description: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required()
    })

    useEffect(() => {
        if (id) { 
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [id, loadActivity])

    // function handleSubmit() {
    //     console.log(activity); 
    //     //setActivity(activity);
    //     //cearteOrEdit(activity);

    //     // if (activity.id) {
    //     //     updateActivity(activity);
    //     // }else {
    //     //     createActivity(activity);
    //     // }

    //     //activity.id ?  updateActivity(activity) :  createActivity(activity);

    //     if(!activity.id) {
    //         activity.id = uuid();
    //         createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    //     } else {
    //         updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    //     }
       
    // }

    function handleFormSubmit(activity: Activity) {
        console.log(activity); 
        //setActivity(activity);
        //cearteOrEdit(activity);

        // if (activity.id) {
        //     updateActivity(activity);
        // }else {
        //     createActivity(activity);
        // }

        //activity.id ?  updateActivity(activity) :  createActivity(activity);

        if(!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
       
    }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value });
    // }

    if(loadingInitial) return <LoadingComponent content='Loading Activity...' />; //' nw

    return (
        // <Segment clearing>
        //     <Form onSubmit={handleSubmit} autoComplete='off' >
        //         <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
        //         <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}  />
        //         <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
        //         <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
        //         <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
        //         <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
        //         <Button floated='right' type='submit' content='Submit' positive onChange={handleInputChange} loading={submitting} />

        //         {/* <Button floated='right' type='submit' content='Cancel' /> */}
        //         {/* <Button floated='right' type='submit' content='Cancel' onClick={closeForm} /> */}
        //         <Button floated='right' type='submit' content='Cancel' as={Link} to='/activities'  />

        //     </Form>
        // </Segment>

        // <Segment clearing>
        //     <Formik initialValues={activity} enableReinitialize onSubmit={values => console.log(values)} >
        //         {({values: activity, handleChange, handleSubmit}) => (
        //             <Form onSubmit={handleSubmit} autoComplete='off' >
        //                 <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleChange} />
        //                 <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleChange}  />
        //                 <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleChange} />
        //                 <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleChange} />
        //                 <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleChange} />
        //                 <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleChange} />
        //                 <Button floated='right' type='submit' content='Submit' positive onChange={handleChange} loading={submitting} />
        //                 <Button floated='right' type='submit' content='Cancel' as={Link} to='/activities'  />
        //             </Form>
        //         )}
        //     </Formik>
        // </Segment>

        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik 
                initialValues={activity} 
                enableReinitialize 
                validationSchema={validationSchema} 
                // onSubmit={values => console.log(values)} 
                onSubmit={values => handleFormSubmit(values)} 
                >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >

                        {/* <Field placeholder='Title' name='title' /> */}
                        {/* <FormField>
                            <Field placeholder='Title' name='title' />
                            <ErrorMessage name='title' render={error => <Label basic color='red' content={error} /> } />
                        </FormField> */}
                        <MyTextInput placeholder={'Title'} name={'title'}></MyTextInput>
                        
                        <MyTextArea placeholder='Description' name='description' rows={3} />
                        <MySelectInput placeholder='Category' name='category' options={categoryOptions} />

                        {/* <Field placeholder='Date' name='date' type='date' /> */}
                        <MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat='MMM d, yyyy h:mm aa' />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />

                        {/* <Button floated='right' type='submit' content='Submit' positive loading={submitting} /> */}
                        <Button floated='right' type='submit' content='Submit' positive loading={submitting} disabled={isSubmitting || !dirty || !isValid } />

                        <Button floated='right' type='submit' content='Cancel' as={Link} to='/activities'  />
                    </Form>
                )}
            </Formik>
        </Segment>
    )

//} //'
})
