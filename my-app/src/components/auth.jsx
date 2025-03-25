import { Outlet, redirect } from "react-router";
import { useAuth } from "../providers/auth";

export default function Auth(){
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return redirect("/login");
  }

  // If authenticated, render the child routes
  return <Outlet />;
};