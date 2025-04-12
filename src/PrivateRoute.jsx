import React, { useContext } from 'react';
import { Authcontext } from './Authprovider';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
    const { user,loading } = useContext(Authcontext)
    const navigate = useNavigate()
    if(loading){
        return <Loading></Loading>
    }
    if (!user) {
        return <Login></Login>
    }
    return (
        children
    )


};

export default PrivateRoute;