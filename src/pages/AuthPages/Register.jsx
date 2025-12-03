import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';



const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUserWithEmailAndPasswordFunction, updateUserProfile, } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    // console.log("in register", location);




    const handleRegistration = (data) => {
        // console.log("After Submit", data.photo[0]);
        const profileImg = data.photo[0];
        createUserWithEmailAndPasswordFunction(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                // 1.  store the image and get the photo url
                const formData = new FormData();
                formData.append('image', profileImg);
                // 2. send the photo to store and get the url
                const image_API_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
                axios.post(image_API_Url, formData)
                    .then(res => {
                        console.log('After image upload: ', res.data.data);
                        // 3. update user profile to firebase 
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        // now call firebase function
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('User profile updated done.')
                                navigate(location?.state || '/');
                            })
                            .catch(error => console.log(error))
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }





    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl my-5">
            <h3 className="text-3xl text-center">Create an Account</h3>
            <p className='text-center'>Register with ZapShift</p>
            <form className='card-body' onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">


                    {/* Name */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input w-full" placeholder="Your name" />
                    {errors.name?.type === 'required' && (<p className='text-red-500'>Name is required.</p>)}

                    {/* Photo */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input w-full" placeholder="Your name" />
                    {errors.photo?.type === 'required' && (<p className='text-red-500'>Photo is required.</p>)}

                    {/* Email */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    {errors.email?.type === 'required' && (<p className='text-red-500'>Email is required.</p>)}

                    {/* Password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/ })} className="input w-full" placeholder="Password" />
                    {errors.password?.type === 'required' && (<p className='text-red-500'>Password is required.</p>)}
                    {errors.password?.type === 'minLength' && (<p className='text-red-500'>Password must be 6 characters or longer.</p>)}
                    {errors.password?.type === 'pattern' && (<p className='text-red-500'>Password must contain at least one uppercase, one lowercase, one number, and one special character.</p>)}

                    <button className="btn bg-primary text-black mt-4">Register</button>
                </fieldset>
                <p>Already have an account? <Link to={'/login'} state={location?.state} className='text-primary link-hover'>Login</Link></p>

            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;