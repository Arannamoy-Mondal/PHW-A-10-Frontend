import React, { useContext, useState } from 'react';
import { Authcontext } from './Authprovider';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
    const [show, setShow] = useState(true)
    const { loading, user,setUser, googleAuthentication,createAccount } = useContext(Authcontext)
    const [ok, setOk] = useState(null)
    const [er, setEr] = useState(null)

    const Navigate = useNavigate()

    const showPass = (e) => {
        e.preventDefault()
        if (show) {
            setShow(false)
        }
        else setShow(true)
    }

    const googleSignUp = (e) => {
        e.preventDefault()
        googleAuthentication()
        Navigate("/")
    }

    const signUp = (e) => {
        e.preventDefault()
        const email=e.target.email.value
        const password=e.target.password.value
        const cpassword=e.target.cpassword.value
        const regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8}$/;
        if(password===cpassword){
            if(regex.test(password)){
                createAccount(email,password).then(res=>{
                    setUser(res.user)
                    setOk("Account successfully created. now log in")
                    Navigate("/")
                })
                .catch(err=>setEr(err.message))
                
            }
            else{
                setEr("At least 1 lowercase letter,at least 1 uppercase letter,at least 1 digit (0-9),at least 1 special character (customize as needed) and exactly 8 characters long.")
            }
        }
        else{
            setEr("Password not match");
        }
        console.log(email,password);
    }

    if (loading) {
        return (
            <div className='flex justify-center'>
                <div>
                    <span class="loading loading-bars loading-xs"></span>
                    <span class="loading loading-bars loading-sm"></span>
                    <span class="loading loading-bars loading-md"></span>
                    <span class="loading loading-bars loading-lg"></span>
                    <span class="loading loading-bars loading-xl"></span>
                </div>
            </div>
        )
    }
    // if (user) {
    //     Navigate('/')
    // }
    return (
        <div >
            <div className='flex justify-center mt-[25px]'>
                <form class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box" onSubmit={signUp}>
                    <label class="fieldset-label text-[1.25rem] text-black font-bold">Email</label>
                    <input type="email" class="input" placeholder="Email" name="email" required />

                    <label class="fieldset-label text-[1.25rem] text-black font-bold">Password</label>
                    <input type={show ? "password" : "text"} class="input" placeholder="Password" name="password" required />
                    <label class="fieldset-label text-[1.25rem] text-black font-bold">Confirm Password</label>
                    <input type={show ? "password" : "text"} class="input" placeholder="Password" name="cpassword" required />
                    <div className='flex items-center gap-[5px]' onClick={showPass}>
                        <FaEye ></FaEye>
                        {show ? <h1>Show password</h1> : <h1>Hide password</h1>}
                    </div>
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