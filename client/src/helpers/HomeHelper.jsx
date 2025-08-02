import { Heart } from "lucide-react";
import { DollarSign } from "lucide-react";
import { CheckSquare } from "lucide-react";

export const tools = [
    {
      title: "To-Do List",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      icon: CheckSquare,
      path: "/todolist",
      color: "text-primary",
      bgColor: "bg-primary/10",
      available: true,
      features: ["Cihuyyy", "Cihuyyy", "Cihuyyy", "Cihuyyy"],
    },
    {
      title: "Expense Tracker",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      icon: DollarSign,
      path: "/expense-tracker",
      color: "text-success",
      bgColor: "bg-success/10",
      available: false,
      features: ["Cihuyy", "Cihuyy", "Cihuyy", "Cihuyy"],
    },
    {
      title: "Health Tracker",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      icon: Heart,
      path: "/health-tracker",
      color: "text-error",
      bgColor: "bg-error/10",
      available: false,
      features: ["Cihuyy", "Cihuyy", "Cihuyy", "Cihuyy"],
    },
  ];