import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Events from "../components/events";
import Login from "../components/login";
import Logout from "../components/logout";
import Sports from "../components/sports";
import { useAuth } from "../providers/auth";
import { Home } from "./home";
import { ProtectedRoute } from "./protectedRoute";

export function Routes(){
  const { token } = useAuth();
  
  const routesForPublic = [
    { path: "/",         element: <Home />, },
    { path: "/service",  element: <div>Service Page</div>, },
    { path: "/about-us", element: <div>About Us</div>,     },
  ];
  const routesForNotAuthenticatedOnly = [
    { path: "/login", element: <Login />, },
  ];
  const routesForAuthenticatedOnly = [
    { path: "/",  element: <ProtectedRoute />,  children: [
      { path: "/profile", element: <div>User Profile</div>,   },
      { path: "/logout",  element: <Logout />,                },
      { path: "/sports",  element: <Sports />,                },
      { path: "/events",  element: <Events />,               },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ])

  return (
    <RouterProvider router={router} />
  );
};
