import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

interface Props {
    activity: Activity;
}

export default observer( function ActivityListItem({activity} : Props) {
    // const {activityStore} = useStore();
    // const {deleteActivity, loading: submitting} = activityStore;
    // const [target, setTarget] = useState('');

    // function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
    //     setTarget(event.currentTarget.name);
    //     deleteActivity(id);
    // }
    
    return (
        // <Item key={activity.id}>
        //     <Item.Content>
        //         <Item.Header as='a'>{activity.title}</Item.Header>
        //         <Item.Meta>{activity.date}</Item.Meta>
        //         <Item.Description>
        //             <div>{activity.description}</div>
        //             <div>{activity.city}, {activity.venue}</div>
        //         </Item.Description>
        //         <Item.Extra>
        //             {/* <Button floated='right' content='View' color='blue' /> */}
        //             {/* <Button floated='right' content='View' color='blue' onClick={() => selectActivity(activity.id)} /> */}
        //             <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${activity.id}`} />

        //             {/* <Button floated='right' content='Delete' color='red' onClick={() => deleteActivity(activity.id)} loading={submitting} name={activity.id} /> */}
        //             <Button floated='right' content='Delete' color='red' onClick={(event) => handleActivityDelete(event, activity.id)} loading={submitting && target === activity.id} name={activity.id} />

        //             <Label basic content={activity.category} />
        //         </Item.Extra>
        //     </Item.Content>
        // </Item>

        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circuler='true' src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`} >
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Ashraf</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {activity.date}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} color='teal' floated='right' content='View' />
            </Segment>
        </Segment.Group>
    )
})