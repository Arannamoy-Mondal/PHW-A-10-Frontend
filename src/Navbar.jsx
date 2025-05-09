import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Authcontext } from './Authprovider';
import Loading from './Loading';

const Navbar = () => {

  const { googleAuthentication, registerUser, user, logOut, loading } = useContext(Authcontext);
  const navigate = useNavigate()
  const signOut = () => {
    logOut()
    navigate("/")
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost text-[1rem] lg:text-[2rem] text-wrap">Crowdcube</NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLink to="/" className={"btn btn-primary btn-outline m-[5px]"}>Home</NavLink>
          <NavLink to="/all-campaign" className={"btn btn-primary btn-outline m-[5px]"}>All Campaign</NavLink>
          <li><NavLink to="/create-campaign" className={"btn btn-primary btn-outline m-[5px]"}>Add Campaign</NavLink></li>
          {user && <li>
            <NavLink to="/my-advertise" className={"btn btn-primary btn-outline m-[5px]"}>
              My Campaign
            </NavLink>
          </li>}
          {user&&<li>
            <NavLink to="/my-donation" className={"btn btn-primary btn-outline m-[5px]"}>
              My Donation
            </NavLink>
          </li>}
          
          <NavLink to="/howToHelpUs" className={"btn btn-primary btn-outline m-[5px]"}>How to help us?</NavLink>
        </ul>
      </div>
      <div className="navbar-end gap-[15px]">
        {
          user ? <>
            <NavLink to="/dashboard" className={"btn btn-primary hidden lg:flex"}>Dashboard</NavLink>
            <button className={"btn btn-primary hidden lg:flex"} onClick={signOut}>Logout</button>
          </> :
            <>
              <NavLink to="/signup" className={"btn btn-primary hidden lg:flex"}>Signup</NavLink>
              <NavLink to="/login" className={"btn btn-primary hidden lg:flex"}>Login</NavLink>
            </>

        }
        <div className="dropdown lg:hidden">
          {
            user ? <details>
              <summary className={"btn btn-error btn-outline m-[5px]"}>Menu</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><NavLink className={"btn btn-primary btn-outline m-[5px]"}>Home</NavLink></li>
                <li><NavLink to="/all-campaign" className={"btn btn-primary btn-outline m-[5px]"}>All Campaign</NavLink></li>
                <li><NavLink to="/dashboard" className={"btn btn-primary btn-outline m-[5px]"}>Dashboard</NavLink></li>
                <li><NavLink to="/create-campaign" className={"btn btn-primary btn-outline m-[5px]"}>Add Campaign</NavLink></li>
                <li>
                  <NavLink to="/my-advertise" className={"btn btn-primary btn-outline m-[5px]"}>
                    My Campaign
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-donation" className={"btn btn-primary btn-outline m-[5px]"}>
                    My Donation
                  </NavLink>
                </li>
                <li> <NavLink to="/howToHelpUs" className={"btn btn-primary btn-outline m-[5px]"}>How to help us?</NavLink></li>
                <li><button onClick={signOut} className={"btn btn-primary btn-outline m-[5px]"} >Logout</button></li>
              </ul>
            </details> :
              <details>
                <summary className={"btn btn-error btn-outline m-[5px]"}>Menu</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li><NavLink className={"btn btn-primary btn-outline m-[5px]"}>Home</NavLink></li>
                  <li><NavLink to="/all-campaign" className={"btn btn-primary btn-outline m-[5px]"}>All Campaign</NavLink></li>
                  <li><NavLink to="/create-campaign" className={"btn btn-primary btn-outline m-[5px]"}>Add Campaign</NavLink></li>
                  <li><NavLink to="/signup" className={"btn btn-primary btn-outline m-[5px]"}>Signup</NavLink></li>
                  <li><NavLink to="/login" className={"btn btn-primary btn-outline m-[5px]"}>Login</NavLink></li>
                  <li> <NavLink to="/howToHelpUs" className={"btn btn-primary btn-outline m-[5px]"}>How to help us?</NavLink></li>
                </ul>
              </details>
          }


        </div>
      </div>
    </div>
  );
};

export default Navbar;