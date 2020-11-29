import React from 'react';
import { Link } from 'react-router-dom';

function BreadCrumbs(props) {

    const title = () => {
        var sentence = props.path;
        if (props.path === "/contact" || props.path === "/about")
            sentence = sentence[1].toUpperCase() + sentence.slice(2) + " Us";
        else
            sentence = sentence[1].toUpperCase() + sentence.slice(2, -2) + " " + sentence[5].toUpperCase() + sentence.slice(6);
            
        return sentence;
    }
    var page = title()

    return (
        <div className="container">
            <div className="row">
                <ol className="col-12 breadcrumb my-4">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={props.path}>{page}</Link>
                    </li>
                </ol>
                <div className="col-12">
                    <h3>{page}</h3>
                    <hr />
                </div>
            </div>
        </div >
    );
}

export default BreadCrumbs;