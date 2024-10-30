import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { BrowserRouter as Router } from "react-router-dom";

import SignUpPage, { action as signUpAction } from "./Pages/Sign_Up";
import LoginPage, { action as loginAction } from "./Pages/Login_Page";
import Layout from "./Pages/Layout";
import HomePage, {loader as studentLoader} from "./Pages/Home_page";
import { LogoutAction } from "./Pages/Logout_Page";
import AuthProvider from "./Store/AuthProvider";

function App() {
  const router = createBrowserRouter([
    {path: "/", element: <Layout />, id: "root", children: 
      [
        {index: true, element: <HomePage/>, loader: studentLoader},
        {path: "signup", element: <SignUpPage />, action: signUpAction },
        {path: "login", element: <LoginPage />, action: loginAction },
        {path:'logout', action: LogoutAction},
      ],
    },
  ]);

  return (
    
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
