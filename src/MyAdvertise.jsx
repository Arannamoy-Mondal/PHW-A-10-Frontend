import React, { use, useContext, useEffect, useState } from 'react';
import { Authcontext } from './Authprovider';
import Campaign from './Campaign';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';

const MyAdvertise = () => {
    const { user } = useContext(Authcontext)
    const [campaigns, setCampaigns] = useState([])
    useEffect(() => {
        fetch(`https://phw-a-10-backend.vercel.app/campaign/email/${user.email}`)
            .then(res => res.json()).then(res => setCampaigns(res)).catch(err => console.log(err.message))


    }, [])

    const updateData = () => {
        fetch(`https://phw-a-10-backend.vercel.app/campaign/email/${user.email}`)
            .then(res => res.json()).then(res => setCampaigns(res)).catch(err => console.log(err.message))

    }

    updateData()
    const deleteCampaign = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    fetch(`https://phw-a-10-backend.vercel.app/campaign/id/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.deletedCount > 0) {
                                swal("Deleted!", "Your imaginary file has been deleted!", "success");
                                updateData()
                            }
                        })
                        .catch(err => {
                            swal("Faild!", "Please try later", "error");
                        })
                }
            });
    }
    return (
        <div className='flex justify-evenly flex-wrap w-full gap-[10px]'>
            {
                campaigns.map(
                    campaign =>
                        <div className='flex w-[90%] flex-col lg:flex-row lg:flex-wrap p-[15px] items-center border-[2px] border-solid border-black'>


                            <div className='p-[10px] lg:w-[20%] flex justify-center'>
                                <img src={campaign.url ? campaign.url : "./No.png"} alt="" className='w-[150px] h-[150px]' />
                            </div>

                            <div className='lg:w-[30%] '>
                                <h1 className='text-center text-wrap'>{campaign.title}</h1>
                                <h1 className='text-center text-wrap'>{campaign.description}</h1>
                                <h1 className='text-center text-wrap'>Minimum Donate: Amount: ${campaign.amount}</h1>
                                <h1 className='text-center text-wrap'>Type: {campaign.type}</h1>
                            </div>
                            <div className='lg:w-[30%] '>
                                <h1 className='text-center text-wrap'>Minimum Donate: Amount: ${campaign.amount}</h1>
                                <h1 className='text-center text-wrap'>Deadline: {campaign.deadline}</h1>
                                <h1 className='text-center text-wrap'>Created time: {campaign.created_time}</h1>
                            </div>
                            <div className='lg:w-[20%] flex justify-center gap-[10px]'>
                                <NavLink className={"btn btn-warning text-white font-bold"}>Edit</NavLink>
                                <NavLink className={"btn btn-error text-white font-bold"} onClick={() => deleteCampaign(campaign._id)}>Delete</NavLink>
                            </div>
                        </div>
                )
            }
        </div>
    );
};

export default MyAdvertise;