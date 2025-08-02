import { useMemo } from "react";
import Stats from "./Stats";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
import TodoList from "./TodoList";
import ClearButton from "./ClearButton";
import { useTodos } from "../../hooks/useTodos";
import { AppContext } from "../../context/AppContext";
import React, {useEffect, useState, useContext} from "react";

function Todo() {
  const { backendUrl, isLoggedIn } = useContext(AppContext);
  const [todos, setTodos] = useState([]);
  const { addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${backendUrl}/api/todos`, { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setTodos(data));
    } else {
      setTodos([]);
    }
  }, [isLoggedIn, backendUrl]);

  const addTodoLocal = async (text) => {
  try {
    const res = await fetch(`${backendUrl}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    console.log("Response add todo:", data); // <-- cek response
    if (res.ok) {
      setTodos((prev) => [...prev, data]);
      setNewTodo("");
    } else {
      alert(data.message || "Failed to add todo");
    }
  } catch (err) {
    alert("Network error");
    console.error(err);
  }
};

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <>
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
        addTodo={addTodoLocal}
        handleKeyPress={handleKeyPress}
      />
      {/* Filter */}
      <Filter stats={stats} filter={filter} setFilter={setFilter} />
      {/* Todo List */}
      <TodoList
        filteredTodos={filteredTodos}
        filter={filter}
        todos={todos}
        stats={stats}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
      {/* Clear Completed Button */}
      <ClearButton stats={stats} clearCompleted={clearCompleted} />
    </>
  );
}

export default Todo;