import React from 'react'
import "./_global.scss"
// import AuthContext from "../contexts/AuthContext";
// import ClientContext from "../contexts/ClientContext";
// import apiRequest from '../util/apiRequest';
import { ThemeProvider } from '@mui/material/styles';

// const theme = createStyles({
//   palette: {
//     primary: {
//       main: '#352269'
//     },
//     secondary: {
//       main: '#05407c',
//     },
//   },
// })

function MyApp({ Component, pageProps }) {
  // const [currentUser, setCurrentUser] = React.useState(null);

  // // Efetua a alteração do usuário ativo (logado)
  // const doLogin = (user) =>{
  //   localStorage.setItem("moovUser", JSON.stringify(user))
  //   setCurrentUser(user)
  // }

  // const doLogout = () => {
  //   localStorage.removeItem("moovUser")
  //   setCurrentUser(null)
  // }

  // const authContextValue = {
  //   currentUser,
  //   doLogin,
  //   doLogout
  // }

  // const clientContextValue = React.useMemo(() => ({
  //   apiRequest: (method, url, params, {downloadFile = false} = {}) => {
  //     const currentUser = JSON.parse(localStorage.getItem("moovUser"))
  //     return apiRequest(method, url, params, currentUser, downloadFile)
  //   },
  // }), [currentUser])

  // React.useEffect(() => {
  //   setCurrentUser(JSON.parse(localStorage.getItem("moovUser")))
  // }, [])

  return (
    <Component {...pageProps}/>
    )
}

export default MyApp
