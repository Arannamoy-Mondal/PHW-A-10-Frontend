import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Campaign from './Campaign';
import swal from 'sweetalert';
import { Authcontext } from './Authprovider';
import Loading from './Loading';

const AllCampaign = () => {
    const [campaigns,setCampaigns] = useState([])
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)
    useEffect(()=>
    {
        const fetchData=async()=>{
            const data=await (await fetch("https://phw-a-10-backend.vercel.app/campaign")).json();
            if(data)setLoading(false)
            setCampaigns(data)
        }
        fetchData()
        
    },[])
    if(loading){
        return(
            <Loading></Loading>
        )
    }
    return (
        <div className='flex justify-center  gap-[10px]'>
            <div className='flex flex-wrap justify-evenly gap-[10px] mt-[50px] mb-[450px]'>
                {
                    campaigns.length>0?campaigns.map(campaign =>
                        <Campaign key={campaign._id} campaign={campaign}></Campaign>
                    ):<h1 className='text-2xl font-black'>No Campaign Running Now.</h1>
                }
            </div>
        </div>
    );
};

export default AllCampaign;