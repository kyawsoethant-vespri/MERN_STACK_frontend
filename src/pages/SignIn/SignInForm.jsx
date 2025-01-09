import styles from './styles.module.css';
import {useState} from "react";
import axios from "../../helpers/baseUrl.js";
import ToastSuccess from "../../utils/Toast/ToastSuccess.js";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        try {
            e.preventDefault();
            setErrors(null)
            const data = {
                email: email,
                password: password,
            }
            const response = await axios.post("/api/users/login", data, {withCredentials: true})
            if (response.status === 200) {
                const successMessage = "Welcome,Login successful.";
                ToastSuccess(successMessage);
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }
            //Clear data
            setEmail("")
            setPassword("")
        } catch (e) {
            setErrors(e.response.data.errors);
        }

    }

    return (
        <div className={styles.container}>
            <ToastContainer/>
            <form onSubmit={login} className={styles.form}>
                <h1 className={styles.heading}>Login Form</h1>
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
                        Login
                    </button>
                    <a className={styles.text}
                       href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>)
}
export default SignUpForm
