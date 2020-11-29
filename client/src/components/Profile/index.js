import React from 'react';
import Footer from '../../containers/Footer';
import NavigationBar from '../../containers/NavigationBar';
import Data from './Data';
import { Helmet } from "react-helmet";

function index(props) {
    return (
        <div className="bg-light pt-5">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <NavigationBar path={props.location.pathname} />
            <Data />
            <Footer />
        </div>
    );
}

export default index;