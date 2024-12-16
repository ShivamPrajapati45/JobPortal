import Navbar from "@/components/shared/Navbar";
import Cookies from "js-cookie"
import { Navigate,useLocation } from "react-router-dom";

const ProtectedRoute = ({
    // eslint-disable-next-line react/prop-types
    component: Component,
}) => {
    const location = useLocation();
    const isLogin = Cookies.get('token');

    if(isLogin){
        return(
            <>  
                <Navbar/>
                <Component/>
            </>
        );
    }else{
        return (
            <Navigate
                to={'/login'}
                replace
                state={{from: location.pathname}}
            />
        )
    }
};

export default ProtectedRoute;