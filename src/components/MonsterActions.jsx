import React from 'react';
import '../App.css';


const MonsterActions = props => (
    <div className="scrollDiv">
        <div className="plaque">
            <h4>Actions</h4>
        </div>
        {/* {props.monster.actions.map(({ name, desc, attack_bonus, damage_dice, damage_bonus }) => (
            <div key={name} className="monsterGrouping">
                <p>Action: {name}</p>
                <p>Description: {desc}</p>
                <p>Attack Bonus: {attack_bonus}</p>
                {damage_dice && <p>Damage Dice: {damage_dice}</p>}
                {damage_bonus && <p>Damage Bonus: {damage_bonus}</p>}
            </div>
        ))} */}

        {props.monster.actions.map(({ name, desc, attack_bonus, damage_dice, damage_bonus }) => (
            <div key={name} className="monsterGrouping">
            <table>
                <tr>
                    <th className="profRow">Action</th>
                    <th className="profRow">Description</th>
                    <th className="profRow">Attack Bonus</th>
                    {damage_dice && <th className="profRow">Damage Dice</th>}
                    {damage_bonus && <th className="profRow">Damage Bonus</th>}
                </tr>
                <tr>
                    <td className="profRow">{name}</td>
                    <td className="profRow">{desc}</td>
                    <td className="profRow">{attack_bonus}</td>
                    {damage_dice && <td className="profRow">{damage_dice}</td>}
                    {damage_bonus && <td className="profRow">{damage_bonus}</td>}
                </tr>
            </table>
            </div>
        ))}
    </div>

);

export default MonsterActions;