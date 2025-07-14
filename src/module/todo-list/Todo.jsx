import { useMemo } from "react";
import { useState } from "react";
import Stats from "./Stats";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
// import TodoList from "./TodoList";
// import ClearButton from "./ClearButton";
import { useTodos } from "../../hooks/useTodos";

function Todo() {
  const { todos, setTodos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddTodo = () => {
    addTodo(newTodo);
    setNewTodo("");
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Add your Todo components here */}
      <Stats active={0} completed={0} total={0} />
      <AddTodo newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={handleAddTodo}
        handleKeyPress={handleKeyPress} />
      <Filter filter={filter} setFilter={setFilter} />
    </div>
  );
} 

export default Todo;