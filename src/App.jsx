import React, { useState } from 'react';
import './App.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      if (editingIndex !== null) {
        const newTodos = [...todos];
        newTodos[editingIndex] = inputValue;
        setTodos(newTodos);
        setEditingIndex(null);
      } else {
        setTodos([...todos, inputValue]);
      }
      setInputValue('');
    }
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    const originalTask = todos[index];
    const [originalTitle, originalDescription] = originalTask.split(':');
    setTitle(originalTitle.trim());
    setDescription(originalDescription.trim());
    setPopupVisible(true);
  };
  
  const handleDeleteConfirmation = () => {
    const newTodos = [...todos];
    newTodos.splice(editingIndex, 1);
    setTodos(newTodos);
    setDeleteConfirmationVisible(false);
  };
  
  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleDeleteTodo = (index) => {
    setDeleteConfirmationVisible(true);
    setEditingIndex(index); 
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    setTitle('');
    setDescription('');
    setInputValue('');
  };

  const handleToggleDone = (index) => {
    const updatedTodos = [...todos];
    if (updatedTodos[index].includes("Done")) {
      updatedTodos[index] = updatedTodos[index].replace(" - Done", "");
    } else {
      updatedTodos[index] += " - Done";
    }
    setTodos(updatedTodos);
  };
  
  const handlePopupSubmit = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      if (editingIndex !== null) {
        const newTodos = [...todos];
        newTodos[editingIndex] = `${title}: ${description}`;
        setTodos(newTodos);
        setEditingIndex(null);
      } else {
        setTodos([...todos, `${title}: ${description}`]);
      }
      handlePopupClose();
    } else {
      alert('Please enter title and description');
    }
  };

  const handleDeleteAll = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete all tasks?");
    if (isConfirmed) {
      setTodos([]);
    }
  };  
  
  const handleMarkAllDone = () => {
    const allDone = todos.every(todo => todo.includes("Done")); // Check if all todos are marked as done
  
    const updatedTodos = todos.map(todo => {
      if (allDone) {
        return todo.replace(" - Done", ""); // Undo if all todos are currently marked as done
      } else {
        return todo + " - Done"; // Mark as done if not all todos are currently marked as done
      }
    });
  
    setTodos(updatedTodos);
  };
  
  return (
    <div className='color'>
    <div className="container">
      <h1>To-Do List App</h1>
      <p>Got things to do? List it <a href="https://bit.ly/A3-4Guide">Here</a></p>
      <div className="popup" style={{ display: popupVisible ? 'flex' : 'none' }}>
  <div className="popup-content">
    <h2>{editingIndex !== null ? 'Edit Task' : 'Add Task'}</h2>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
    <button className="go-button"onClick={handlePopupSubmit}>{editingIndex !== null ? 'Save' : 'Add'}</button>&nbsp;
    <button className="cancel-button" onClick={handlePopupClose}>Cancel</button>
  </div>
</div>
      <div className="popup" style={{ display: deleteConfirmationVisible ? 'flex' : 'none' }}>
  <div className="popup-content">
    <h2>Delete Task</h2>
    <p>Are you sure you want to delete this task?</p>
    <div>
      <button className="delete-button" onClick={handleDeleteConfirmation}>Delete</button>&nbsp;
      <button className="cancel-button" onClick={handleCancelDelete}>Cancel</button>
    </div>
  </div>
</div>
      &nbsp;<button onClick={() => {
        setPopupVisible(true);
        setTitle('');
        setDescription('');
        setEditingIndex(null);
      }}>Add Task</button><br />
      <ul>
      {todos.map((todo, index) => (
  <li key={index} style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ textDecoration: todo.includes("Done") ? 'line-through' : 'none' }}>{todo}</span>
    <div>
      {todo.includes("Done") ? (
        <i className="fas fa-undo-alt" onClick={() => handleToggleDone(index)} style={{ cursor: 'pointer', marginRight: '10px', color: 'green' }} title="Undo"></i>
      ) : (
        <i className="far fa-check-circle" onClick={() => handleToggleDone(index)} style={{ cursor: 'pointer', marginRight: '10px' }} title="Mark Done"></i>
      )}
      <i className="fas fa-edit" onClick={() => handleEditTodo(index)} style={{ cursor: 'pointer', marginRight: '10px' }} title="Edit"></i>
      <i className="fas fa-trash-alt" onClick={() => handleDeleteTodo(index)} style={{ cursor: 'pointer' }} title="Delete"></i>
    </div>
  </li>
))}
      </ul>
  {todos.length > 0 && ( 
    <div className="delete-all-fixed">
      <button onClick={handleDeleteAll}>Delete All</button>
      <button onClick={handleMarkAllDone}>{todos.every(todo => todo.includes("Done")) ? 'Undo' : 'Mark All as Done'}</button>

    </div>
  )}
    </div>
    </div>
  );
}


export default TodoApp;