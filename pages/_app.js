import "./_global.scss";
import React from 'react';
import { useEffect, useState } from 'react'
import serverRequest from '../src/service/RestClient'
import ClientContext from '../src/contexts/ClientContext';
import { NotificationsProvider } from "@mantine/notifications";
import Render from "../pages/index";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)

  const clientContext = React.useMemo(() => ({
    apiRequest: (
      method, 
      url, 
      params, 
      downloadFile,
      {contentType = undefined} = {}) => serverRequest({method, url, params, downloadFile, contentType})
  }), [])

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) return null

  return (
    <ClientContext.Provider value={clientContext}>
      <NotificationsProvider>
        <Render />
        {/* <Component {...pageProps}/> */}
      </NotificationsProvider>
    </ClientContext.Provider>
  )
}

export default MyApp
