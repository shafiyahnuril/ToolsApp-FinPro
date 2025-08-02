import React from "react";
import Container from "../../components/Container";
import { Plus } from "lucide-react";

function AddTodo({ newTodo, setNewTodo, addTodo, handleKeyPress }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <Container>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="form-control flex-1">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input input-bordered focus:input-primary w-full"
              />
            </div>
            <div className="form-control">
              <button 
                type="submit"
                disabled={!newTodo.trim()}
                className="btn btn-primary hover:shadow-lg transition-all duration-300 gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default AddTodo;