import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';

function Login({ setLoggedIn }) {
    const [user, setUser] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!user.email) {
            validationErrors.email = "Email cannot be empty";
        }
        if (!user.password) {
            validationErrors.password = "Password cannot be empty";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/login',
                { email: user.email, password: user.password },
                { withCredentials: true }
            );
            toast.success(response.data.message);
            console.log("Login successful", response.data.message);
            setLoggedIn(true);
            setUser({ email: '', password: '' });
            setErrors({});
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
        }
    };

    return (
        <div className="container">
            <h3 className="text-center p-2 text-bg-warning my-3">Login Form</h3>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="john@gmail.com"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        value={user.email}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter Your Password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        value={user.password}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100 my-3">Login</button>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Login;
