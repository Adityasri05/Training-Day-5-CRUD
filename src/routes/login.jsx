import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async () => {
        setErrorMsg("");
        if (!email || !password) {
            setErrorMsg("Email and password are required");
            return;
        }

        try {
            const raw = {
                email: email,
                password: password,
            };

            const response = await fetch("https://training-day-8-mywood-deployment.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(raw),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.error || `HTTP error! Status: ${response.status}`);
            }

            localStorage.setItem("token", result?.token);
            window.location.href = "/cms";
            console.log(result);

        } catch (error) {
            console.error("Error:", error);
            setErrorMsg(error.message || "Failed to log in. Please try again.");
        }
    }

    return (
        <div className="login-page-container">
            <div className="login-card">
                <h2>Login to Mywoods</h2>

                {errorMsg && <div className="login-error">{errorMsg}</div>}

                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />

                <button onClick={() => handleLogin()}>Login</button>
            </div>
        </div>
    )
}

export default Login;
