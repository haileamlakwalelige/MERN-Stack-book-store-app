import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie"; // Import useCookies hook

const Logout = ({ setRoles }) => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["token"]); // Use useCookies hook to access removeCookie function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/logout");
        if (res.data.logout) {
          setRoles("");
          navigate("/");
          removeCookie("token"); // Remove the token cookie upon logout
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [navigate, setRoles, removeCookie]); // Add removeCookie to dependency array

  return null; // Since this is a logout component, it doesn't need to render anything
};

export default Logout;
