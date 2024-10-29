import React, { useState } from 'react';
import './TodoItem.css';
import axios from "axios";

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/tasks/${todo.id}`, {
        description,
        priority
      });
      updateTodo(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${todo.id}`);
      deleteTodo(todo.id);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className={`todo-item ${priority.toLowerCase()}`} onClick={() => setIsExpanded(!isExpanded)}>
      {isEditing ? (
        <div>
          <textarea
            className="set-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <div className="todo-tasks">
            <span className="set-description">{description}</span>
            <span>{priority}</span>
          </div>
          {isExpanded && (
            <div className="todo-details">
              <p>{description}</p>
              <div className="btn-container">
                <button className="edit-btn" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Edit</button>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>Delete</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoItem;