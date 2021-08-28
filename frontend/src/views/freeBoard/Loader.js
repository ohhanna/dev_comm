import React from 'react';
import ReactLoading from 'react-loading';

const Loader = () => {
    return (
        <div class="contentWrap"> 
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}> 
                <ReactLoading type="spin" color="#3d66ba" height={30} width={30} timeout={3000}/> 
            </div> 
        </div>


    );
};

export default Loader;