import React from 'react';
import '../App.css';

const WorldShakingEvent = props => {
    if(!props.worldShakingDetails) {
        return (
            <div className="bigEvent">
                <div className="container"><p className="property">{props.worldShakingEvent}</p></div>
            </div>
        )
    }
    else if(props.worldShakingDetails) {
        return (
            <div className="bigEvent">
                <div className="container"><p className="property">{props.worldShakingEvent}</p></div>
                <div className="container"><p className="property">{props.worldShakingDetails}</p></div>
            </div>
        )
    }
}

export default WorldShakingEvent;