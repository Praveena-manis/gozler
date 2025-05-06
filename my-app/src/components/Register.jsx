import { useState } from "react";
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'
function Register() {
    const [user, setUser] = useState({ fullname: '', email: '', username: '', password: '' })
    const [errors, setErrors] = useState({});
    const handleSubmit=async(e)=>{
        const validationErrors={}
        const emailPattern=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordPattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        e.preventDefault();
        if(!user.fullname){
            validationErrors.fullname=!user.fullname?"Name Cannot Empty":'';
        }
        if(!user.email){
            validationErrors.email="Email Cannot be Empty";
        }else if(!emailPattern.test(user.email)){
            validationErrors.email="Invalid Email"
        }
        if(!user.username){
            validationErrors.username="User Name Cannot be Empty";
        }
        if(!user.password){
            validationErrors.password="Password Cannot be Empty";
        }else if(!passwordPattern.test(user.password)){
            validationErrors.password="Your Password must includes 1 caps,1 special char and 8 char long"}
        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors)
            return
        }
        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
                name: user.fullname,
                email: user.email,
                username: user.username,
                password: user.password,
            },{withCredentials:true});
            toast(response.data.message);
            console.log(response.data.message);
            setUser({ fullname: '', email: '', username: '', password: '' });
            setErrors({});
        } catch (err) {
            const message = err.response?.data?.message || "Registration failed";
            alert(message);
        }
    }
    return (
        <div className="container">
            <h3 className="text-center">Registration Form</h3>
            <form onSubmit={handleSubmit} noValidate>
                <div class="mb-3">
                    <label for="formGroupExampleInput" className="form-label">FullName</label>
                    <input type="text" className={`form-control ${errors.fullname ? 'is-invalid' : 'is-valid'}`} id="formGroupExampleInput" placeholder="John Doe" required onChange={(e) => setUser({ ...user, fullname: e.target.value })} value={user.fullname} />
                    {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
                </div>
                <div class="mb-3">
                    <label for="formGroupExampleInput" className="form-label">Email Address</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`} id="formGroupExampleInput" placeholder="Johndoe@gmail.com" required onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div class="mb-3">
                    <label for="formGroupExampleInput" className="form-label">UserName</label>
                    <input type="text" className={`form-control ${errors.username ? 'is-invalid' : 'is-valid'}`} id="formGroupExampleInput" placeholder="Johndoe12" required onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username} />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>
                <div class="mb-3">
                    <label for="formGroupExampleInput" className="form-label">Password</label>
                    <input type="text" className={`form-control ${errors.password ? 'is-invalid' : 'is-valid'}`} id="formGroupExampleInput" placeholder="Enteer Your Password" required onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                
            </form>
            <ToastContainer/>
        </div>
    )
}
export default Register;