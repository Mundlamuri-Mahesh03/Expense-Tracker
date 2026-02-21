import React, { useContext, useState } from 'react';
import AppLayout from '../../components/layout/AuthLayout'
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance'
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext)

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
        }
        if (!password) {
            setError("Please enter the password");
        }
        setError("");


        // Login API call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            })

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }

        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setEmail("Something went wrong. Please try again.")
            }
        }
    }

    return (
        // <div>
        <AppLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
                <p className='text-xs text-slate-700 mt-5 mb-6'>Please enter your details to log in</p>
                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="johndeo@gmail.com"
                        type="text"
                        label="Email Address"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Min 8 Characters"
                        type="password"
                        label="Password"
                    />
                    {error && <p className='text-rose-500 text-xs pb-2.5'>{error}</p>}
                    <button className='btn-primary' type="submit">LOGIN</button>
                    <p> Don't have an account?{" "}<Link className="font-medium text-primary underline" to="/signup">SignUp</Link></p>
                </form>
            </div>
        </AppLayout>
        // </div>
    )
}

export default Login