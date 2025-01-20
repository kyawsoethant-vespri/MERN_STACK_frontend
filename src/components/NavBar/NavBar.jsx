import {Link, useNavigate} from "react-router-dom";
import Styles from "./styles.module.css";
import {AuthContext} from "../../Context/AuthContext.jsx";
import {useContext} from "react";
import axios from "../../helpers/baseUrl.js";

const NavBar = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);

    const logout = async () => {
        try {
            const res = await axios.post("/api/users/logout");
            if (res.status === 200) {
                dispatch({type: "LOGOUT"});
                setTimeout(() => {
                    navigate("/sign-in");
                }, 1000);
            } else {
                console.error("Unexpected response status:", res.status);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };


    return (
        <>
            <nav className={Styles.nav}>
                <div className={Styles.logoContainer}>
                    <Link to={"/"}>
                        <img
                            src="../../public/online-order.png"
                            alt="Recipicity Logo"
                            className={Styles.logo}
                        />
                    </Link>
                    <h1 className={Styles.h1}>
                        <Link to={"/"}>Recipicity</Link>
                    </h1>
                </div>
                <ul className="flex space-x-10">
                    <li>
                        <Link to={"/"} className={Styles.link}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={"/about"} className={Styles.link}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to={"/contact"} className={Styles.link}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to={"/recipes/create"} className={Styles.link}>
                            Create Recipes
                        </Link>
                    </li>
                    {!user ? (<>
                        <li>
                            <Link to={"/sign-in"} className={Styles.link}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to={"/sign-up"} className={Styles.link}>
                                Register
                            </Link>
                        </li>
                    </>) : (<li>
                        <button onClick={logout} className={Styles.link}>
                            Logout
                        </button>
                    </li>)
                    }
                </ul>
            </nav>
        </>
    );
};

export default NavBar;
