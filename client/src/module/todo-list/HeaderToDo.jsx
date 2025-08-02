import { SquareCheck } from "lucide-react";
import React from "react";
import Container from "../../components/Container";

function HeaderToDo() {
  return (
    <Container>
      <div className="text-center mt-12 mb-8 animate-slide-down">
        <h1 className="text-4xl font-bold text-base-content mb-2 flex items-center justify-center gap-3">
          <SquareCheck strokeWidth={2} color="#605dff" className="h-10 w-10 text-primary" />
          To-Do List
        </h1>
        <p className="text-base-content/70 text-lg">
          Organize your tasks and boost productivity
        </p>
      </div>
    </Container>
  );
}

export default HeaderToDo;