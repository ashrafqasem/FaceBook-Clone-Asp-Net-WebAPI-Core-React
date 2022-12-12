import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store';

// interface Props {
//     activity: Activity;
//     cancelSelectActivity: () => void;
//     openForm: (id: string) => void;
// }

//export default function ActivityDetails({activity, cancelSelectActivity, openForm} : Props) {
export default function ActivityDetails() {

    const {activityStore} = useStore(); //' nw
    const {selectedActivity: activity, formOpen: openForm, cancelSelectedActivity: cancelSelectActivity} = activityStore; //' nw

    //if(!activity) return; //' nw
    if(!activity) return <LoadingComponent />; //' nw

    return (
        <Card fluid>
            {/* <Image src={'/assets/categoryImages/${activity.category}.jpg'} />  */}
            <Image src={'/assets/categoryImages/' + activity.category + '.jpg'  }/>
            <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group width='2'>
                    <Button basic color='blue' content='Edit' onClick={() => openForm(activity.id)}  />
                    {/* <Button basic color='grey' content='Cancel' /> */}
                    <Button basic color='grey' content='Cancel' onClick={cancelSelectActivity} />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}