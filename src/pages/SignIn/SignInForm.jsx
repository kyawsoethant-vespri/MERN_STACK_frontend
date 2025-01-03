import styles from './styles.module.css';

const SignUpForm = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h1 className={styles.heading}>Login Form</h1>
                <div className="mb-4">
                    <label className={styles.label} htmlFor="email">
                        E-mail
                    </label>
                    <input
                        className={styles.inputName}
                        id="email" type="text" placeholder="E-mail"/>
                </div>
                <div className="mb-6">
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        className={styles.inputPassword}
                        id="password" type="password" placeholder="******************"/>
                    <p className={styles.inputText}>Please choose a password.</p>
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        type="button">
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
