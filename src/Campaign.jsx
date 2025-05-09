import React, { useContext } from 'react';
import { Authcontext } from './Authprovider';
import { NavLink } from 'react-router-dom';

const Campaign = ({ campaign}) => {
    const { _id,
        title,
        type, description,
        amount, deadline, organizerName, organizerEmail,
        created_time,url,totalDonatedAmount
    } = campaign
    
    return (
        <div className='card bg-base border-[1px] border-solid border-black w-[25%] m-[10px] p-[10px]'>
            <div className='flex justify-center w-[100%]'>
            <a href="https://imgbb.com/">
            <img src={url? url:"./No.png"} alt="" className='w-[100%] h-[250px] rounded-2xl'/>
            </a>
            </div>
            <h1 className='text-center text-wrap font-black text-2xl'>{title}</h1>
            <h1 className='text-center text-wrap w-[100%] m-auto font-bold'>{description}</h1>
            <h1 className='text-center text-wrap font-bold'>Campaign Type: {type}</h1>
            <h1 className='text-center text-wrap font-bold underline text-xl'>Minimum Donation Amount: $ {amount}</h1>
            <h1 className='text-center text-wrap'>Campaign Start Time:{created_time}</h1>
            <h1 className='text-center text-wrap'>Last Date For Donation: {deadline}</h1>
            {/* <h1 className='text-center text-wrap'>{organizerName}</h1> */}
            <h1 className='text-center text-wrap font-semibold'>Email: {organizerEmail}</h1>
            <h1 className='text-center text-wrap'>Total Raised Amount: $ {totalDonatedAmount}</h1>
            <NavLink to={`/viewmore/` + campaign._id} className="btn btn-primary text-white my-[10px]">View More</NavLink>
            <NavLink to={"/donate/" + _id} className={'btn btn-primary'}>Donate Now</NavLink>
        </div>
    );
};

export default Campaign;



{/* <a href="https://imgbb.com/">
            <img src="https://i.ibb.co.com/JFQ2yCqj/download.jpg"
 alt="" />
            </a> */}