import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Campaign from './Campaign';
import swal from 'sweetalert';
import { Authcontext } from './Authprovider';

const AllCampaign = () => {
    const [campaigns,setCampaigns] = useState([])
    useEffect(()=>{
        fetch("https://phw-a-10-backend.vercel.app/campaign").then(res=>res.json()).then(res=>{
            console.log(res);
            setCampaigns(res)
        }).catch(err=>{
            swal("Oops!", "Something went wrong!", "error");
        })
    },[])

    return (
        <div className='flex justify-center  gap-[10px]'>
            <div className='flex flex-wrap justify-evenly gap-[10px]'>
                {
                    campaigns.map(campaign =>
                        <Campaign key={campaign._id} campaign={campaign}></Campaign>
                    )
                }
            </div>
        </div>
    );
};

export default AllCampaign;