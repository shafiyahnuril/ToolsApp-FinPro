import React from "react";
import Container from "../../components/Container";
import { FilterIcon } from "lucide-react";

function Filter({ filter, setFilter, stats }) {
  return (
    <Container>
      <div className="flex justify-center mt-4 mb-6">
        <div className="btn-group flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`btn btn-sm ${filter === "all" ? "btn-primary btn-active" : "btn-outline"}`}
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`btn btn-sm ${filter === "active" ? "btn-warning btn-active" : "btn-outline"}`}
          >
            Active ({stats.active})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`btn btn-sm ${filter === "completed" ? "btn-success btn-active" : "btn-outline"}`}
          >
            Completed ({stats.completed})
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Filter;