import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useTodos() {
  // Logic ambil data dari localStorage
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        return JSON.parse(savedTodos).map((todo) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
    }
    // Default data jika tidak ada di localStorage
    return [
      {
        id: "1",
        text: "Belajar Java",
        completed: false,
        createdAt: new Date("2025-01-10T08:56:00"),
      },
    ];
  });

  //   logic simpan data ke localstorage setiap kali todos mutasi
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //   Mutation or Manipulation Todos
  const addTodo = (text) => {
    if (text.trim()) {
      const todo = {
        id: uuidv4(),
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([todo, ...todos]);
    }
  };

  // filter yang dimana jika todo.id sama dengan id maka dihapus
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // intinya cm ngubah completed aja
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return { todos, setTodos, addTodo, toggleTodo, deleteTodo, clearCompleted };
}