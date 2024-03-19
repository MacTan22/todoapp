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
    setPopupVisible(true); // Set popupVisible to true to show the edit popup
  };
  
  const handleDeleteConfirmation = () => {
    const newTodos = [...todos];
    newTodos.splice(editingIndex, 1);
    setTodos(newTodos);
    setDeleteConfirmationVisible(false);
  };
  
  // Add a new function to cancel delete action
  const handleCancelDelete = () => {
    setDeleteConfirmationVisible(false);
  };

  const handleDeleteTodo = (index) => {
    setDeleteConfirmationVisible(true);
    setEditingIndex(index); // Set the editing index to the index of the item to be deleted
  };


  const handlePopupClose = () => {
    setPopupVisible(false);
    setTitle('');
    setDescription('');
    setInputValue('');
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

  return (
    <div className="container">
      <h1>To-Do List App</h1>
      <h6>By: Mac Adrian Po Tan</h6>
      <div className="popup" style={{ display: popupVisible ? 'flex' : 'none' }}>
        <div className="popup-content">
          <span className="close" onClick={handlePopupClose} style={{color: 'black', fontSize: '50px'}}>&times; &nbsp;</span>
          <h2>{editingIndex !== null ? 'Edit Task' : 'Add Task'}</h2>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
          <button onClick={handlePopupSubmit}>{editingIndex !== null ? 'Save' : 'Add'}</button>
        </div>
      </div>
      <div className="popup" style={{ display: deleteConfirmationVisible ? 'flex' : 'none' }}>
  <div className="popup-content">
    <span className="close" onClick={handleCancelDelete} style={{ color: 'white', fontSize: '50px' }}>&times; &nbsp;</span>
    <h2>Delete Task</h2>
    <p>Are you sure you want to delete this task?</p>
    <div>
      <button className="delete-button" onClick={handleDeleteConfirmation}>Delete</button>
      <button onClick={handleCancelDelete}>Cancel</button>
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
            <span>{todo}</span>
            <div>
              <i className="fas fa-edit" onClick={() => handleEditTodo(index)} style={{ cursor: 'pointer', marginRight: '10px' }}></i>
              <i className="fas fa-trash-alt" onClick={() => handleDeleteTodo(index)} style={{ cursor: 'pointer' }}></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;