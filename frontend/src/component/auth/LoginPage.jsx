import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

  const from = location.state?.from?.pathname || '/home';


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        try {
            const response = await ApiService.loginUser({email, password});
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                navigate(from, { replace: true });
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen ">
        <div className=" flex flex-col items-center   p-4 border border-gray-300 rounded-lg shadow-md shadow-[#687a5e]">
            <h2 className=" text-4xl font-semibold font-serif text-center text-secondary mt-4">Welcome Back</h2>
            <h4 className="text-lg text-gray-700 "> Enter your email and password to access your account</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4  rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
                <div className="form-group">
                    <label className="text-lg font-poppins ">Email  </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 bg-sky-50 hover:bg-sky-100 hover:text-black"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-lg font-poppins ">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded p-2 bg-sky-50 hover:bg-sky-100 hover:text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className=" flex justify-between items-center mb-4">
                <span className="flex gap-4 justify-start items-center items-center"> 
                    <input type="checkbox" className=" h-4" />
                <label className="text-lg font-poppins ">Remember me</label></span>
                
                <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</a>
                </div>
                <button type="submit" className="bg-btn_bg text-white font-semibold text-2xl p-4 hover:bg-hover_btn_bg rounded-lg">Login</button>
            </form>

            <p className="text-gray-600 text-lg">
                Don't have an account?   <a href="/register" className="text-blue-600">Register</a>
            </p>
        </div>
        {error && <p className="error-message text-red-500 ">{error}</p>}
        </div>
    );
}

export default LoginPage;