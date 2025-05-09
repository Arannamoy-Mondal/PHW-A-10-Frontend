import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from './Authprovider';
import Loading from './Loading';

const MyDonation = () => {
    const [donations, setDonations] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useContext(Authcontext)
    const {totalDonationAmount,setTotalDonationAmount}=useState(0)
    useEffect(() => {
        const fetchData = async () => {
            const data = await (await fetch(`https://phw-a-10-backend.vercel.app/donation/email/${user.email}`)).json()
            if (data) setLoading(false)
            setDonations(data)
        }
        fetchData()
    }, [])
    const totalDonation=()=>{
        donations.map(el=>{
            let amount=totalDonationAmount;
            setTotalDonationAmount(parseInt(amount)+parseInt(el.dAmount))
        })
    }
    if (loading) {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div className='mt-[100px] mb-[450px]'>
            {/* <h1 className='text-right' onClick={totalDonation()}>Total Donated Amount: {totalDonationAmount}</h1> */}
            {
                donations.length > 0 ?
                    <div className="w-[90%] m-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Serial No</th>
                                    <th>Campaign Title</th>
                                    <th>Donation Amount</th>
                                    <th>Donation TIme</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    donations.map(el =>

                                        <tr>
                                            <th>{el._id}</th>
                                            <td>{el.cTitle}</td>
                                            <td>$ {el.dAmount}</td>
                                            <td>{el.dTime}</td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='flex justify-center'><h1 className='text-[2rem] font-bold'>No donation</h1></div>
            }
        </div>
    );
};

export default MyDonation;