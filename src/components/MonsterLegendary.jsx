import React from 'react';
import '../App.css';


const MonsterLegendary = props => (
    <div className="scrollDiv">
        <div className="plaque">
            <h4>Legendary Actions</h4>
        </div>
        {props.monster.legendary_actions.map(({name, desc, attack_bonus, damage_dice, damage_bonus}) => (
                <div className="monsterGrouping">
                <p>Action: {name}</p>
                <p>Description: {desc}</p>
                <p>Attack Bonus: {attack_bonus}</p>
                {damage_dice && <p>Damage Dice: {damage_dice}</p>}
                {damage_bonus && <p>Damage Bonus: {damage_bonus}</p>}
                </div>
            ))}
    </div>
);

export default MonsterLegendary;