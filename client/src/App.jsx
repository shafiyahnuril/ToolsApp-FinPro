import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import TodoListPage from "./pages/todo-list/TodoList";
import ExpenseTrackerPage from "./pages/expense-tracker/ExpenseTrackerPage";
import HealthTrackerPage from "./pages/health-tracker/HealthTrackerPage";
import Login from "./pages//Login";
import Register from "./pages/Register";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="todolist" element={<TodoListPage />} />
          <Route path="expense-tracker" element={<ExpenseTrackerPage />} />
          <Route path="health-tracker" element={<HealthTrackerPage />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>
      </Routes>
  );
}

export default App;
