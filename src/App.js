import './App.css';
import {useState, React, useEffect} from 'react';
import { AiFillDelete,AiFillCheckCircle } from "react-icons/ai";

function App() {
  const[isCompleteScreen, setIsCompleteScreen]= useState(false);

  const[allTodos,setTodos] = useState([]);
  const[newTitle, setNewTitle] = useState("");
  const[newDescription, setNewDescription] = useState("");
  const[completedTodo, setCompletedTodo] = useState([]);

  const handleAddTodo =  () =>{
      let newTodoItem = {
        title:newTitle,
        description:newDescription,
      }

      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);

      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  }

  useEffect(() =>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
    
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodo(savedCompletedTodo);
    }
  },[]);

  const handleDelete = (index) => {
   let reducedTodo = [...allTodos];

    reducedTodo.splice(index,1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleCompleteDelete = (index) => {
    let reducedTodo = [...completedTodo];
 
     reducedTodo.splice(index,1);
     localStorage.setItem('completedTodo', JSON.stringify(reducedTodo));
     setCompletedTodo(reducedTodo);
   }



  const handleComplete = (index) =>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + '-' + mm + '-' + yyyy+ ' at ' + h + ':' + m+ ':' + s ;
    
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }
    let updatedCompletedArr =[...completedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem('completedTodo', JSON.stringify(updatedCompletedArr));

  }

  return (
    <div className="App">
      {/* Main heading */}
      <h1>Keep Notes</h1>

      <div className='todo-wrapper'>
        {/* Input area for adding new tasks */}
        <div className='todo-input'>
          {/* Title input */}
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='Title of the task' />
          </div>

          {/* Description input */}
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='Enter the task' />
          </div>

          {/* Add button */}
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primarybtn'>Add</button>
          </div>
        </div>

        {/* Button area for toggling between "Todo" and "Completed" tasks */}
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick= {()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick= {()=>setIsCompleteScreen(true)}>Completed</button>
        </div>

        {/* List of todo items */}
        <div className='todo-list'>
          {isCompleteScreen === false &&  allTodos.map((item,index) => {
            return(
              <div className='todo-list-item' key={index}>
              <div>
                {/* Task name */}
                <h3>{item.title}</h3>
                {/* Task description */}
                <p>{item.description}</p>
              </div>
  
              <div>
              <AiFillDelete className='delete-icon' onClick={() => handleDelete(index)}/>
              <AiFillCheckCircle className='check-icon' onClick={() => handleComplete(index)}/>
             </div>
            </div>
            )
          })}
           {isCompleteScreen === true &&  completedTodo.map((item,index) => {
            return(
              <div className='todo-list-item' key={index}>
              <div>
                {/* Task name */}
                <h3>{item.title}</h3>
                {/* Task description */}
                <p>{item.description}</p>
                <p><small>Completed on: {item.completedOn}</small></p>
              </div>
  
              <div>
              <AiFillDelete className='delete-icon' onClick={() => handleCompleteDelete(index)}/>
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
