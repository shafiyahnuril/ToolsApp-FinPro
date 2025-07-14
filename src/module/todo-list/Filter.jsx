import React from "react";
import Container from "../../components/Container";
import { FilterIcon } from "lucide-react";

function Filter({ filter, setFilter }) {
  return (
    <Container>
      <div className="flex justify-center mt-4 mb-6">
        <div className="btn-group flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`btn btn-sm ${filter === "all" ? "btn-primary btn-active" : "btn-outline"}`}
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`btn btn-sm ${filter === "active" ? "btn-success btn-active" : "btn-outline"}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`btn btn-sm ${filter === "completed" ? "btn-error btn-active" : "btn-outline"}`}
          >
            Completed
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Filter;