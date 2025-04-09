import React, { useContext } from 'react';
import { Authcontext } from './Authprovider';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user}=useContext(Authcontext)
    const navigate=useNavigate()
    if(!user){
        navigate("/login")
        return
    }
    return (
        children
    );
};

export default PrivateRoute;