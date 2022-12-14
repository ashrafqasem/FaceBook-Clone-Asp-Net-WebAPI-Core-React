import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, DropdownDivider, Header, Item, Label, List, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

// interface Props {
//     activities: Activity[];
//     //selectActivity: (id: string) => void;
//     //deleteActivity: (id: string) => void;
//     //submitting: boolean;
// }

//export default function ActivityList({activities, selectActivity, deleteActivity, submitting}: Props) {
//export default function ActivityList({activities, deleteActivity, submitting}: Props) {
export default observer( function ActivityList() {

    const [target, setTarget] = useState('');
    const {activityStore} = useStore(); //' n
    //const {activities, deleteActivity, loading: submitting } = activityStore; //' n
    //const {activityByDate: activities, selectActivity, deleteActivity, loadActivity, loading: submitting } = activityStore; //' n
    //const {activitiesByDate: activities, deleteActivity, loadActivity, loading: submitting } = activityStore; //' n
    const {groupedActivities, deleteActivity} = activityStore; //' n

    //event: any
    // function handleActivityDelete(event: any, id: string) {
    //     setTarget(event.target.name);
    //     deleteActivity(id);
    // }

    //React event
    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    // return (
    //     <Segment>
    //           <Item.Group divided>

    //             {/* <List> */}
    //                 {/* {activities. map((activity: any) => ( */}
    //                 {/* {activities. map(activity => (
    //                     <List.Item key={activity.id}>
    //                         {activity.title}
    //                     </List.Item>
    //                 ))}
    //             </List> */}

    //             {activities.map(activity => (
    //                 // <Item key={activity.id}>
    //                 //     <Item.Content>
    //                 //         <Item.Header as='a'>{activity.title}</Item.Header>
    //                 //         <Item.Meta>{activity.date}</Item.Meta>
    //                 //         <Item.Description>
    //                 //             <div>{activity.description}</div>
    //                 //             <div>{activity.city}, {activity.venue}</div>
    //                 //         </Item.Description>
    //                 //         <Item.Extra>
    //                 //             {/* <Button floated='right' content='View' color='blue' /> */}
    //                 //             {/* <Button floated='right' content='View' color='blue' onClick={() => selectActivity(activity.id)} /> */}
    //                 //             <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${activity.id}`}  />

    //                 //             {/* <Button floated='right' content='Delete' color='red' onClick={() => deleteActivity(activity.id)} loading={submitting} name={activity.id} /> */}
    //                 //             <Button floated='right' content='Delete' color='red' onClick={(event) => handleActivityDelete(event, activity.id)} loading={submitting && target === activity.id} name={activity.id} />
                               
    //                 //             <Label basic content={activity.category} />
    //                 //         </Item.Extra>
    //                 //     </Item.Content>
    //                 // </Item>

    //                 <ActivityListItem activity={activity} key={activity.id} />
    //             ))}
                
    //           </Item.Group>
    //     </Segment>
    // )


    return (
        <Fragment>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    {/* <Segment>
                        <Item.Group divided> */}
                            {activities.map(activity => (
                                <ActivityListItem activity={activity} key={activity.id} />
                            ))}
                        {/* </Item.Group>
                    </Segment> */}
                </Fragment>
            ))}
        </Fragment>
    )

})