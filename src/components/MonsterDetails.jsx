import React from 'react';
import '../App.css';

const MonsterDetails = props => (

    <div>
        <h2>{props.monster.name}</h2>
        <p>Size: {props.monster.size} | Type: {props.monster.type} | Subtype: {props.monster.subtype} | Alignment: {props.monster.alignment}</p>
        <p>Challenge Rating: {props.monster.challenge_rating} | Armor Class: {props.monster.armor_class}</p>
    </div>
)

export default MonsterDetails;