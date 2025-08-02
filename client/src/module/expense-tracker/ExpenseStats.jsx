import React from "react";
import Container from "../../components/Container";
import { TrendingUp } from "lucide-react";

function ExpenseStats({ stats }) {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="card bg-gradient-to-br from-success/10 to-success/5 border border-success/20 shadow-lg">
          <div className="card-body p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base-content/70 font-medium">Income</span>
              <div className="flex items-center gap-1 text-success text-sm">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-bold text-success">
              ${stats.income.toFixed(2)}
            </div>
            <div className="text-base-content/60 text-sm mt-1">
              Total earned
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="card bg-gradient-to-br from-error/10 to-error/5 border border-error/20 shadow-lg">
          <div className="card-body p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base-content/70 font-medium">Expense</span>
              <div className="flex items-center gap-1 text-error text-sm">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-bold text-error">
              ${stats.expense.toFixed(2)}
            </div>
            <div className="text-base-content/60 text-sm mt-1">Total spent</div>
          </div>
        </div>

        {/* Balance Card */}
        <div
          className={`card bg-gradient-to-br ${
            stats.balance >= 0
              ? "from-primary/10 to-primary/5 border-primary/20"
              : "from-warning/10 to-warning/5 border-warning/20"
          } border shadow-lg`}
        >
          <div className="card-body p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base-content/70 font-medium">Balance</span>
              <div className="flex items-center gap-1 text-primary text-sm">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div
              className={`text-3xl font-bold ${
                stats.balance >= 0 ? "text-primary" : "text-warning"
              }`}
            >
              ${stats.balance.toFixed(2)}
            </div>
            <div className="text-base-content/60 text-sm mt-1">
              Current balance
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ExpenseStats;
