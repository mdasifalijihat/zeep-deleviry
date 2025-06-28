
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth();
    if(loading){
        return <span className="loading loading-ring loading-xl"></span>
    }

    if(!user){
        return <Navigate to={'/login'}> </Navigate>
    }
    return children;
}; 

export default PrivetRoute;