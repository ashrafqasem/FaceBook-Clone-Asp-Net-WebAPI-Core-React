import React, { Fragment, useEffect, useState } from 'react'; //'

//import logo from './logo.svg'; //'
//import './App.css'; //'

import { ducks } from '../../demo'; //'
import DuckItem from '../../DuckItem'; //'
import axios from 'axios'; //'
import { Button, Container, Header, List } from 'semantic-ui-react'; //'
import { Activity } from '../models/activity'; //'
import NavBar from './NavBar'; //
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {

  // //const [activities, setActivities] = useState([]); //'
  // const [activities, setActivities] = useState<Activity[]>([]); //'
  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [submitting, setSubmitting] = useState(false);

  // const {activityStore} = useStore();

  // useEffect(() => {
  //   //axios.get('http://localhost:5000/api/activities').then(response => {

  //   // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
  //   //   //console.log(response.data); //'
  //   //   setActivities(response.data);
  //   // })

  //   // agent.Activities.List().then(response => {
  //   //   setActivities(response);
  //   // })

  //   // agent.Activities.List().then(response => {

  //   //   //Fix for Date
  //   //   let activities: Activity[] = [];
  //   //   response.forEach(activity => {
  //   //     activity.date = activity.date.split('T')[0];
  //   //     activities.push(activity);
  //   //   });

  //   //   setActivities(response);
  //   //   setLoading(false);
  //   // });

  //   activityStore.loadActivities();
  //   //setActivities(activityStore.activities); //. nn

  // //}, []) //. useEffect
  // }, [activityStore]) //. useEffect


  // // function handleSelectActivity(id: string) {
  // //   setSelectedActivity(activities.find(x => x.id === id));
  // // }

  // // function handleCancelSelectActivity() {
  // //   setSelectedActivity(undefined);
  // // }

  // // function handleFormOpen(id?: string) {
  // //   id ? handleSelectActivity(id) : handleCancelSelectActivity();
  // //   setEditMode(true);
  // //   //setSelectedActivity(undefined);
  // // }

  // // function handleFormClose() {
  // //   setEditMode(false);
  // // }

  // // function handleCearteOrEditeActivity(activity: Activity) {
  // //   // activity.id 
  // //   //   ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
  // //   //   : setActivities([...activities, {...activity, id: uuid()} ]);
    
  // //  setSubmitting(true);

  // //   if (activity.id) {
  // //     agent.Activities.update(activity).then(() => {
  // //       setActivities([...activities.filter(x => x.id !== activity.id), activity]);
  // //       setSelectedActivity(activity);
  // //       setEditMode(false);
  // //       setSubmitting(false);
  // //     });
  // //   } else {
  // //     activity.id = uuid();
  // //     agent.Activities.create(activity).then(() => {
  // //       setActivities([...activities, activity ]);
  // //       setSelectedActivity(activity);
  // //       setEditMode(false);
  // //       setSubmitting(false);
  // //     });
  // //   }
  // // }

  // // function handleDeleteActivity(id: string) {
  // //   setSubmitting(true);

  // //   //setActivities([...activities.filter(x => x.id !== id)]);
  // //   if (id) {
  // //     agent.Activities.delete(id).then(() => {
  // //       setActivities([...activities.filter(x => x.id !== id)]);
  // //       setSubmitting(false);
  // //     })
  // //   }
  // // }

  // // return (
  // //   <div className="App">
  // //     <header className="App-header">
  // //       <img src={logo} className="App-logo" alt="logo" /> 
        
  // //       {ducks.map(duck => ( //'
  // //         // <div key={duck.name}>
  // //         //   <span>{duck.name}</span>
  // //         //   <button onClick={() => duck.makeSound!(duck.name + ' quack')}>button1</button>
  // //         // </div>

  // //         <DuckItem duck={duck} key={duck.name} />
  // //       ))}

  // //       {/* <p>  //' */}
  // //       <p style={{color: 'red'}}> {/* //' */}
  // //         Edit <code>src/App.tsx</code> and save to reload. !!
  // //       </p>
  // //       <a
  // //         className="App-link"
  // //         href="https://reactjs.org"
  // //         target="_blank"
  // //         rel="noopener noreferrer"
  // //       >
  // //         Learn React
  // //       </a>

  // //       {/* //' */}
  // //       <ul> 
  // //         {activities. map((activity: any) => (
  // //           <li key={activity.id}>
  // //             {activity.title}
  // //           </li>
  // //         ))}
  // //       </ul>

  // //     </header>
  // //   </div>
  // // );


  // //if (loading) return <LoadingComponent content='Loading app' />
  // if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  // return ( //'
  //   // <div>
  //     <Fragment>
  //       {/* <Header as='h2' icon='users' content='Reactivities' /> */}

  //       {/* <NavBar openForm={handleFormOpen} /> */}
  //       {/* <NavBar openForm={activityStore.formOpen} /> */}
  //       <NavBar />

  //       <Container style={{marginTop: '7em'}}>
  //         {/* <List> */}
  //             {/* {activities. map((activity: any) => ( */}
  //             {/* {activities. map(activity => (
  //               <List.Item key={activity.id}>
  //                 {activity.title}
  //               </List.Item>
  //             ))}
  //         </List> */}

  //         {/* <h2>{activityStore.title}</h2>
  //         <Button content='Add exclamation!' positive onClick={activityStore.setTitle} /> */}

  //         {/* <ActivityDashboard 
  //           //activities={activities} 
  //           //activities={activityStore.activities} 

  //           //selectedActivity={selectedActivity} 
  //           //selectedActivity={activityStore.selectedActivity} 

  //           // //selectActivity={handleSelectActivity} 
  //           // selectActivity={activityStore.selectActivity} 

  //           // //cancelSelectActivity={handleCancelSelectActivity}
  //           // cancelSelectActivity={activityStore.cancelSelectedActivity}

  //           //editMode={editMode}
  //           //editMode={activityStore.editMode}

  //           // //openForm={handleFormOpen}
  //           // openForm={activityStore.formClose}

  //           // //closeForm={handleFormClose}
  //           // closeForm={activityStore.formClose}

  //           //cearteOrEdit={handleCearteOrEditeActivity}

  //           //deleteActivity={handleDeleteActivity}
  //           //submitting={submitting}
  //         /> */}

  //         <Outlet />
          
  //       </Container>
  //     </Fragment>
  //   //</div>
  // )

  const location = useLocation(); //' n

  return ( 
    <Fragment>
      <ToastContainer  position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage /> : (
        //<Fragment>
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Outlet />
            </Container>
          </>
      )}
    </Fragment>
)




}

//export default App;
export default observer(App);
