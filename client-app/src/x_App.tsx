import React, { useEffect, useState } from 'react'; //'

import logo from './logo.svg';
import './App.css';

import { ducks } from './demo'; //'
import DuckItem from './DuckItem'; //'
import axios from 'axios'; //'
import { Header, List } from 'semantic-ui-react'; //'

function App() {

  const [activities, setActivities] = useState([]); //'
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response.data);
      setActivities(response.data);
    })
  }, [])

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
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
          {activities. map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
      </List>
    </div>
  )


}

export default App;
