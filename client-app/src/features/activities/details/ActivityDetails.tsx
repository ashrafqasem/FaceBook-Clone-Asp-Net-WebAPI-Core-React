import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

// interface Props {
//     activity: Activity;
//     cancelSelectActivity: () => void;
//     openForm: (id: string) => void;
// }

//export default function ActivityDetails({activity, cancelSelectActivity, openForm} : Props) {
//export default function ActivityDetails() {
export default observer( function ActivityDetails() {

    const {activityStore} = useStore(); //' nw
    //const {selectedActivity: activity, formOpen: openForm, cancelSelectedActivity: cancelSelectActivity} = activityStore; //' nw
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore; //' nw
    const {id} = useParams(); //' nw

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    //if(!activity) return; //' nw
    //if(!activity) return <LoadingComponent />; //' nw
    if(!activity || loadingInitial) return <LoadingComponent />; //' nw

    return (
        // <Card fluid>
        //     <Image src={`/assets/categoryImages/${activity.category}.jpg`} /> 
        //     <Card.Content>
        //     <Card.Header>{activity.title}</Card.Header>
        //     <Card.Meta>
        //         <span>{activity.date}</span>
        //     </Card.Meta>
        //     <Card.Description>
        //         {activity.description}
        //     </Card.Description>
        //     </Card.Content>
        //     <Card.Content extra>
        //         <Button.Group width='2'>
        //             {/* <Button basic color='blue' content='Edit' onClick={() => openForm(activity.id)}  /> */}
        //             {/* <Button basic color='blue' content='Edit' as={Link} to={`/updateActivity/${activity.id}`} onClick={() => loadActivity(activity.id)} /> */}
        //             <Button basic color='blue' content='Edit' as={Link} to={`/manage/${activity.id}`} />

        //             {/* <Button basic color='grey' content='Cancel' /> */}
        //             {/* <Button basic color='grey' content='Cancel' onClick={cancelSelectActivity} as={NavLink} to='/activities' /> */}
        //             <Button basic color='grey' content='Cancel' as={Link} to='/activities' />

        //         </Button.Group>
        //     </Card.Content>
        // </Card>

        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedChat />
                <ActivityDetailedInfo activity={activity} />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar activity={activity!}  />
            </Grid.Column>
        </Grid>
    )

//} //'
})