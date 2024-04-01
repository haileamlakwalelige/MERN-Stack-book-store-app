import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = ({roles}) => {
  console.log("roles", roles)
  return (
    <div className="top-0 sticky w-screen overflow-hidden">
      <div className="flex justify-between items-center bg-slate-800 h-[90px] py-6 text-white px-2 sm:px-6 md:px-12 lg:px-20 border-b-2 border-purple-500">
        <div>
          <img src={logo} alt="" className="h-[70px] w-[80px]" />
        </div>
        <div className="flex gap-4 justify-center items-center font-semibold">
          <Link to="/books">
            <p className="hover:border-2 border-purple-500 px-10 py-2 rounded">
              Books
            </p>
          </Link>

          {roles === "admin" ? (
            <div className="flex gap-4 justify-center items-center font-semibold">
              <Link to="/books">
                <p className="hover:border-2 border-purple-500 px-10 py-2 rounded">
                  Add Books
                </p>
              </Link>
              <Link to="/books">
                <p className="hover:border-2 border-purple-500 px-10 py-2 rounded">
                  Add Student
                </p>
              </Link>
              <Link to="/books">
                <p className="hover:border-2 border-purple-500 px-10 py-2 rounded">
                  Dashboard
                </p>
              </Link>
            </div>
          ) : null}

          {
            (roles == ""  ? (
              <Link to="/login">
                <p className="bg-white text-slate-800 px-10 py-2 rounded hover:bg-slate-800 hover:border-white hover:text-white hover:border-2">
                  Login
                </p>
              </Link>
            ) : (
              <Link to="/">
                <p className="bg-white text-slate-800 px-10 py-2 rounded hover:bg-slate-800 hover:border-white hover:text-white hover:border-2">
                  LogOut
                </p>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
