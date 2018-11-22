import React from 'react';
import '../App.css';

const MonsterDetails = props => (

    <div className="monsterDetails">
        <div className="plaque">
        <h2>{props.monster.name}</h2>
        </div>
        <div className="monsterGrouping">
            <p>Size: {props.monster.size} | Type: {props.monster.type} | Subtype: {props.monster.subtype}</p>
            <p>Challenge Rating: {props.monster.challenge_rating} | Alignment: {props.monster.alignment}</p>
        </div>
        <div className="monsterGrouping">
            <h4>Base Stats</h4>
            <p>Strength: {props.monster.strength} | Dexterity: {props.monster.dexterity} | Constitution: {props.monster.constitution}</p>
            <p>Intelligence: {props.monster.intelligence} | Wisdom: {props.monster.wisdom} | Charisma: {props.monster.charisma}</p>
        </div>
        <div className="monsterGrouping">
            <h4>Additional Stats</h4>
            <p>Hit points: {props.monster.hit_points} | Hit dice: {props.monster.hit_dice}</p>
            <p>Speed: {props.monster.speed}</p>
        </div>

    </div>
)

export default MonsterDetails;