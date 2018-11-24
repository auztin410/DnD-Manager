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
            <p>Size: {props.monster.size} | Type: {props.monster.type} | Subtype: {props.monster.subtype}</p>
            <p>Challenge Rating: {props.monster.challenge_rating} | Alignment: {props.monster.alignment}</p>
            <p>Sense: {props.monster.senses}</p>
            {(props.monster.languages)
                ?
                <p>Languages: {props.monster.languages}</p>
                : null
            }
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
        {(props.monster.damage_vulnerabilities === "" && props.monster.damage_resistances === "" && props.monster.damage_immunities === "" && props.monster.condition_immunities === "")
            ? null
            :
            <div className="monsterGrouping">
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

        {(props.monster.strength_save | props.monster.dexterity_save | props.monster.constitution_save | props.monster.intelligence_save | props.monster.wisdom_save | props.monster.charisma_save)
            ?
            <div className="monsterGrouping">
                <h4>Saving Throws</h4>
                {(props.monster.strength_save)
                    ?
                    <p>Strength: {props.monster.strength_save}</p>
                    : null
                }
                {(props.monster.dexterity_save)
                    ?
                    <p>Dexterity: {props.monster.dexterity_save}</p>
                    : null
                }
                {(props.monster.constitution_save)
                    ?
                    <p>Constitution: {props.monster.constitution_save}</p>
                    : null
                }
                {(props.monster.intelligence_save)
                    ?
                    <p>Intelligence: {props.monster.intelligence_save}</p>
                    : null
                }
                {(props.monster.wisdom_save)
                    ?
                    <p>Wisdom: {props.monster.wisdom_save}</p>
                    : null
                }
                {(props.monster.charisma_save)
                    ?
                    <p>Charisma: {props.monster.charisma_save}</p>
                    : null
                }
            </div>
            : null
        }
        {(props.monster.athletics | props.monster.acrobatics | props.monster.stealth | props.monster.arcana | props.monster.history | props.monster.investigation | props.monster.nature | props.monster.religion | props.monster.insight | props.monster.medicine | props.monster.perception | props.monster.survival | props.monster.deception | props.monster.intimidation | props.monster.performance | props.monster.persuasion)
            ?
            <div className="monsterGrouping">
                <h4>Skills</h4>
                {(props.monster.athletics)
                    ?
                    <p>Athletics: {props.monster.athletics}</p>
                    : null
                }
                {(props.monster.acrobatics)
                    ?
                    <p>Acrobatics: {props.monster.acrobatics}</p>
                    : null
                }
                {(props.monster.stealth)
                    ?
                    <p>Stealth: {props.monster.stealth}</p>
                    : null
                }
                {(props.monster.arcana)
                    ?
                    <p>Arcana: {props.monster.arcana}</p>
                    : null
                }
                {(props.monster.history)
                    ?
                    <p>History: {props.monster.history}</p>
                    : null
                }
                {(props.monster.investigation)
                    ?
                    <p>Investigation: {props.monster.investigation}</p>
                    : null
                }
                {(props.monster.nature)
                    ?
                    <p>Nature: {props.monster.nature}</p>
                    : null
                }
                {(props.monster.religion)
                    ?
                    <p>Religion: {props.monster.religion}</p>
                    : null
                }
                {(props.monster.insight)
                    ?
                    <p>Insight: {props.monster.insight}</p>
                    : null
                }
                {(props.monster.medicine)
                    ?
                    <p>Medicine: {props.monster.medicine}</p>
                    : null
                }
                {(props.monster.perception)
                    ?
                    <p>Perception: {props.monster.perception}</p>
                    : null
                }
                {(props.monster.survival)
                    ?
                    <p>Survival: {props.monster.survival}</p>
                    : null
                }
                {(props.monster.deception)
                    ?
                    <p>Deception: {props.monster.deception}</p>
                    : null
                }
                {(props.monster.intimidation)
                    ?
                    <p>Intimidation: {props.monster.intimidation}</p>
                    : null
                }
                {(props.monster.performance)
                    ?
                    <p>Performance: {props.monster.performance}</p>
                    : null
                }
                {(props.monster.persuasion)
                    ?
                    <p>Persuasion: {props.monster.persuasion}</p>
                    : null
                }
            </div>
            : null
        }
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