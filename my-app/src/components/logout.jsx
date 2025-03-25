import axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    if(!ignore){
      axios.delete('http://localhost:3000/logout')
      setToken();
      navigate("/", { replace: true });
    }
    return () => ignore = true;
  }, [])

  return <>Logout Page</>;
};

export default Logout;
