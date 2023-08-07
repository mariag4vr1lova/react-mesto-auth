import { useState } from "react";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

function handleChangeEmail(e) {
    setEmail(e.target.value);
}
function handleChangePassword(e) {
    setPassword(e.target.value);
}

function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ email, password });
}

return (
    <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
            <input
            className="auth__input"
            type="email"
            name="email"
            value={email}
            placeholder="Введите Ваш email"
            onChange={handleChangeEmail}
            required
            />
            <input
            className="auth__input"
            type="password"
            name="password"
            value={password}
            placeholder="Введите Ваш пароль"
            minLength={3}
            onChange={handleChangePassword}
            required
        />
        </fieldset>
        <button className="auth__submit">Войти</button>
    </form>
    </div>
);
}

export default Login;