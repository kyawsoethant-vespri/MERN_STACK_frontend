import styles from './styles.module.css';
import {useContext, useState} from "react";
import axios from "../../helpers/baseUrl.js";
import {AuthContext} from "../../Context/AuthContext.jsx";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const {dispatch} = useContext(AuthContext);

    const login = async (e) => {
        e.preventDefault();
        try {
            setErrors(null)
            const data = {
                email: email,
                password: password,
            }
            const response = await axios.post("/api/users/login", data, {withCredentials: true})
            if (response.status === 200) {
                dispatch({type: "LOGIN", payload: response.data.user})
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
