// import React from 'react';

// export function ActivityDetailedSidebar() {
//     return (
//         <h1>Sidebar</h1>
//     )
// }

import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity;
}

export default observer(function ActivityDetailedSidebar ({activity}: Props) {
    return (
        <>
            <Segment textAlign='center' style={{ border: 'none' }} attached='top' secondary inverted color='teal' >
                {/* 3 People Going */}
                {activity.activityAppUsers!.length } {activity.activityAppUsers!.length === 1 ? 'Person' : 'People' } Going
            </Segment>
            <Segment attached>
                <List relaxed divided>

                    {/* <Item style={{ position: 'relative' }}>
                        <Label style={{ position: 'absolute' }} color='orange' ribbon='right'>Host</Label>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Bob</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item> */}

                    {/* <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Tom</Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={{ position: 'relative' }}>
                        <Image size='tiny' src={'/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`#`}>Sally</Link>
                            </Item.Header>
                        </Item.Content>
                    </Item> */}

                    {activity.activityAppUsers!.map(attendee => (
                        // <Item style={{ position: 'relative' }} ></Item>
                        <Item style={{ position: 'relative' }} key={attendee.userName} >
                            {attendee.userName === activity.host?.userName && (
                                <Label style={{ position: 'absolute' }} color='orange' ribbon='right'>Host</Label>
                            ) }
       
                            <Image size='tiny' src={attendee.image || '/assets/user.png' } />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    {/* <Link to={`#`}>Pop</Link> */}
                                    <Link to={`/profiles/${attendee.userName}`}>{attendee.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ) )}
   
                </List>
            </Segment>
        </>

    )
})

