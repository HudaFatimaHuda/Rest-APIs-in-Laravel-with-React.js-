import React from 'react'

const AuthContext = React.createContext({
  isLogin: false,
  token: null,
  data: {name: '', email: '', id: ''},
  login: (authData) => {/* we can set the token and data here */},
  logout: () => {}
})

export default AuthContext;
