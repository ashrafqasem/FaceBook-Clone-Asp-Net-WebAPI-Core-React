import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, List } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';
import ActivityList from './ActivityList';

// interface Props {
//     activities: Activity[];
//     //selectedActivity: Activity | undefined;
//     //selectActivity: (id: string) => void;
//     //cancelSelectActivity: () => void;
//     //editMode: boolean;
//     //openForm: (id: string) => void;
//     //closeForm: () => void;
//     //cearteOrEdit: (activity: Activity) => void ;
//     //deleteActivity: (id: string) => void;
//     //submitting: boolean;
// }

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

//export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, cearteOrEdit, deleteActivity, submitting}: Props) {
//export default observer( function ActivityDashboard({activities,  cearteOrEdit, deleteActivity, submitting}: Props) {
//export default observer( function ActivityDashboard({activities, deleteActivity, submitting}: Props) {
export default observer( function ActivityDashboard() {
    const { activityStore } = useStore(); //' n
    //const { selectedActivity, editMode } = activityStore; //' n
    const { loadActivities, activityRegistry } = activityStore; //' n

    useEffect(() => { //' n
        //activityStore.loadActivities();
        if(activityRegistry.size <= 1) {
            loadActivities();
        }
    //}, [activityStore])
    }, [loadActivities, activityRegistry.size])

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app...' /> //' n

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

                {/* <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting} /> */}
                {/* <ActivityList activities={activities} deleteActivity={deleteActivity} submitting={submitting} /> */}
                <ActivityList />

            </Grid.Column>
            <Grid.Column width='6'>
                {/* <ActivityDetails activity={activities[0]} /> */}
                {/* {activities[0] && <ActivityDetails activity={activities[0]} />} */}

                {/* {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm} />} */}
                {/* {selectedActivity && !editMode && <ActivityDetails />} */}

                {/* {activities[0] && <ActivityForm activity={activities[0]} />} */}
                {/* {selectedActivity && <ActivityForm activity={selectedActivity} />} */}
                {/* {editMode && <ActivityForm activity={selectedActivity} closeForm={closeForm} cearteOrEdit={cearteOrEdit} submitting={submitting} /> } */}
                {/* {editMode && <ActivityForm cearteOrEdit={cearteOrEdit} submitting={submitting} /> } */}
                {/* {editMode && <ActivityForm />} */}

                <h2>Activity filters</h2>

            </Grid.Column>
        </Grid>
    )

//} //'
}); 