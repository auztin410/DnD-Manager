import React from 'react';
import '../App.css';


const MonsterLegendary = props => (
    <div className="scrollDiv">
        <div className="plaque">
            <h4>Legendary Actions</h4>
        </div>
        <table className="monsterAction">
            <tbody>
                <tr>
                    <th className="profRow">Action</th>
                    <th className="profRow">Description</th>
                    <th className="profRow">Attack Bonus</th>
                    <th className="profRow">Damage Dice</th>
                    <th className="profRow">Damage Bonus</th>
                </tr>
                {props.monster.legendary_actions.map(item => (
                    <tr key={item.name}>
                        <td className="profRow">{item.name}</td>
                        <td className="profRow" id="descScroll">{item.desc}</td>
                        <td className="profRow">{item.attack_bonus}</td>
                        <td className="profRow">{item.damage_dice}</td>
                        <td className="profRow">{item.damage_bonus}</td>
                    </tr>
                ))}
            </tbody>
        </table>

            {/* {props.monster.legendary_actions.map(({ name, desc, attack_bonus, damage_dice, damage_bonus }) => (
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
        ))} */}
    </div>
);

export default MonsterLegendary;