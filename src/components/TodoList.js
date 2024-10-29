import React, { useState, useEffect } from 'react';
import "./TodoList.css";
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/tasks");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <h1 className="heading">Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem 
              todo={todo} 
              updateTodo={updateTodo} 
              deleteTodo={deleteTodo} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
