import React from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInWithEmailAndPasswordFunction } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    // console.log("In the login page", location);



    const handleLogin = (data) => {
        // console.log("After Submit: ", data);
        signInWithEmailAndPasswordFunction(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                navigate(location?.state || '/');
            })
            .catch((error) => {
                console.log(error);
            })
    }



    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl my-5">
            <h3 className="text-3xl text-center">Welcome back</h3>
            <p className='text-center'>Login with ZapShift</p>
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <fieldset className="fieldset">
                    {/* Eamil Field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && (<p className='text-red-500'>Eamil is required.</p>)
                    }

                    {/* password Field */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/ })} className="input w-full" placeholder="Password" />
                    {errors.password?.type === 'required' && (<p className='text-red-500'>Password is required.</p>)}
                    {errors.password?.type === 'minLength' && (<p className='text-red-500'>Password must be 6 characters or longer.</p>)}
                    {errors.password?.type === 'pattern' && (<p className='text-red-500'>Password must contain at least one uppercase, one lowercase, one number, and one special character.</p>)}


                    <div><Link to={'/forget-password'} className="link link-hover">Forget Password?</Link></div>
                    <button className="btn bg-primary text-black mt-4">Login</button>
                </fieldset>
                <p>Don’t have any account? <Link to={'/register'} state={location?.state} className='text-primary link-hover'>Register</Link></p>

            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;