import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import TrackingScreen from "./pages/TrackingScreen";
import "./sass/main.css";
import PostLogIn from "./pages/PostLogIn";
import NewClock from "./Components/NewClock";
import Clock2 from "./Components/Clock2";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/trakingscreen",
    element: <TrackingScreen />,
  },
  {
    path: "/postlogin",
    element: <PostLogIn />,
  },
  {
    path: "/trackingscreen",
    element: <TrackingScreen />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
