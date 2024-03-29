import { useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [loadingAPI, setLoadingAPI] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token){
            navigate("/");
        }
    },[])
    const handleLogin = async () => {
        if(!email || !password){
            toast.error("Email/Password is required");
            return;
        }

        setLoadingAPI(true);
        let res = await loginApi(email, password);
        console.log(">>> check res: ", res)
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            navigate("/");
        } else{
            //error
            if (res && res.status === 400){
                toast.error(res.data.error);
            }
        }
        setLoadingAPI(false);
    }
    return(<>
    <div className="login-container col-12 col-sm-4">
        <div className="title">Log in</div>
        <div className="text">Email or Users</div>
        <input 
        type="text" 
        placeholder="Email or username"
        value={email}
        onChange={(event) => setEmail(event.target.value)} 
        />

        <div>
        <input 
        type="password" 
        placeholder="Password..."
        value={password}
        onChange={(event) => setPassword(event.target.value)} 
        />
        </div>
        
        <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
        >
            {loadingAPI && <FontAwesomeIcon icon={faSpinner} spin />} &nbsp; Login</button>
        <div className="back">
        <FontAwesomeIcon icon={faAngleLeft} /> Go Back
        </div>
    </div>

        
    </>)
}

export default Login;