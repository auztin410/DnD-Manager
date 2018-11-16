import React from 'react';
import '../App.css';

const ItemDisplay = props => (

    <div className="displayItem">
    <span className="closeDisplayItem" onClick={this.handleCloseDisplayItem}>X</span>
    <h2>{props.Name}</h2>
    
    </div>
);

export default ItemDisplay;