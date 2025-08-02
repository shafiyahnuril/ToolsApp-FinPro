import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export function useExpenses() {
  // Logic ambil data dari localStorage
  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem("expenses");
      if (savedExpenses) {
        return JSON.parse(savedExpenses).map((expense) => ({
          ...expense,
          createdAt: new Date(expense.createdAt),
        }));
      }
    } catch (error) {
      console.error("Error parsing expenses from localStorage:", error);
    }
    // Default data jika tidak ada di localStorage
    return [];
  });

  // Logic simpan data ke localStorage setiap kali expenses berubah
  useEffect(() => {
    if (expenses) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  // Fungsi untuk menambah expense/income
  const addExpense = (amount, description, type) => {
    if (amount && description.trim()) {
      const newExpense = {
        id: uuidv4(),
        amount: parseFloat(amount),
        description: description.trim(),
        type,
        createdAt: new Date(),
      };
      setExpenses([newExpense, ...expenses]);
    }
  };

  // Fungsi untuk menghapus expense/income
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return { expenses, setExpenses, addExpense, deleteExpense };
}
