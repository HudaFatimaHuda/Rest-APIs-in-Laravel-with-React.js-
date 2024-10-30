import { useReducer } from "react";
import AuthContext from "./auth-context";

const defaultAuthState = {
  isLogin: false,
  token: null,
  data: { name: "", email: "", id: "" },
};

const authReducer = (state, action) => {
  if(action.type === 'LOGIN'){
    localStorage.setItem("token", action.authData.token);
    localStorage.setItem("name", action.authData.user.name);
    localStorage.setItem("id", action.authData.user.id);
    return {isLogin: true, token: action.authData.token, data: {name: action.authData.user.name, email: action.authData.user.email, id: action.authData.user.id}}
  }
  else if(action.type === 'LOGOUT'){
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    return defaultAuthState
  }
  return defaultAuthState
};

const AuthProvider = (props) => {
  const [authState, dispatchAuthAction] = useReducer(
    authReducer,
    defaultAuthState
  );
  const loginHandler = (authData) => {
    dispatchAuthAction({ type: "LOGIN", authData: authData });
  };
  const logoutHandler = () => {
    dispatchAuthAction({ type: "LOGOUT" });
  };

  const authContext = {
    isLogin: authState.isLogin,
    token: authState.token,
    data: authState.data,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

/* basically what we are doing is:
const context = React.createContext()
then provide it 
({children}) => {
    //do something to manage state
    return(<context.Provider value={obj}>{children}</context.Provider>)
}
*/

// at time of creating context we can pass an initial state
