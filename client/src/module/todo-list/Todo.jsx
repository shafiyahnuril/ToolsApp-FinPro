import { useMemo } from "react";
import Stats from "./Stats";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
import TodoList from "./TodoList";
import ClearButton from "./ClearButton";
import { useTodos } from "../../hooks/useTodos";
import { AppContext } from "../../context/AppContext";
import React, { useEffect, useState, useContext } from "react";

function Todo() {
  const { backendUrl, isLoggedIn } = useContext(AppContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fallback hooks untuk localStorage jika tidak login
  const { 
    todos: localTodos, 
    addTodo: addLocalTodo, 
    toggleTodo: toggleLocalTodo, 
    deleteTodo: deleteLocalTodo, 
    clearCompleted: clearLocalCompleted 
  } = useTodos();

  // Fetch todos dari backend jika user sudah login
  useEffect(() => {
    if (isLoggedIn) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [isLoggedIn, backendUrl]);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${backendUrl}/api/todos`, { 
        credentials: "include" 
      });
      const data = await res.json();
      
      if (res.ok) {
        setTodos(data || []);
      } else {
        setError(data.message || "Failed to fetch todos");
      }
    } catch (err) {
      console.error("Fetch todos error:", err);
      setError("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Add todo - backend atau localStorage
  const addTodoHandler = async (text) => {
    if (!text.trim()) return;

    if (isLoggedIn) {
      try {
        setIsLoading(true);
        const res = await fetch(`${backendUrl}/api/todos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ text: text.trim() }),
        });
        
        const data = await res.json();
        
        if (res.ok) {
          setTodos((prev) => [data, ...prev]);
          setNewTodo("");
          setError("");
        } else {
          setError(data.message || "Failed to add todo");
        }
      } catch (err) {
        console.error("Add todo error:", err);
        setError("Network error occurred");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Fallback ke localStorage
      addLocalTodo(text);
      setNewTodo("");
    }
  };

  // Toggle todo - backend atau localStorage
  const toggleTodoHandler = async (id) => {
    if (isLoggedIn) {
      try {
        const res = await fetch(`${backendUrl}/api/todos/${id}`, {
          method: "PUT",
          credentials: "include",
        });
        
        const data = await res.json();
        
        if (res.ok) {
          setTodos((prev) =>
            prev.map((todo) =>
              todo._id === id ? { ...todo, completed: !todo.completed } : todo
            )
          );
        } else {
          setError(data.message || "Failed to update todo");
        }
      } catch (err) {
        console.error("Toggle todo error:", err);
        setError("Network error occurred");
      }
    } else {
      toggleLocalTodo(id);
    }
  };

  // Delete todo - backend atau localStorage
  const deleteTodoHandler = async (id) => {
    if (isLoggedIn) {
      try {
        const res = await fetch(`${backendUrl}/api/todos/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        
        if (res.ok) {
          setTodos((prev) => prev.filter((todo) => todo._id !== id));
        } else {
          const data = await res.json();
          setError(data.message || "Failed to delete todo");
        }
      } catch (err) {
        console.error("Delete todo error:", err);
        setError("Network error occurred");
      }
    } else {
      deleteLocalTodo(id);
    }
  };

  // Clear completed todos
  const clearCompletedHandler = async () => {
    if (isLoggedIn) {
      try {
        const completedIds = todos.filter(todo => todo.completed).map(todo => todo._id);
        
        // Delete each completed todo
        await Promise.all(
          completedIds.map(id =>
            fetch(`${backendUrl}/api/todos/${id}`, {
              method: "DELETE",
              credentials: "include",
            })
          )
        );
        
        setTodos(prev => prev.filter(todo => !todo.completed));
      } catch (err) {
        console.error("Clear completed error:", err);
        setError("Failed to clear completed todos");
      }
    } else {
      clearLocalCompleted();
    }
  };

  // Pilih data source berdasarkan login status
  const currentTodos = isLoggedIn ? todos : localTodos;

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return currentTodos.filter((todo) => !todo.completed);
      case "completed":
        return currentTodos.filter((todo) => todo.completed);
      default:
        return currentTodos;
    }
  }, [currentTodos, filter]);

  const stats = useMemo(() => {
    const total = currentTodos.length;
    const completed = currentTodos.filter((todo) => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [currentTodos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodoHandler(newTodo);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  if (isLoading && isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <>
      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
          <button 
            className="btn btn-sm btn-circle btn-ghost" 
            onClick={() => setError("")}
          >
            ✕
          </button>
        </div>
      )}

      {/* Login Status */}
      {!isLoggedIn && (
        <div className="alert alert-info mb-4">
          <span>You're using offline mode. Your todos are saved locally. Login to sync across devices.</span>
        </div>
      )}

      {/* Stats */}
      <Stats
        active={stats.active}
        completed={stats.completed}
        total={stats.total}
      />
      
      {/* Add Todo */}
      <AddTodo
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={handleAddTodo}
        handleKeyPress={handleKeyPress}
      />
      
      {/* Filter */}
      <Filter stats={stats} filter={filter} setFilter={setFilter} />
      
      {/* Todo List */}
      <TodoList
        filteredTodos={filteredTodos}
        filter={filter}
        todos={currentTodos}
        stats={stats}
        toggleTodo={toggleTodoHandler}
        deleteTodo={deleteTodoHandler}
      />
      
      {/* Clear Completed Button */}
      <ClearButton stats={stats} clearCompleted={clearCompletedHandler} />
    </>
  );
}

export default Todo;