import React, { useState } from 'react';
import ApiService from '../../service/ApiService';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        if (!name || !email || !password || !phoneNumber) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage('Please fill all the fields.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }
        try {
            // Call the register method from ApiService
            const response = await ApiService.registerUser(formData);

            // Check if the response is successful
            if (response.statusCode === 200) {
                // Clear the form fields after successful registration
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: ''
                });
                setSuccessMessage('User registered successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                }, 3000);
            }
        }
         catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className=" flex flex-col items-center   p-4 border border-gray-300 rounded-lg shadow-md shadow-[#687a5e]"> 
            <h2 className=' text-4xl font-semibold font-serif text-center text-secondary mt-4'>Sign Up</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
                <div className="form-group">
                    <label className="text-lg font-poppins ">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded p-2 bg-sky-50 hover:bg-sky-100 hover:text-black"
                    required />
                </div>
                <div className="form-group">
                    <label className="text-lg font-poppins ">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded p-2 bg-sky-50 hover:bg-sky-100 hover:text-black"
                    required />
                </div>
                <div className="form-group">
                    <label className="text-lg font-poppins ">Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded p-2 bg-sky-50 hover:bg-sky-100 hover:text-black"
                    required />
                </div>
                <div className="form-group">
                    <label className="text-lg font-poppins ">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} 
                    className="w-full border border-gray-300 rounded p-2 bg-sky-50 hover:bg-sky-100 hover:text-black"
                    required />
                </div>
                <button type="submit" className="bg-btn_bg text-white font-semibold text-2xl p-4 hover:bg-hover_btn_bg rounded-lg">Register</button>
            </form>
            <p className="text-gray-600 text-lg">
                Already have an account? <a href="/login" className="text-blue-600">Login</a>
            </p>
            </div>
        </div>
    );
}

export default RegisterPage;