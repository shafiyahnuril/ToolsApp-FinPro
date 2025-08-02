import React from "react";
import ExpenseItem from "./ExpenseItem";
import Container from "../../components/Container";
import { FilterIcon } from "lucide-react";

function TransactionHistory({
  filteredExpenses,
  filter,
  setFilter,
  deleteExpense,
}) {
  return (
    <Container>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="card-title">Transaction History</h2>

            {/* Filter Buttons */}
            <div className="btn-group flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`btn btn-sm ${
                  filter === "all" ? "btn-primary btn-active" : "btn-outline"
                }`}
              >
                <FilterIcon className="h-4 w-4 mr-2" />
                All ({filteredExpenses.length})
              </button>
              <button
                onClick={() => setFilter("income")}
                className={`btn btn-sm ${
                  filter === "income" ? "btn-success btn-active" : "btn-outline"
                }`}
              >
                Income (
                {filteredExpenses.filter((e) => e.type === "income").length})
              </button>
              <button
                onClick={() => setFilter("expense")}
                className={`btn btn-sm ${
                  filter === "expense" ? "btn-error btn-active" : "btn-outline"
                }`}
              >
                Expense (
                {filteredExpenses.filter((e) => e.type === "expense").length})
              </button>
            </div>
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-base-content/50 text-lg">
                  <p>No {filter === "all" ? "transactions" : filter} found</p>
                  <p className="text-sm mt-2">
                    Start by adding your first transaction above
                  </p>
                </div>
              </div>
            ) : (
              filteredExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDelete={deleteExpense}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default TransactionHistory;
