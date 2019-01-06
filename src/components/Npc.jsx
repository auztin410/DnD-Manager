import React from 'react';
import '../App.css';

const Npc = props => (

    <div className="npc">
            <table>
                <tr>
                    <td className="profRow">Name:</td>
                    <td className="profRow">{props.npc.name}</td>
                </tr>
                <tr>
                    <td className="profRow">Appearance:</td>
                    <td className="profRow">{props.npc.appearance}</td>
                </tr>
                <tr>
                    <td className="profRow">High Ability:</td>
                    <td className="profRow">{props.npc.highAbility}</td>
                </tr>
                <tr>
                    <td className="profRow">Low Ability:</td>
                    <td className="profRow">{props.npc.lowAbility}</td>
                </tr>
                <tr>
                    <td className="profRow">Talent:</td>
                    <td className="profRow">{props.npc.talents}</td>
                </tr>
                <tr>
                    <td className="profRow">Mannerism:</td>
                    <td className="profRow">{props.npc.mannerism}</td>
                </tr>
                <tr>
                    <td className="profRow">Trait:</td>
                    <td className="profRow">{props.npc.trait}</td>
                </tr>
                <tr>
                    <td className="profRow">Ideal:</td>
                    <td className="profRow">{props.npc.ideals}</td>
                </tr>
                <tr>
                    <td className="profRow">Bond:</td>
                    <td className="profRow">{props.npc.bonds}</td>
                </tr>
                <tr>
                    <td className="profRow">Flaws and Secrets</td>
                    <td className="profRow">{props.npc.flawsSecrets}</td>
                </tr>
            </table>
        </div>
);
        
    


export default Npc;