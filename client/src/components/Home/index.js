import React from 'react';
import { Helmet } from 'react-helmet';
import Body from '../../containers/Body';
import Footer from '../../containers/Footer';
import NavigationBar from "../../containers/NavigationBar"

function Home(props) {
    return (
        <div>
            <Helmet>
                <title>Car Lifecycle Blockchain Network</title>
            </Helmet>
            <NavigationBar path={props.location.pathname}/>
            <Body />
            <Footer />
        </div>
    );
}

export default Home;