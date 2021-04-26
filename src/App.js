
import './App.css';
import Todolist from './Components/todolist';
import React, { useState } from 'react';
import AppBar from'@material-ui/core/AppBar';
import Tabs from'@material-ui/core/Tabs';
import Tab from'@material-ui/core/Tab';


function App() {

  const[value, setValue] = useState('one');

  const handleChange= (event, value) => {
    setValue(value);
  };


  return (
    <div className="App"> 
      <AppBar position="static"> 
        <Tabs value={value} onChange={handleChange}>   
          <Tab  value="one" label="Home"/>
          <Tab  value="two" label="Todolist"/>
        </Tabs>
      </ AppBar>   
      {value  === 'one' && <div>Welcome to homepage</div>}
      {value  === 'two' && <div> <Todolist/></div>}
    </div>
  );
}

export default App;
