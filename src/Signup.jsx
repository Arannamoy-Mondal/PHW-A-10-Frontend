import React, { useContext, useState } from 'react';
import { Authcontext } from './Authprovider';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Banner from './Banner';
import AllCampaign from './AllCampaign';
import Loading from './Loading';
import Home from './Home';

const Signup = () => {
    const [show, setShow] = useState(true)
    const { loading, user, setUser, googleAuthentication, createAccount,logOut,update_profile } = useContext(Authcontext)
    const [ok, setOk] = useState(null)
    const [er, setEr] = useState(null)

    const Navigate = useNavigate()

    const showPass = (e) => {
        e.preventDefault()
        setOk(null)
        setEr(null)
        if (show) {
            setShow(false)
        }
        else setShow(true)
    }

    const googleSignUp = (e) => {
        e.preventDefault()
        setOk(null)
        setEr(null)
        googleAuthentication()
        Navigate("/")
    }

    const signUp = (e) => {
        e.preventDefault()
        setOk(null)
        setEr(null)
        const email = e.target.email.value
        const password = e.target.password.value
        const cpassword = e.target.cpassword.value
        const name=e.target.name.value
        const photo_url=e.target.photo_url.value
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8}$/;
        if (password === cpassword) {
            if (regex.test(password)) {
                createAccount(email, password).then(res => {
                    setUser(res.user)
                    update_profile(name,photo_url)
                    logOut();
                    setOk("Account successfully created. now log in")
                    Navigate("/login")
                })
                    .catch(err => setEr(err.message))

            }
            else {
                setEr("At least 1 lowercase letter,at least 1 uppercase letter,at least 1 digit (0-9),at least 1 special character (customize as needed) and exactly 8 characters long.")
            }
        }
        else {
            setEr("Password not match");
        }
       
    }
    
    if (loading) {
        return (
            <Loading></Loading>
        )
    }
    if(user){
        return <Home></Home>
    }
    return (
        <div className='my-[15px] lg:my-[25px]'>
            <h1 className='text-center text-2xl lg:text-7xl font-bold'>Signup</h1>
            <hr className='border-[1px] border-solid my-[10px]'/>
            <div className='flex justify-center mt-[25px]'>
                <form class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box" onSubmit={signUp}>
                    <label class="fieldset-label text-[1.25rem] text-black font-bold">Name</label>
                    <input type="text" class="input" placeholder="Name" name="name" required />
                    <label class="fieldset-label text-[1.25rem] text-black font-bold">Email</label>
                    <input type="email" class="input" placeholder="Email" name="email" required />
                    <label class="fieldset-label text-[1.25rem] text-black font-bold">Photo URL</label>
                    <input type="url" class="input" placeholder="Photo URL" name="photo_url" required />
                    <label class="fieldset-label text-[1.25rem] text-black font-bold">Password</label>
                    <input type={show ? "password" : "text"} class="input" placeholder="Password" name="password" required />
                    <label class="fieldset-label text-[1.25rem] text-black font-bold">Confirm Password</label>
                    <input type={show ? "password" : "text"} class="input" placeholder="Password" name="cpassword" required />
                    <button className='btn flex items-center gap-[5px]' onClick={showPass}>
                        <FaEye ></FaEye>
                        {show ? <button>Show password</button> : <button>Hide password</button>}
                    </button>
                    {er && <h1 className='alert alert-error'>{er}</h1>}
                    {ok && <h1 className='alert alert-success'>{ok}</h1>}
                    <button class="btn btn-neutral mt-4" type='submit'>Signup</button>
                    <NavLink to="/login" className={`btn btn-soft btn-primary`}>Already created? Now Login.</NavLink>
                </form>
            </div>
            <div className="flex justify-center"><button className='rounded-full py-[10px] px-[12px] border-2 border-black border-solid font-bold'>Or</button></div>
            <div className="flex justify-center mt-[10px]">
                <button className='flex justify-center items-center gap-[10px] btn btn-outline' onClick={googleSignUp}><FcGoogle /> Signup with Google</button>
            </div>
        </div>
    );
};

export default Signup;