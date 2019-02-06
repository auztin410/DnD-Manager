import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MonsterActions from './MonsterActions';
import MonsterSpecialAbilities from './MonsterSpecialAbilities';
import MonsterLegendary from './MonsterLegendary';

const MonsterDetails = props => (

    <div className="monsterDetails">
        <div className="plaque">
            <h2>{props.monster.name}</h2>
            {/* <span onClick={props.action}><FontAwesomeIcon icon="dice"/></span> */}
        </div>
        <div className="monsterGrouping">
            <p>Size: {props.monster.size} | Type: {props.monster.type} {(props.monster.subtype === "") ? null : <span>| Subtype: {props.monster.subtype}</span> } </p>
            <p>Challenge Rating: {props.monster.challenge_rating} | Alignment: {props.monster.alignment}</p>
            <p>Sense: {props.monster.senses}</p>
            {(props.monster.languages)
                ?
                <p>Languages: {props.monster.languages}</p>
                : null
            }
            <br/>
            <h4>Base Stats</h4>
            <table>
                <tr>
                    <th className="profRow">Str</th>
                    <th className="profRow">Dex</th>
                    <th className="profRow">Con</th>
                    <th className="profRow">Int</th>
                    <th className="profRow">Wis</th>
                    <th className="profRow">Cha</th>
                </tr>
                <tr>
                    <td className="profRow">{props.monster.strength}</td>
                    <td className="profRow">{props.monster.dexterity}</td>
                    <td className="profRow">{props.monster.constitution}</td>
                    <td className="profRow">{props.monster.intelligence}</td>
                    <td className="profRow">{props.monster.wisdom}</td>
                    <td className="profRow">{props.monster.charisma}</td>
                </tr>
            </table>
            <br/>
            <h4>Additional Stats</h4>
            <table>
                <tr>
                    <th className="profRow">Hit Points</th>
                    <th className="profRow">Hit Dice</th>
                    <th className="profRow">Speed</th>
                </tr>
                <tr>
                    <td className="profRow">{props.monster.hit_points}</td>
                    <td className="profRow">{props.monster.hit_dice}</td>
                    <td className="profRow">{props.monster.speed}</td>
                </tr>
            </table>
            <br/>
            {(props.monster.damage_vulnerabilities === "" && props.monster.damage_resistances === "" && props.monster.damage_immunities === "" && props.monster.condition_immunities === "")
            ? null
            :
            <div className="basicBorder">
                <h4>Resistances and Weaknesses</h4>
                {(props.monster.damage_vulnerabilities)
                    ?
                    <p>Vulnerabilities: {props.monster.damage_vulnerabilities}</p>
                    : null}
                {(props.monster.damage_resistances)
                    ?
                    <p>Resistances: {props.monster.damage_resistances}</p>
                    : null}
                {(props.monster.damage_immunities)
                    ?
                    <p>Immunities: {props.monster.damage_immunities}</p>
                    : null}
                {(props.monster.condition_immunities)
                    ?
                    <p>Condition Immunities: {props.monster.condition_immunities}</p>
                    : null}
            </div>
        }
        <br/>
        {(props.monster.strength_save | props.monster.dexterity_save | props.monster.constitution_save | props.monster.intelligence_save | props.monster.wisdom_save | props.monster.charisma_save)
            ?
                <table>
                    <caption>Saving Throws</caption>
                    <tr>
                        {(props.monster.strength_save) ? <th className="profRow">Strength</th> : null}
                        {(props.monster.dexterity_save) ? <th className="profRow">Dexterity</th> : null}
                        {(props.monster.constitution_save) ? <th className="profRow">Constitution</th> : null}
                        {(props.monster.intelligence_save) ? <th className="profRow">Intelligence</th> : null}
                        {(props.monster.wisdom_save) ? <th className="profRow">Wisdom</th> : null}
                        {(props.monster.charisma_save) ? <th className="profRow">Charisma</th> : null}
                    </tr>
                    <tr>
                        {(props.monster.strength_save) ? <td className="profRow">{props.monster.strength_save}</td> : null}
                        {(props.monster.dexterity_save) ? <td className="profRow">{props.monster.dexterity_save}</td> : null}
                        {(props.monster.constitution_save) ? <td className="profRow">{props.monster.constitution_save}</td> : null}
                        {(props.monster.intelligence_save) ? <td className="profRow">{props.monster.intelligence_save}</td> : null}
                        {(props.monster.wisdom_save) ? <td className="profRow">{props.monster.wisdom_save}</td> : null}
                        {(props.monster.charisma_save) ? <td className="profRow">{props.monster.charisma_save}</td> : null}
                    </tr>
                </table>
            : null
        }
        <br/>
        {(props.monster.athletics | props.monster.acrobatics | props.monster.stealth | props.monster.arcana | props.monster.history | props.monster.investigation | props.monster.nature | props.monster.religion | props.monster.insight | props.monster.medicine | props.monster.perception | props.monster.survival | props.monster.deception | props.monster.intimidation | props.monster.performance | props.monster.persuasion)
            ?
            <table>
                <caption>Skills</caption>
                    <tr>
                        {(props.monster.athletics) ? <th className="profRow">Athletics</th> : null}
                        {(props.monster.acrobatics) ? <th className="profRow">Acrobatics</th> : null}
                        {(props.monster.stealth) ? <th className="profRow">Stealth</th> : null}
                        {(props.monster.arcana) ? <th className="profRow">Arcana</th> : null}
                        {(props.monster.history) ? <th className="profRow">History</th> : null}
                        {(props.monster.investigation) ? <th className="profRow">Investigation</th> : null}
                        {(props.monster.nature) ? <th className="profRow">Nature</th> : null}
                        {(props.monster.religion) ? <th className="profRow">Religion</th> : null}
                        {(props.monster.insight) ? <th className="profRow">Insight</th> : null}
                        {(props.monster.medicine) ? <th className="profRow">Medicine</th> : null}
                        {(props.monster.perception) ? <th className="profRow">Perception</th> : null}
                        {(props.monster.survival) ? <th className="profRow">Survival</th> : null}
                        {(props.monster.deception) ? <th className="profRow">Deception</th> : null}
                        {(props.monster.intimidation) ? <th className="profRow">Intimidation</th> : null}
                        {(props.monster.performance) ? <th className="profRow">Performance</th> : null}
                        {(props.monster.persuasion) ? <th className="profRow">Persuasion</th> : null}
                    </tr>
                    <tr>
                    {(props.monster.athletics) ? <td className="profRow">{props.monster.athletics}</td> : null}
                        {(props.monster.acrobatics) ? <td className="profRow">{props.monster.acrobatics}</td> : null}
                        {(props.monster.stealth) ? <td className="profRow">{props.monster.stealth}</td> : null}
                        {(props.monster.arcana) ? <td className="profRow">{props.monster.arcana}</td> : null}
                        {(props.monster.history) ? <td className="profRow">{props.monster.history}</td> : null}
                        {(props.monster.investigation) ? <td className="profRow">{props.monster.investigation}</td> : null}
                        {(props.monster.nature) ? <td className="profRow">{props.monster.nature}</td> : null}
                        {(props.monster.religion) ? <td className="profRow">{props.monster.religion}</td> : null}
                        {(props.monster.insight) ? <td className="profRow">{props.monster.insight}</td> : null}
                        {(props.monster.medicine) ? <td className="profRow">{props.monster.medicine}</td> : null}
                        {(props.monster.perception) ? <td className="profRow">{props.monster.perception}</td> : null}
                        {(props.monster.survival) ? <td className="profRow">{props.monster.survival}</td> : null}
                        {(props.monster.deception) ? <td className="profRow">{props.monster.deception}</td> : null}
                        {(props.monster.intimidation) ? <td className="profRow">{props.monster.intimidation}</td> : null}
                        {(props.monster.performance) ? <td className="profRow">{props.monster.performance}</td> : null}
                        {(props.monster.persuasion) ? <td className="profRow">{props.monster.persuasion}</td> : null}
                    </tr>
                </table>
            : null
        }
        <br/>
        </div>
        <MonsterActions monster={props.monster} />
        {(props.monster.special_abilities)
            ?
            <MonsterSpecialAbilities monster={props.monster} />
            : null
        }
        {(props.monster.legendary_actions)
            ?
            <MonsterLegendary monster={props.monster} />
            : null
        }

    </div>
)

export default MonsterDetails;