import React from 'react';
import Footer from '../../containers/Footer';
import NavigationBar from '../../containers/NavigationBar';
import BreadCrumbs from '../../containers/BreadCrumbs';
import Data from './Data';
import { Helmet } from "react-helmet";

function index(props) {
    return (
        <div className="bg-light">
            <Helmet>
                <title>Contact Us</title>
            </Helmet>
            <NavigationBar path={props.location.pathname} />
            {/* <BreadCrumbs path={props.location.pathname} /> */}
            <Data />
            <Footer />
        </div>
    );
}

export default index;