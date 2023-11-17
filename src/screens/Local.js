import React from 'react';
import styles from './Local.module.css';
import GoogleMapReact from 'google-map-react'
import { Image } from '@mantine/core';

export default function Local(){
    const AnyReactComponent = ({ text }) => <div>
        <Image
            src="../../pin-default.png"
            className={styles.image}
            alt=""
        /> 
        {text}
    </div>;

    const defaultProps = {
        center: {
          lat: -20.275930,
          lng: -40.291750
        },
        zoom: 15,
        keyApi: "AIzaSyAW6IG6xka94lTuzPw10aiR8sb0tFzzo0Y"
    };

    return <section className={styles.container} id="local">
        <div className={styles.whiteBox}>
            <div className={styles.containerText}>
                <div className={styles.textTitle}>Cerimônia & Festa!</div>
                <div className={styles.subTitle}>17 de agosto de 2024 - 17h00</div>
                <div className={styles.text}>
                    Parque Pedra da Cebola
                    R. Ana Viêira Mafra, s/n - Mata da Praia, Vitória - ES, 29066-010
                </div>
                <a 
                    target="_blank" 
                    className={styles.direcao}
                    href="https://www.google.com/maps/place/Parque+Pedra+da+Cebola/@-20.2769946,-40.2980994,18z/data=!4m15!1m8!3m7!1s0xb81804ad481d6f:0x71875203a67637ac!2sParque+Pedra+da+Cebola!8m2!3d-20.2765669!4d-40.2977346!10e1!16s%2Fg%2F11b7005129!3m5!1s0xb81804ad481d6f:0x71875203a67637ac!8m2!3d-20.2765669!4d-40.2977346!16s%2Fg%2F11b7005129" 
                >
                    Abrir localização (Google maps)
                </a>
            </div>

            <div className={styles.divMapa}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: defaultProps.keyApi }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                >
                    <AnyReactComponent
                        lat={-20.275930}
                        lng={-40.291750}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </div>
    </section> 
}
