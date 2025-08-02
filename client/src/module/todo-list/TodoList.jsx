// filepath: [TodoList.jsx](http://_vscodecontentref_/1)
import React from "react";
import Container from "../../components/Container";
import { Trash2, Calendar, CheckCircle2, Circle } from "lucide-react";

// Komponen TodoItem
function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className={`card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200 border ${
      todo.completed ? 'border-success/30 bg-success/5' : 'border-base-300/30'
    }`}>
      <div className="card-body p-4">
        <div className="flex items-center justify-between gap-3">
          {/* Checkbox and Content */}
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => toggleTodo(todo._id)}
              className={`btn btn-sm btn-circle ${
                todo.completed 
                  ? 'btn-success hover:btn-success' 
                  : 'btn-ghost hover:btn-primary'
              } transition-all duration-200`}
            >
              {todo.completed ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1">
              <p className={`text-base font-medium transition-all duration-200 ${
                todo.completed 
                  ? 'line-through text-base-content/50' 
                  : 'text-base-content'
              }`}>
                {/* Tampilkan kalimat yang diinput user */}
                {todo.text || "No Title"}
              </p>
              
              <div className="flex items-center gap-1 text-base-content/60 text-sm mt-1">
                <Calendar className="h-3 w-3" />
                <span>
                  Created {todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : ""}
                  {" "}at{" "}
                  {todo.createdAt ? new Date(todo.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => deleteTodo(todo._id)}
            className="btn btn-sm btn-circle btn-ghost hover:btn-error transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Komponen TodoList
function TodoList({ filteredTodos, filter, todos, stats, toggleTodo, deleteTodo }) {
  const getEmptyMessage = () => {
    switch (filter) {
      case "active":
        return "No active tasks! You're all caught up 🎉";
      case "completed":
        return "No completed tasks yet. Get started!";
      default:
        return "No tasks yet. Add your first task above!";
    }
  };

  return (
    <Container>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="card-title">
              {filter === "all" ? "All Tasks" : 
               filter === "active" ? "Active Tasks" : "Completed Tasks"}
              <span className="badge badge-primary badge-sm ml-2">
                {filteredTodos.length}
              </span>
            </h2>
            
            {stats.total > 0 && (
              <div className="text-sm text-base-content/60">
                {stats.completed} of {stats.total} completed
              </div>
            )}
          </div>

          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-base-content/50 text-lg">
                  <p>{getEmptyMessage()}</p>
                </div>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default TodoList;