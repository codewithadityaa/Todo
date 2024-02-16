
import './App.css';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from "react-icons/bs"

function App() {
  const [done, setdone] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos,setCompletedTodos]=useState([]);

  const handleAddTodo = () => {
    
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr)); //JSON.stringify stores the data in local storage

    setNewTitle("");
    setNewDescription("");

  };

  const handleDeleteTodo= index =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s ;
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompleteArr = [...completedTodos];
    updatedCompleteArr.push(filteredItem);
    setCompletedTodos(updatedCompleteArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompleteArr));

  }
   const handleDeleteCompletedTodo = index =>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);

   };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist')); //JSON.parse will convert the local storage data into an array
    let savedCompleted = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompleted){
      setCompletedTodos(savedCompleted);
    }
  },[])

  return (
    <div className="App">
      <h1>My Todo's</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className='todo-input-item'>
            <label>Title </label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="what's the tast tracker" />
          </div>
          <div className='todo-input-item'>
            <label>Description </label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="what's the description" />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${done === false && 'active'}`} onClick={() => setdone(false)}>Todo </button>
          <button className={`secondaryBtn ${done === true && 'active'}`} onClick={() => setdone(true)}>Completed</button>
        </div>

        <div className="todo-list">

          {done === false && allTodos.map((item, index) => {
            return (
              <div div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?' />
                  <BsCheckLg className='check-icon'onClick={()=>handleComplete(index)} title='Complete?' />
                </div>
              </div>
            )

          })}
          
          {done === true && completedTodos.map((item, index) => {
            return (
              <div div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on : {item.completedOn}</small></p>
                </div>

                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete?' />
                </div>
              </div>
            )

          })}


        </div>
      </div>
    </div>
  );
}

export default App;
