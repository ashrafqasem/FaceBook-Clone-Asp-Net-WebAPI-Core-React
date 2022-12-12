import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

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
    const {selectedActivity, formClose: closeForm, createActivity, updateActivity, loading: submitting} = activityStore; //' nw

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        console.log(activity); 
        //setActivity(activity);
        //cearteOrEdit(activity);

        // if (activity.id) {
        //     updateActivity(activity);
        // }else {
        //     createActivity(activity);
        // }

        activity.id ?  updateActivity(activity) :  createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}  />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated='right' type='submit' content='Submit' positive onChange={handleInputChange} loading={submitting}  />
                {/* <Button floated='right' type='submit' content='Cancel' /> */}
                <Button floated='right' type='submit' content='Cancel' onClick={closeForm} />
            </Form>
        </Segment>
    )

//} //'
})
