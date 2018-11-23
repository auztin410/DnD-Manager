import React from 'react';
import '../App.css';


const MonsterActions = props => (
<div className="displayItem">
            <h4>Actions</h4>
            {props.monster.actions.map(item => (
                <div>
                <p>Action: {item.name}</p>
                <p>Description: {item.desc}</p>
                <p>Attack Bonus: {item.attack_bonus}</p>
                <p>Damage Dice: {item.damage_dice}</p>
                <p>Damage Bonus: {item.damage_bonus}</p>
                </div>
            ))}
        </div>
);

export default MonsterActions;