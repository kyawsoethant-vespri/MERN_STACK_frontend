import styles from './styles.module.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import ToastSuccess from "../../utils/Toast/ToastSuccess.js";
import {ToastContainer} from "react-toastify";

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    console.log(errors)

    const register = async (e) => {
        try {
            e.preventDefault();
            setErrors(null);
            const data = {
                name: name,
                email: email,
                password: password,
            }
            const response = await axios.post("http://localhost:8000/api/users/register", data, {withCredentials: true})

            if (response.status === 200) {
                const successMessage = "Registration is successfully.";
                ToastSuccess(successMessage);
                setTimeout(() => {
                    navigate("/sign-in")
                }, 1000);
            }
            //Clear data
            setName("")
            setEmail("")
            setPassword("")
            // console.log(response)
        } catch (e) {
            setErrors(e.response.data.errors)
        }
    }

    return (
        <div className={styles.container}>
            <ToastContainer/>
            <form onSubmit={register} className={styles.form}>
                <h1 className={styles.heading}>Register Form</h1>
                <div className="mb-4">
                    <label className={styles.label} htmlFor="name">
                        Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.inputName}
                        id="name" type="text" placeholder="Name"/>
                    {errors && errors.name && <p className={styles.inputText}>{errors.name.msg}</p>}
                </div>
                <div className="mb-4">
                    <label className={styles.label} htmlFor="email">
                        E-mail
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputName}
                        id="email" type="text" placeholder="E-mail"/>
                    {errors && errors.email && <p className={styles.inputText}>{errors.email.msg}</p>}

                </div>
                <div className="mb-6">
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputPassword}
                        id="password" type="password" placeholder="******************"/>
                    {errors && errors.password && <p className={styles.inputText}>{errors.password.msg}</p>}
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        type="submit">
                        Register
                    </button>
                    <Link to={"/sign-in"} className={styles.text}
                          href="#">
                        Login here
                    </Link>
                </div>
            </form>
        </div>)
}
export default SignUpForm
