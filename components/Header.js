import React from 'react'
import {Grid, Typography} from '@mui/material';
// import "./ImageBanner.scss"

export default function Header() {

  return (
    <Grid 
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        style={{
            left: 0,
            top: 0,
            margin: 15,
            marginLeft: 35,
            width: '100%',
            display: 'flex',
            position: 'fixed',
            flexDirection: 'row',
        }}
    >
        <Grid item xs={12} sm={12} md={2}>
            <Typography
                style={{
                    fontSize: 24,
                    color: "white",
                    fontWeight: 'bold',
                    fontFamily:"Verdana, Arial, Helvetica, sans-serif"
                }}
            >
                Rio de vida
            </Typography>   
        </Grid>
        <Grid item xs={12} sm={12} md={2}></Grid>
        <Grid item xs={12} sm={12} md={2}>
            <Typography
                style={{
                    fontSize: 24,
                    color: "white",
                    fontWeight: 'bold',
                    fontFamily:"Verdana, Arial, Helvetica, sans-serif"
                }}
            >
                Cultos
            </Typography>  
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
            <Typography
                style={{
                    fontSize: 24,
                    color: "white",
                    fontWeight: 'bold',
                    fontFamily:"Verdana, Arial, Helvetica, sans-serif"
                }}
            >
                Sobre nós
            </Typography>  
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
            <Typography
                style={{
                    fontSize: 24,
                    color: "white",
                    fontWeight: 'bold',
                    fontFamily:"Verdana, Arial, Helvetica, sans-serif"
                }}
            >
                Fale conosco
            </Typography>  
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
            <Typography
                style={{
                    fontSize: 24,
                    color: "white",
                    fontWeight: 'bold',
                    fontFamily:"Verdana, Arial, Helvetica, sans-serif"
                }}
            >
                Onde estamos
            </Typography>  
        </Grid>
    </Grid>
  )
}
