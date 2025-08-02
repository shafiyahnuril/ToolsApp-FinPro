import React from "react";
import Container from "../../components/Container";
import { DollarSign } from "lucide-react";

function HeaderExpense() {
  return (
    <main>
      <Container className="text-center mb-2 mt-12 animate-slide-down">
        <h1 className="text-4xl font-bold text-base-content mb-2 flex items-center justify-center gap-3">
          <DollarSign className="h-10 w-10 text-success" />
          Expense Tracker
        </h1>
        <p className="text-base-content/70 text-lg">
          Track your expense and keep them managed
        </p>
      </Container>
    </main>
  );
}

export default HeaderExpense;
