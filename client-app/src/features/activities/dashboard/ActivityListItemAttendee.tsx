import { observer } from "mobx-react-lite";
import React, {} from "react";
import { Link } from "react-router-dom";
import { List, Image, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: Profile[];
}

function ActivityListItemAttendee({attendees}: Props) {
    return (
        <List horizontal>
            {/* <List.Item >
                <Image size='mini' circular src={'/assets/user.png'} />
            </List.Item> */}
            
            {attendees.map(attendee => (
                // <List.Item key={attendee.userName} as={Link} to={`/profiles/${attendee.userName}`} >
                //     <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
                // </List.Item>

                <Popup hoverable key={attendee.userName} trigger={
                    <List.Item key={attendee.userName} as={Link} to={`/profiles/${attendee.userName}`} >
                        <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
                    </List.Item>
                }>
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            ))}

        </List>
    )
}

export default observer(ActivityListItemAttendee);