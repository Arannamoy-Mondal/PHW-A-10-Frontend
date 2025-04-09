import React, { useContext } from 'react';
import { Authcontext } from './Authprovider';
import { NavLink } from 'react-router-dom';

const Campaign = ({ campaign}) => {
    const { _id,
        title,
        type, description,
        amount, deadline, organizerName, organizerEmail,
        created_time,url
    } = campaign
    
    return (
        <div className='card bg-base border-[1px] border-solid border-black m-[10px] p-[10px]'>
            <div className='flex justify-center'>
            <a href="https://imgbb.com/">
            <img src={url? url:"./No.png"} alt="" className='w-[250px] h-[250px]'/>
            </a>
            </div>
            <h1 className='text-center text-wrap'>{title}</h1>
            <h1 className='text-center text-wrap'>{type}</h1>
            <h1 className='text-center text-wrap'>{description}</h1>
            <h1 className='text-center text-wrap'>${amount}</h1>
            <h1 className='text-center text-wrap'>{deadline}</h1>
            <h1 className='text-center text-wrap'>{organizerName}</h1>
            <h1 className='text-center text-wrap'>{organizerEmail}</h1>
            <h1 className='text-center text-wrap'>{created_time}</h1>
        </div>
    );
};

export default Campaign;



{/* <a href="https://imgbb.com/">
            <img src="https://i.ibb.co.com/JFQ2yCqj/download.jpg"
 alt="" />
            </a> */}