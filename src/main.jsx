import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import RecipesForm from "./pages/AddRecipes/RecipesForm.jsx";
import SignUpForm from "./pages/SignUp/SignUpForm.jsx";
import SignInForm from "./pages/SignIn/SignInForm.jsx";
import {AuthContextProvider} from "./Context/AuthContext.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/about", element: <About/>},
            {path: "/contact", element: <Contact/>},
            {path: "/recipes/create", element: <RecipesForm/>},
            {path: "/recipes/edit/:id", element: <RecipesForm/>},
            {path: "/sign-in", element: < SignInForm/>},
            {path: "/sign-up", element: < SignUpForm/>},
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    </StrictMode>
);
