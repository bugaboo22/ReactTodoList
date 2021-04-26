import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';

function Todolist() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());

  const gridRef = useRef();

  const newDate = (date) => {
    setTodo({...todo, date: date.toISOString()})
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    if(gridRef.current.getSelectedNodes().length > 0)
      setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex));
    else 
      alert("Valitse poistettava rivi");
  }

  const deleteAll = () => {
      setTodos([]);    
    }  

  const columns = [
    { headerName: "Description", field: "description", sortable: true, filter: true, FloatingFilter: true, },
    { headerName: "Date", field: "date", sortable: true, filter: true, FloatingFilter: true },
    { headerName: "Priority", field: "priority", sortable: true, filter: true, FloatingFilter: true,
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
  ];

  return (
    <div>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={selectedDate} onChange={date => newDate(date)}/>
      </MuiPickersUtilsProvider>
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      <Button onClick={addTodo} color="primary">Add</Button>
      <Button onClick={deleteTodo} color="primary">Delete</Button>
      <Button onClick={deleteAll} color="primary">Delete All</Button>
      <div 
        className="ag-theme-material" 
        style={{ width: '40%', height: '700px', margin: 'auto'}}>
        
        <AgGridReact 
        defaultColDef={{
                flex: 1,
                minWidth: 150,
                filter: true,
                sortable: true,
                floatingFilter: true       
              }}
        animateRows={true}
        rowData={todos}
        columnDefs={columns}
        rowSelection="single"
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api } >

        <AgGridColumn filter={true} floatingFilter={true} />
        </AgGridReact>     
           
      </div>     
    </div>
  );
};

export default Todolist;
