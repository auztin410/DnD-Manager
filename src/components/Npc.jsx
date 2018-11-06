import React from 'react';
import '../App.css';

const Npc = props => (

    <div className="npc">
            <div className="container"><p className="property">Name: {props.npc.name}</p></div>
            <div className="container"><p className="property">Appearance: {props.npc.appearance}</p></div>
            <div className="container"><p className="property">High ability: {props.npc.highAbility}</p></div> 
            <div className="container"><p className="property">Low ability: {props.npc.lowAbility}</p></div>
            <div className="container"><p className="property">Talent: {props.npc.talents}</p></div>
            <div className="container"><p className="property">Mannerism: {props.npc.mannerism}</p></div>
            <div className="container"><p className="property">Trait: {props.npc.trait}</p></div>
            <div className="container"><p className="property">Ideal: {props.npc.ideals}</p></div>
            <div className="container"><p className="property">Bond: {props.npc.bonds}</p></div>
            <div className="container"><p className="property">Flaws and secret: {props.npc.flawsSecrets}</p></div>
        </div>
);
        
    


export default Npc;