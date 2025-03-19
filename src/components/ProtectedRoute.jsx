import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const isAuthenticated = localStorage.getItem ("Authenticated");
    return isAuthenticated ? children : <Navigate to="/"/>; {/*True e false*/}
};
export default ProtectedRoute;