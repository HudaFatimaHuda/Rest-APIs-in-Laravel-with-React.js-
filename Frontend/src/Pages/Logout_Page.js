// import { useContext } from "react"
import { redirect} from "react-router-dom"
// import AuthContext from "../Store/auth-context"


export function LogoutAction(){
    // const authCtx = useContext(AuthContext); 
    // authCtx.logout();
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    return redirect('/login')
}