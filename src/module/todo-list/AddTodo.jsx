import React from "react";
import Container from "../../components/Container";

function AddTodo() {
  return (
    <Container>
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title mb-4">Add New Todo</h2>
                <div className="flex gap-4 w-full">
                <div className="form-control flex-1">
                    <input
                        type="text"
                        placeholder="Enter your task"
                        className="input input-bordered focus:input-primary w-full"
                    />
                </div>
                <div className="form-control">
                    <button 
                        type="submit"
                        className="btn btn-primary hover:shadow-lg transition-all duration-300">
                        + Add Task
                        
                    </button>
                </div>
                </div>
            </div>
        </div>
    </Container>
  );
}

export default AddTodo;