import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import { useStore } from '../../../app/stores/store';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer (function ActivityDetailedHeader({activity}: Props) {
    const {activityStore} = useStore(); //'n

    function handleUpdateAttendanceToggle() {//. nn
        activityStore.updateAttendanceToggle();

        //window.location.reload();
        //eturn false;
    }

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {activity.isCancelled && (
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }} ribbon color='red' >Cancelled</Label>
                )}
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header size='huge' content={activity.title} style={{color: 'white'}} />

                                {/* <p>{activity.date}</p> */}
                                {/* <p>{activity.date?.toISOString()}</p> */}
                                {/* <p>{activity.date?.toDateString()}</p> */}
                                <p>{format(activity.date!, 'dd MMM yyyy')}</p>

                                <p>Hosted by <strong><Link to={`/profiles/${activity.host?.userName}`}>{activity.host?.userName}</Link></strong></p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {/* <Button>Cancel attendance</Button> */}
                {/* <Button color='teal'>Join Activity</Button> */}
                {/* <Button color='orange' floated='right'>Manage Event</Button> */}
                {/* <Button color='orange' floated='right' as={Link} to={`/manage/${activity.id}`} >Manage Event</Button> */}

                {activity.isHost ? (
                    <Fragment>
                        <Button color={activity.isCancelled ? 'green' : 'red'} floated='left' basic content={activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity' } onClick={activityStore.cancelActivityToggle} loading={activityStore.loading} />
                        <Button color='orange' floated='right' as={Link} to={`/manage/${activity.id}`} disabled={activity.isCancelled} >Manage Event</Button>
                    </Fragment>
                ) : activity.isGoing ? (
                    // <Button onClick={handleUpdateAttendanceToggle} loading={activityStore.loading} >Cancel attendance</Button>
                    <Button onClick={activityStore.updateAttendanceToggle}  loading={activityStore.loading} >Cancel attendance</Button>
                ): (
                    <Button onClick={activityStore.updateAttendanceToggle} loading={activityStore.loading} color='teal' disabled={activity.isCancelled} >Join Activity</Button>
                )}

            </Segment>
        </Segment.Group>
    )
})
