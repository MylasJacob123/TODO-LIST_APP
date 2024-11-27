import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import SearchBar from "./SearchBar";
import axios from "axios";
import "../components/home.css";
import Loader from "./Loader";
import Swal from "sweetalert2";

const HomePage = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const userId = user ? user.id : null;

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
    Swal.fire({
      icon: "success",
      title: "Task Added Successfully!",
      text: "Your new task has been added.",
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
        setIsLoading(true); 
        try {
          const response = await axios.get(`http://localhost:8000/tasks`);
          setTodos(response.data);
        } catch (error) {
          console.error("Error fetching tasks", error);
          Swal.fire({
            icon: "error",
            title: "Failed to Fetch Tasks",
            text: "Unable to load tasks. Please try again later.",
          });
        } finally {
          setIsLoading(false); 
        }
    };

    fetchTasks();
  }, [userId]);

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    Swal.fire({
      icon: "success",
      title: "Task Updated Successfully!",
      text: "The task has been updated.",
    });
  };

  const deleteTodo = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this task? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/tasks/${id}`);
        setTodos(todos.filter((todo) => todo.id !== id));
        Swal.fire({
          icon: "success",
          title: "Task Deleted",
          text: "The task has been removed.",
        });
      } catch (error) {
        console.error("Error deleting task", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete the task. Please try again.",
        });
      }
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-display">
      <h2 className="home-heading">To-Do Items</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddTodo addTodo={addTodo} />
      {isLoading ? (
        <Loader />
      ) : filteredTodos.length > 0 ? (
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
      ) : (
        <p className="no-tasks">No tasks found.</p>
      )}
    </div>
  );
};

export default HomePage;
