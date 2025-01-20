import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home/Home.jsx";
import About from "../pages/About/About.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import RecipesForm from "../pages/AddRecipes/RecipesForm.jsx";
import SignInForm from "../pages/SignIn/SignInForm.jsx";
import SignUpForm from "../pages/SignUp/SignUpForm.jsx";
import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext.jsx";

const Routes = () => {
    const {user} = useContext(AuthContext)

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
            children: [
                {path: "/", element: user ? <Home/> : <Navigate to={"/sign-in"}/>},
                {path: "/about", element: user ? <About/> : <Navigate to={"/sign-in"}/>},
                {path: "/contact", element: user ? <Contact/> : <Navigate to={"/sign-in"}/>},
                {path: "/recipes/create", element: user ? <RecipesForm/> : <Navigate to={"/sign-in"}/>},
                {path: "/recipes/edit/:id", element: user ? <RecipesForm/> : <Navigate to={"/sign-in"}/>},
                {path: "/sign-in", element: !user ? <SignInForm/> : <Navigate to={"/"}/>},
                {path: "/sign-up", element: !user ? <SignUpForm/> : <Navigate to={"/"}/>},
            ],
        },
    ]);
    return (
        <RouterProvider router={router}/>
    )
}

export default Routes;