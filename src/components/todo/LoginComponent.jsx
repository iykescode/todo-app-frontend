import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthContext";

function LoginComponent() {

    const [username, setUsername] = useState('iykescode')
    const [password, setPassword] = useState('admin')
    const [showErrorMessage, setErrorMessage] = useState(false)

    const navigate = useNavigate();
    const authContext = useAuth();

    function changeUsername(event) {
        setUsername(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
    }

    async function login() {
        if(await authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        } else {
            setErrorMessage(true)
        }
    }

    return (
        <div className="LoginComponent">
            <h1>Login</h1>
            {showErrorMessage && <div className="errorMessage">Authentication Failed. please check your credentials</div>}
            <div className="LoginForm">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={username} onChange={changeUsername} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={password} onChange={changePassword} />
                </div>
                <div>
                    <button type="button" name="loginBtn" onClick={login}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;