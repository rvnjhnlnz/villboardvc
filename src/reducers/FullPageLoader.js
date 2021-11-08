import React from "react";
import Spinner from "../images/Spinner.gif";

const FullPageLoader = () => {
    return (
        <div className="fp-container">
            <img src={Spinner} className="fp-loader" alt="loading" />
        </div>
    );
};

export default FullPageLoader;