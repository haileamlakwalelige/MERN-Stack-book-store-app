import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import Books from "./pages/Books";
import { useState } from "react";
import Logout from "./pages/Logout";

export default function App() {
  const [roles, setRoles] = useState("");
  return (
    <div className="bg-slate-700 min-h-screen font-serif overflow-hidden">
      <BrowserRouter>
        <Navbar roles={roles} />
        <Routes>
          <Route path="/" element={<Home setRoles={setRoles}/>}  />
          <Route path="login" element={<Login setRoles={setRoles} />} />
          <Route path="books" element={<Books />} />

          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-books" element={<AddBook />} />

          <Route path="/logout" element={<Logout setRoles={setRoles} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

