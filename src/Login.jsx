import React, { useContext, useRef } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaEye } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { Authcontext } from './Authprovider';

const Login = () => {
  const emailRef = useRef();
  const [show, setShow] = React.useState(true);
  const [er, setEr] = React.useState(null);
  const [ok, setOk] = React.useState(null);

  const { user, setUser, googleAuthentication, forgetPassword, login } = useContext(Authcontext)

  const navigate = useNavigate()

  const loginGoogle = (e) => {
    e.preventDefault()
    setOk(null)
    setEr(null)
    googleAuthentication()
    navigate("/")
  }


  const showPass = (e) => {
    e.preventDefault()
    setOk(null)
    setEr(null)
    if (show) {
      setShow(false)
    }
    else setShow(true)
  }

  const signin = e => {
    e.preventDefault()
    setOk(null)
    setEr(null)
    const email = e.target.email.value
    const password = e.target.password.value
    if (email && password) login(email, password).then(res => { setUser(res.user); navigate("/"); }).catch(err => setEr(err.message))
    else setEr("Please enter email password properly.")
  }

  const forgetPass = e => {
    e.preventDefault()
    setOk(null)
    setEr(null)
    const email = emailRef.current.value
    if (email) {
      forgetPassword(emailRef.current.value)
      navigate("/")
    }
    else {
      setEr("Please enter correct email address.")
    }

  }

  return (
    <div className='my-[15px]'>
      <h1 className='text-center text-2xl lg:text-7xl font-bold'>Login</h1>
      <hr className='border-[1px] border-solid my-[10px]' />
      <div className='flex flex-wrap justify-center btn btn-warning'><h1 className='text-center w-[100%] text-wrap lg:text-[1rem]'>Don't press Enter or Keyboard Keys for login. Use Login button. Just click "Login" by mouse or touchpad.</h1></div>
      <div className='flex flex-wrap justify-center mt-[25px]'>
        <form class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box" onSubmit={signin}>
          <label class="fieldset-label text-[1.25rem] text-black font-bold" >Email</label>
          <input type="email" class="input" placeholder="Email" ref={emailRef} name="email" required />

          <label class="fieldset-label text-[1.25rem] text-black font-bold">Password</label>
          <input type={show ? "password" : "text"} class="input" placeholder="Password" name="password" required />
          <div className='flex items-center gap-[5px] justify-between'>
            <div className='flex items-center gap-[5px]'><FaEye onClick={showPass}></FaEye>
              {show ? <h1>Show password</h1> : <h1>Hide password</h1>}</div>
            <button onClick={forgetPass}>Forget Password ?</button>
          </div>
          {er && <h1 className='alert alert-error'>{er}</h1>}
          {ok && <h1 className='alert alert-success'>{ok}</h1>}
          <button class="btn btn-neutral mt-4">Login</button>
          <NavLink to="/signup" className={`btn btn-soft btn-primary`}>Create an account?</NavLink>
        </form>
      </div>
      <div className="flex justify-center"><button className='rounded-full py-[10px] px-[12px] border-2 border-black border-solid font-bold'>Or</button></div>
      <div className="flex justify-center mt-[10px]">
        <button className='flex justify-center items-center gap-[10px] btn btn-outline' onClick={loginGoogle}><FcGoogle /> Login with Google</button>
      </div>
    </div>
  )

};

export default Login;