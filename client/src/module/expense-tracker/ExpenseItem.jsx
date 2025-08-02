import { DollarSign, Trash2, Calendar } from "lucide-react";
import React from "react";

function ExpenseItem({ expense, onDelete }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200 border border-base-300/30">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Type Indicator */}
            <div
              className={`w-1 h-12 rounded-full ${
                expense.type === "income" ? "bg-success" : "bg-error"
              }`}
            ></div>

            {/* Content */}
            <div className="flex-1">
              {/* Type & Amount */}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    expense.type === "income"
                      ? "bg-success/10 text-success"
                      : "bg-error/10 text-error"
                  }`}
                >
                  {expense.type === "income" ? "Income" : "Expense"}
                </span>
                <div
                  className={`text-xl font-bold ${
                    expense.type === "income" ? "text-success" : "text-error"
                  }`}
                >
                  {expense.type === "income" ? "+" : "-"}$
                  {expense.amount.toFixed(2)}
                </div>
              </div>

              {/* Description */}
              <div className="text-base-content font-medium mb-1">
                {expense.description}
              </div>

              {/* Date */}
              <div className="flex items-center gap-1 text-base-content/60 text-sm">
                <Calendar className="h-3 w-3" />
                <span>
                  {expense.createdAt.toLocaleDateString()} at{" "}
                  {expense.createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-base-content/40" />
            <button
              onClick={() => onDelete(expense.id)}
              className="btn btn-sm btn-circle btn-ghost hover:btn-error transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
