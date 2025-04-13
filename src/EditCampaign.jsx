import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Authcontext } from './Authprovider';

const EditCampaign = () => {
    const params = useParams()
    const { user } = useContext(Authcontext)
    const [campaign, setCampaign] = useState([])

    const loadCampaign = () => {
        fetch(`https://phw-a-10-backend.vercel.app/campaign/id/${params.id}`).then(res => res.json()).then(res => setCampaign(res))
    }

    useEffect(() => {
        loadCampaign()
        // fetch(`https://phw-a-10-backend.vercel.app/campaign/id/${params.id}`).then(res => res.json()).then(res => setCampaign(res))
    }, [])
    return (
        <div className='flex justify-evenly'>
            <div>
                <h1 className='text-center lg:text-[2rem] font-bold'>Current Details</h1>
                <div className='flex justify-center'>
                    <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                        <label className="fieldset-label">Campaign Title</label>
                        <input required  type="text" className="input" value={campaign.title} placeholder="Campaign title" />
                        <label className="fieldset-label">Campaign type</label>
                        <div required className="dropdown dropdown-bottom dropdown-end">
                            <select  id="type" required value={campaign.type} className='text-[1.25rem] p-[10px] rounded-2xl border-[1px] border-solid border-black'>
                                <option value=""> Select</option>
                                <option value="Personal issue"> Personal issue</option>
                                <option value="Startup">Startup</option>
                                <option value="Business">Business</option>
                                <option value="Creative ideas">Creative ideas</option>
                            </select>
                        </div>
                        <label className="fieldset-label">Campaign Description</label>
                        <input required name="description"  value={campaign.description} className="input" placeholder="Campaign Description" />
                        <label className="fieldset-label">Minimum donation amount</label>
                        <input required  type="number" className="input" value={campaign.amount} placeholder="Minimum donation amount" />
                        <label className="fieldset-label">Deadline (Date)</label>
                        <input required  type="datetime-local" value={campaign.deadline} className="datetime-local text-xl border-[1px] border-solid border-black p-[5px]" placeholder="Campaign Description" />
                        <label className="fieldset-label">Image URL</label>
                        <input required  type="url" className="input" placeholder="Image URL" value="https://i.ibb.co.com/JFQ2yCqj/download.jpg" />
                        <label className="fieldset-label">Campaign organised By</label>
                        <input type="text"  className="input" placeholder={user.displayName} value={user.displayName} />
                        <label className="fieldset-label">Campaign organizer Email</label>
                        <input type="text"  className="input" placeholder={user.email} value={user.email} />
                        {/* <button className="btn btn-neutral mt-4">Create Campaign</button> */}
                    </form>
                </div>
            </div>
            <div>
                <h1 className='text-center lg:text-[2rem] font-bold'>Update Details</h1>
                <div className='flex justify-center'>
                    <form className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                        <label className="fieldset-label">Campaign Title</label>
                        <input required name="title" type="text" className="input" value={campaign.title} placeholder="Campaign title" />
                        <label className="fieldset-label">Campaign type</label>
                        <div required className="dropdown dropdown-bottom dropdown-end">
                            <select name="type" id="type" required value={campaign.type} className='text-[1.25rem] p-[10px] rounded-2xl border-[1px] border-solid border-black'>
                                <option value=""> Select</option>
                                <option value="Personal issue"> Personal issue</option>
                                <option value="Startup">Startup</option>
                                <option value="Business">Business</option>
                                <option value="Creative ideas">Creative ideas</option>
                            </select>
                        </div>
                        <label className="fieldset-label">Campaign Description</label>
                        <input required name="description" type="text" value={campaign.description} className="input" placeholder="Campaign Description" />
                        <label className="fieldset-label">Minimum donation amount</label>
                        <input required name="amount" type="number" className="input" value={campaign.amount} placeholder="Minimum donation amount" />
                        <label className="fieldset-label">Deadline (Date)</label>
                        <input required name="deadline" type="datetime-local" value={campaign.deadline} className="datetime-local text-xl border-[1px] border-solid border-black p-[5px]" placeholder="Campaign Description" />
                        <label className="fieldset-label">Image URL</label>
                        <input required name="url" type="url" className="input" placeholder="Image URL" value="https://i.ibb.co.com/JFQ2yCqj/download.jpg" />
                        <label className="fieldset-label">Campaign organised By</label>
                        <input type="text" name='organizerName' className="input" placeholder={user.displayName} value={user.displayName} />
                        <label className="fieldset-label">Campaign organizer Email</label>
                        <input type="text" name="organizerEmail" className="input" placeholder={user.email} value={user.email} />
                        <button className="btn btn-neutral mt-4">Create Campaign</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCampaign;