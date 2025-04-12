import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from './Authprovider';
import button from 'daisyui/components/button';

const Dashboard = () => {
    const { user } = useContext(Authcontext)
    const [userDb,setUserDb]=useState([])
    useEffect(()=>{
        fetch(`https://phw-a-10-backend.vercel.app/user/email/${user.email}`)
        .then(res=>res.json())
        .then(res=>setUserDb(res))
    },[])

    console.log(userDb);
    return (
        <div className='w-[70%] mx-auto'>
            <div className=' w-[100%]'>
                <img src={user.photoURL ? user.photoURL : "./No.png"} alt="" className='w-[150px] h-[150px] mx-auto' />
            </div>
            <h1 className='text-center text-[1rem] text-wrap font-black'>Username: {user.displayName}</h1>
            <h1 className='text-center text-[1rem] text-wrap font-black'>Email: {user.email}</h1>
            <h1 className='text-center text-[1rem] text-wrap font-black'>Email verified: {user.emailVerified? <button className='btn btn-success text-black font-bold'>Yes</button>: <button className='btn btn-error text-black font-bold'>No</button> }</h1>
            <h1 className='text-center text-[1rem] text-wrap font-black'>Total donation: {userDb.totalDonation} BDT</h1>
            <h1 className='text-center text-[1rem] text-wrap font-black'>Account created time: {userDb.created_time}</h1>
        </div>
    );
};

export default Dashboard;