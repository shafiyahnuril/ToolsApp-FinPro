import { ArrowRight } from "lucide-react";
import React from "react";
import Container from "../../components/Container";

function TransactionForm({
  type,
  setType,
  amount,
  setAmount,
  description,
  setDescription,
  handleSubmit,
}) {
  return (
    <Container>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-6">
          <h2 className="card-title mb-4 flex items-center gap-2">
            Add Transaction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Fields */}
            <div className="flex flex-col justify-evenly items-start md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    checked={type === "income"}
                    onChange={(e) => setType(e.target.value)}
                    className="radio radio-success radio-sm"
                  />
                  <span className="text-base-content">Income</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    checked={type === "expense"}
                    onChange={(e) => setType(e.target.value)}
                    className="radio radio-error radio-sm"
                  />
                  <span className="text-base-content">Expense</span>
                </label>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="form-control flex gap-4">
                  <label className="label">
                    <span className="label-text">Amount</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="input input-bordered w-full md:w-16 focus:input-primary"
                    />
                  </div>
                </div>

                <div className="form-control flex gap-4">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="text"
                    placeholder="What is it about"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input input-bordered focus:input-primary md:w-48"
                  />
                </div>
              </div>

              <div className="form-control self-end">
                <label className="label opacity-0">
                  <span className="label-text">Submit</span>
                </label>
                <button
                  type="submit"
                  className={`btn gap-2 ${
                    type === "income" ? "btn-success" : "btn-error"
                  }`}
                  disabled={!amount.trim() || !description.trim()}
                >
                  Add {type}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default TransactionForm;
