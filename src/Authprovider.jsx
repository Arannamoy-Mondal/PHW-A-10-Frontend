import React, { createContext } from 'react';
export const Authcontext=createContext()
const Authprovider = ({children}) => {
    return (
        <Authcontext.Provider>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;