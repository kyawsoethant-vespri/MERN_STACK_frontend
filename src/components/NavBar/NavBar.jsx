import { Link } from "react-router-dom";
import Styles from "./styles.module.css";

const NavBar = () => {
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
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
