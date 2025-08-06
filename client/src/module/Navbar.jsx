import { CheckSquare } from "lucide-react";
import { DollarSign } from "lucide-react";
import { Menu } from "lucide-react";
import { Heart } from "lucide-react";
import { Home } from "lucide-react";
import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import React, { useContext } from "react";

function Navbar() {
  const location = useLocation();
  const { isLoggedIn, userData, logout, isLoading } = useContext(AppContext);

  const navbarItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/todolist", label: "Todo List", icon: CheckSquare },
    { path: "/expense-tracker", label: "Expense Tracker", icon: DollarSign },
    { path: "/health-tracker", label: "Health Tracker", icon: Heart },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navbarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 ${
                      location.pathname === item.path
                        ? "active bg-primary text-primary-content"
                        : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-lg sm:text-xl font-bold">
          <CheckSquare className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Tools App</span>
          <span className="sm:hidden">Tools</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navbarItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="navbar-end">
        {isLoading ? (
          <div className="loading loading-spinner loading-sm"></div>
        ) : isLoggedIn && userData ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-sm font-bold flex items-center justify-center h-full w-full leading-none">
                  {userData.email ? userData.email.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>Signed in as</span>
              </li>
              <li>
                <span className="text-sm font-medium">{userData.email}</span>
              </li>
               <li>
                <Link 
                  to="/email-verify"
                  className="flex items-center gap-2 text-info hover:bg-info/10"
                >
                  Verify Email
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-error hover:bg-error/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link 
              to="/Login" 
              className="btn btn-ghost btn-sm"
            >
              <span className="hidden sm:inline">Login</span>
              <span className="sm:hidden">Login</span>
            </Link>
            <Link 
              to="/Register" 
              className="btn btn-primary btn-sm"
            >
              <span className="hidden sm:inline">Register</span>
              <span className="sm:hidden">Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;