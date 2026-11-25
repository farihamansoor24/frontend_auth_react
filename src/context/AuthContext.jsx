import {createContext, useContext, useState, useEffect} from 'react';
import { getToken } from '../utils/authHelper';
import { fetchUserFromServer } from '../services/authService';
import { setUser as setUserInLocalStorage } from '../utils/authHelper'; 


// Create Auth Context
const AuthContext = createContext();
// Set Auth Provider
export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const loadUser=async()=>{
        const token = getToken();
        if(!token){
            return setLoading(false);
        }
        try{
            const user = await fetchUserFromServer();
            setUser(user);
            setUserInLocalStorage(user);

        }
       catch (error) {
  console.log("Error in fetching User", error.message);
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    setUser(null);
  }
}
        finally{
            setLoading(false);
        }
    }

    useEffect(()=> {
        loadUser();
    },[])
  return (
     <AuthContext.Provider value={{ user, setUser, loading }}  >
      {children}
    </AuthContext.Provider>
  )
}
/// use AuthContext
export const useAuthContext = ()=>useContext(AuthContext);
