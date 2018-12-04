import React from 'react';
import '../App.css';


const MonsterActions = props => (
<div className="scrollDiv">
        <div className="plaque">
            <h4>Actions</h4>
        </div>
            {props.monster.actions.map(({name, desc, attack_bonus, damage_dice, damage_bonus}) => (
                <div key={name} className="monsterGrouping">
                <p>Action: {name}</p>
                <p>Description: {desc}</p>
                <p>Attack Bonus: {attack_bonus}</p>
                {damage_dice && <p>Damage Dice: {damage_dice}</p>}
                {damage_bonus && <p>Damage Bonus: {damage_bonus}</p>}
                </div>
            ))}
        </div>
);

export default MonsterActions;