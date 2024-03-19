"use client"
const { createContext, useContext, useState } = require("react");

const UserContext = createContext({});

const UserContextProvider = ({children}) => {

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => {
    return useContext(UserContext);
}

export default UserContextProvider;