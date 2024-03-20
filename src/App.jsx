import React, { useState } from 'react';
import './App.css';
import pic from './image.png';


function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [description, setDescription] = useState('');
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [deleteAllConfirmationVisible, setDeleteAllConfirmationVisible] = useState(false);

  const handleDeleteAll = () => {
    setDeleteAllConfirmationVisible(true);
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const handleCancelDeleteAll = () => {
    setDeleteAllConfirmationVisible(false);
  };

  const handleConfirmDeleteAll = () => {
    setTodos([]);
    setDeleteAllConfirmationVisible(false);
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
      setShowErrorPopup(true);
    }
  };

  const handleMarkAllDone = () => {
    const allDone = todos.every(todo => todo.includes("Done"));
  
  const updatedTodos = todos.map(todo => {
    if (allDone) {
      return todo.replace(" - Done", ""); 
      } else {
      return todo + " - Done";
      }
  });
  setTodos(updatedTodos);
  };
  
  return (
    <div className='color'>
    <div className="container">  
    <img src={pic} alt="Image" style={{ width: '18%', height: 'auto', maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: '7%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} /><br />
      <h1>To-Do List</h1>
      <p>Got things to do? List it <a href="https://bit.ly/A3-4Guide">Here</a></p>
      <div className="popup" style={{ display: popupVisible ? 'flex' : 'none' }}>
  <div className="popup-content">
    <h2>{editingIndex !== null ? 'Edit Task' : 'Add Task'}</h2>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ backgroundColor: '#f5f5f5' }} />
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ backgroundColor: '#f5f5f5' }} ></textarea>
    <button className="go-button"onClick={handlePopupSubmit}>{editingIndex !== null ? 'Save' : 'Add'}</button>&nbsp;
    <button className="cancel-button" onClick={handlePopupClose}>Cancel</button>
  </div>
</div>
<div className="popup" style={{ display: showErrorPopup ? 'flex' : 'none' }}>
  <div className="popup-content">
    <h2>Error</h2>
    <p>Please enter title and description</p>
    <div>
      <button className="go-button" onClick={handleCloseErrorPopup}>OK</button>
    </div>
  </div>
</div>
<div className="popup" style={{ display: deleteAllConfirmationVisible ? 'flex' : 'none' }}>
  <div className="popup-content">
    <h2>Delete All Tasks</h2>
    <p>Are you sure you want to delete all tasks?</p>
    <div>
      <button className="delete-button" onClick={handleConfirmDeleteAll}>Delete All</button>&nbsp;
      <button className="cancel-button" onClick={handleCancelDeleteAll}>Cancel</button>
    </div>
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
<button
  onClick={() => {
    setPopupVisible(true);
    setTitle('');
    setDescription('');
    setEditingIndex(null);
  }}
  style={{ backgroundImage: 'linear-gradient(to right, #5E1B89, #F4512C)', color: 'white', border: 'none', }}> Add Task </button>

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
      <button onClick={handleDeleteAll} className="delete-all-button">Delete All</button>&nbsp;
      <button onClick={handleMarkAllDone} className="mark-all-button">{todos.every(todo => todo.includes("Done")) ? 'Undo' : 'Mark All as Done'}</button>
    </div>
  )}
    </div>
    </div>
  );
}

export default TodoApp;