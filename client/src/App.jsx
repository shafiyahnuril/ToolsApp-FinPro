import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import TodoListPage from "./pages/todo-list/TodoList";
import ExpenseTrackerPage from "./pages/expense-tracker/ExpenseTrackerPage";
import HealthTrackerPage from "./pages/health-tracker/HealthTrackerPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AppContext } from "./context/AppContext";

function App() {
  const { isLoading } = useContext(AppContext);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="todolist" element={<TodoListPage />} />
        <Route path="expense-tracker" element={<ExpenseTrackerPage />} />
        <Route path="health-tracker" element={<HealthTrackerPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Legacy routes for backward compatibility */}
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;