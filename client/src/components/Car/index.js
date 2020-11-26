import React from 'react';
import Footer from '../../containers/Footer';
import NavigationBar from '../../containers/NavigationBar';
import { Helmet } from "react-helmet";
import Data from './Data';

function index(props) {
    return (
        <div className="bg-light">
            <Helmet>
                <title>Car</title>
            </Helmet>
            <NavigationBar path={props.location.pathname} />
            <Data />
            <Footer />
        </div>
    );
}

export default index;