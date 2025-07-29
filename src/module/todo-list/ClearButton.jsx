import React from "react";
import Container from "../../components/Container";
import { Trash2 } from "lucide-react";

function ClearButton({ stats, clearCompleted }) {
  if (stats.completed === 0) {
    return null;
  }

  return (
    <Container>
      <div className="flex justify-center">
        <button
          onClick={clearCompleted}
          className="btn btn-error gap-2 hover:shadow-lg transition-all duration-300"
        >
          <Trash2 className="h-4 w-4" />
          Clear {stats.completed} Completed Task{stats.completed > 1 ? 's' : ''}
        </button>
      </div>
    </Container>
  );
}

export default ClearButton;