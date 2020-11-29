import React from 'react';
import BreadCrumbs from '../../containers/BreadCrumbs';
import Footer from '../../containers/Footer';
import NavigationBar from '../../containers/NavigationBar';
import Data from './Data';
import { Helmet } from "react-helmet";


function index(props) {
    


    return (
        <div className="bg-light">
            <Helmet>
                <title>Car Lifecycle Blockchain Network</title>
            </Helmet>
            <NavigationBar path={props.location.pathname} />
            
            {/* <BreadCrumbs path={props.location.pathname} /> */}
            <Data />
            <Footer />
        </div>
    );
}

export default index;