import React, { useState } from "react";
import "./AddTodo.css";
import axios from "axios";
import Swal from "sweetalert2";

const AddTodo = ({ addTodo }) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [errors, setErrors] = useState({});

  const userId = 1; 

  const validateForm = () => {
    const errors = {};
    if (!description.trim()) {
      errors.description = "Task description is required.";
    } else if (description.trim().length < 5) {
      errors.description =
        "Task description must be at least 5 characters long.";
    } else if (description.trim().length > 100) {
      errors.description = "Task description cannot exceed 100 characters.";
    }

    if (!["Low", "Medium", "High"].includes(priority)) {
      errors.priority = "Invalid priority selected.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Input",
        text: "Please fix the errors in the form and try again.",
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/users/${userId}/tasks`, 
        {
          description: description.trim(),
          priority,
        }
      );

      addTodo(response.data); 
      setDescription("");
      setPriority("Low");
      setErrors({});

      Swal.fire({
        icon: "success",
        title: "Task Added Successfully!",
        text: `Your task with priority "${priority}" has been added.`,
      });
    } catch (error) {
      console.error("Error creating task", error);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Task",
        text: "There was an issue adding your task. Please try again later.",
      });
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
