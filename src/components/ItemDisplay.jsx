import React from 'react';
import '../App.css';


const ItemDisplay = props => {
    let Item
    if (props.armor === true) {
        Item = <div>
            <span className="closeDisplayItem" onClick={this.handleCloseDisplayItem}>X</span>
            <h2>{props.Name}</h2>
        </div>
    }
    return (
    {Item}
    )
};

export default ItemDisplay;