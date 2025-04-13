import React from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';

const Viewmore = () => {
    const campaign = useLoaderData()
    return (
        <div className='my-[50px]'>
            <div className='flex justify-center'>
                <img src={ campaign.url} alt="" />
            </div>
            <h1 className='text-center text-[2rem] font-bold'>{campaign.title}</h1>
            <h1 className='text-center text-[1.5rem] font-bold'>{campaign.description}</h1>
            <h1 className='text-center text-[1.5rem] font-bold'>Mimimum Donation Amount: {campaign.amount}</h1>
            <h1 className='text-center text-[1.25rem] font-bold' >Organizer name: {campaign.organizerName}</h1>
            <h1 className='text-center text-[1.25rem] font-bold' >Organizer Email: {campaign.organizerEmail}</h1>
            <h1 className='text-center text-wrap text-[1.25rem] font-bold'>Total donated amount: {campaign.totalDonatedAmount}</h1>
            <div className='flex justify-center'><NavLink to={"/donate/" + campaign.id} className={"btn btn-primary"}>Donate</NavLink></div>
        </div>
    );
};

export default Viewmore;