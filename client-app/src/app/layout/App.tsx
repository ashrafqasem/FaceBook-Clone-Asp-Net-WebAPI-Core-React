import React, { Fragment, useEffect, useState } from 'react'; //'

//import logo from './logo.svg'; //'
//import './App.css'; //'

import { ducks } from '../../demo'; //'
import DuckItem from '../../DuckItem'; //'
import axios from 'axios'; //'
import { Container, Header, List } from 'semantic-ui-react'; //'
import { Activity } from '../models/activity'; //'
import NavBar from './NavBar'; //
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  //const [activities, setActivities] = useState([]); //'
  const [activities, setActivities] = useState<Activity[]>([]); //'
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    //axios.get('http://localhost:5000/api/activities').then(response => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      //console.log(response.data); //'
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
    //setSelectedActivity(undefined);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCearteOrEditeActivity(activity: Activity) {
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()} ]);
    
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" /> 
        
  //       {ducks.map(duck => ( //'
  //         // <div key={duck.name}>
  //         //   <span>{duck.name}</span>
  //         //   <button onClick={() => duck.makeSound!(duck.name + ' quack')}>button1</button>
  //         // </div>

  //         <DuckItem duck={duck} key={duck.name} />
  //       ))}

  //       {/* <p>  //' */}
  //       <p style={{color: 'red'}}> {/* //' */}
  //         Edit <code>src/App.tsx</code> and save to reload. !!
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>

  //       {/* //' */}
  //       <ul> 
  //         {activities. map((activity: any) => (
  //           <li key={activity.id}>
  //             {activity.title}
  //           </li>
  //         ))}
  //       </ul>

  //     </header>
  //   </div>
  // );


  return ( //'
    // <div>
      <Fragment>
        {/* <Header as='h2' icon='users' content='Reactivities' /> */}
        <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
          {/* <List> */}
              {/* {activities. map((activity: any) => ( */}
              {/* {activities. map(activity => (
                <List.Item key={activity.id}>
                  {activity.title}
                </List.Item>
              ))}
          </List> */}

          <ActivityDashboard 
            activities={activities} 
            selectedActivity={selectedActivity} 
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            cearteOrEdit={handleCearteOrEditeActivity}
            deleteActivity={handleDeleteActivity}
          />
          
        </Container>
      </Fragment>
    //</div>
  )


}

export default App;
