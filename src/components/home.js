import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import SearchBar from "./SearchBar";
import axios from "axios";  
import "../components/home.css";

const HomePage = ({ user }) => { 
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const userId = user ? user.id : null;

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8000/users/${userId}/tasks`);
          setTodos(response.data);
        } catch (error) {
          console.error("Error fetching tasks", error);
        }
      }
    };

    fetchTasks();
  }, [userId]);

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-display">
      <h2 className="home-heading">To-Do Items</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {userId && <AddTodo addTodo={addTodo} userId={userId} />}
      <div>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
