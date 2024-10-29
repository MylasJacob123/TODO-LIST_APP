import React, { useState } from "react";
import "./AddTodo.css";
import axios from "axios";

const AddTodo = ({ addTodo, userId }) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleAdd = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/users/${userId}/tasks`, { 
        description,
        priority,
      });

      console.log("Added Task:", response.data); 
      addTodo(response.data);
      setDescription("");
      setPriority("Low");
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <div className="add-todo-container">
      <textarea
        className="add-todo-input"
        placeholder="Task Description"
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
      <button className="add-btn" onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default AddTodo;
