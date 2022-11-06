import "./_global.scss";
import React from 'react';
import { NotificationsProvider } from "@mantine/notifications";


function MyApp({ Component, pageProps }) {
  return (
    <NotificationsProvider>
      <Component {...pageProps}/>
    </NotificationsProvider>
  )
}

export default MyApp
