import React, { useState, useMemo } from "react";
import { DollarSign, TrendingUp, ArrowRight, Plus } from "lucide-react";
import ExpenseItem from "./ExpenseItem";
import { useExpenses } from "../../hooks/useExpenses";
import Container from "../../components/Container";
import HeaderExpense from "./HeaderExpense";
import ExpenseStats from "./ExpenseStats";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";

const ExpenseTracker = () => {
  const { expenses, addExpense, deleteExpense } = useExpenses();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income");
  const [filter, setFilter] = useState("all");

  const stats = useMemo(() => {
    const income = expenses
      .filter((expense) => expense.type === "income")
      .reduce((sum, expense) => sum + expense.amount, 0);

    const expense = expenses
      .filter((expense) => expense.type === "expense")
      .reduce((sum, expense) => sum + expense.amount, 0);

    const balance = income - expense;

    return { income, expense, balance };
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    switch (filter) {
      case "income":
        return expenses.filter((expense) => expense.type === "income");
      case "expense":
        return expenses.filter((expense) => expense.type === "expense");
      default:
        return expenses;
    }
  }, [expenses, filter]);

  const handleAddExpense = () => {
    addExpense(amount, description, type);
    setAmount("");
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddExpense();
  };

  return (
    <>
      {/* Header */}
      <HeaderExpense />
      {/* Stats Cards */}
      <ExpenseStats stats={stats} />
      {/* Add Transaction Form */}
      <TransactionForm
        handleSubmit={handleSubmit}
        setType={setType}
        setAmount={setAmount}
        setDescription={setDescription}
        type={type}
        amount={amount}
        description={description}
      />

      {/* Transaction History */}
      <TransactionHistory
        setFilter={setFilter}
        filteredExpenses={filteredExpenses}
        filter={filter}
        deleteExpense={deleteExpense}
      />
    </>
  );
};

export default ExpenseTracker;
