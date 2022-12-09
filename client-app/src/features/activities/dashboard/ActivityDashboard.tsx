import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    cearteOrEdit: (activity: Activity) => void ;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

// export default function ActivityDashboard(props: Props) {
//     return (
//         <Grid>
//             <Grid.Column width='10'>
//                 <List>
//                     {/* {activities. map((activity: any) => ( */}
//                     {props.activities. map(activity => (
//                         <List.Item key={activity.id}>
//                         {activity.title}
//                         </List.Item>
//                     ))}
//                 </List>
//             </Grid.Column>
//         </Grid>
//     )

    export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, cearteOrEdit, deleteActivity, submitting}: Props) {
        return (
            <Grid>
                <Grid.Column width='10'>
                    {/* <List> */}
                        {/* {activities. map((activity: any) => ( */}
                        {/* {activities. map(activity => (
                            <List.Item key={activity.id}>
                            {activity.title}
                            </List.Item>
                        ))}
                    </List> */}
                    <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting} />
                </Grid.Column>
                <Grid.Column width='6'>
                    {/* <ActivityDetails activity={activities[0]} /> */}
                    {/* {activities[0] && <ActivityDetails activity={activities[0]} />} */}
                    {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm} />}
                    {/* {activities[0] && <ActivityForm activity={activities[0]} />} */}
                    {/* {selectedActivity && <ActivityForm activity={selectedActivity} />} */}
                    {editMode && <ActivityForm activity={selectedActivity} closeForm={closeForm} cearteOrEdit={cearteOrEdit} submitting={submitting} /> }
                   
                </Grid.Column>
            </Grid>
        )

}