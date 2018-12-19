import React , { Component } from 'react';
import RaceList from '../assets/Json/RaceList';
import BackgroundList from '../assets/Json/BackgroundList';

class CharacterCreation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characterName: "",
            characterRace: "",
            characterSubRace: "",
            characterClass: "",
            characterBackground: "",
            characterBackgroundSelected: null,
            characterPersonalityTrait1: "",
            characterPersonalityTrait2: "",
            characterIdeal: "",
            characterBond: "",
            characterFlaw: "",
            characterAlignment: "",
            characterSubRaceOptions: [],
            statRollsRandom: [],
            statRollsStandard: [],
        }

        this.handleGenerateStatRolls = this.handleGenerateStatRolls.bind(this);
        this.handleStandardSetStats = this.handleStandardSetStats.bind(this);
        this.handleChangeCharacterCreation = this.handleChangeCharacterCreation.bind(this);

    }

    DiceRoll(times, sides) {
        var allRolls = [];
        var i;
        for (i = 0; i < times; i++) {
            var roll = Math.floor(Math.random() * sides) + 1;
            allRolls.push(roll);
        }
        var result = allRolls.reduce(add, 0);
        function add(a, b) {
            return a + b;
        }
        // console.log(`Dice roll ${result}`);
        return result;
    };

    getSum(total, num) {
        return total + num;
    };

    handleGenerateStatRolls() {
        this.setState({
            statRollsRandom: [],
            statRollsStandard: [],
        });
        let allStatRolls = [];
        while (allStatRolls.length < 6) {
            let rolls = [];
            while (rolls.length < 4) {
                rolls.push(this.DiceRoll(1, 6))
            }
            rolls.sort();
            rolls.reverse();
            rolls.pop();
            let result = rolls.reduce(this.getSum);
            allStatRolls.push(result);
        }
        this.setState({
            statRollsRandom: allStatRolls,
        });
    };

    handleStandardSetStats() {
        this.setState({
            statRollsRandom: [],
            statRollsStandard: [15, 14, 13, 12, 10, 8],
        });

    };

    handleChangeCharacterCreation(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        let name = event.target.name;
        let value = event.target.value;
        let options;
        if (name === "characterRace") {
            switch (value) {
                default:
                    this.setState({
                        characterSubRaceOptions: [],
                    });
                    break;
                case ("dragonborn"):
                    options = RaceList.filter(obj => obj.Race === value);
                    this.setState({
                        characterSubRaceOptions: options,
                    });
                    break;
                case ("dwarf"):
                    options = RaceList.filter(obj => obj.Race === value);
                    this.setState({
                        characterSubRaceOptions: options,
                    });
                    break;
                case ("elf"):
                    options = RaceList.filter(obj => obj.Race === value);
                    this.setState({
                        characterSubRaceOptions: options,
                    });
                    break;
                case ("gnome"):
                    options = RaceList.filter(obj => obj.Race === value);
                    this.setState({
                        characterSubRaceOptions: options,
                    });
                    break;
                case ("halfling"):
                    options = RaceList.filter(obj => obj.Race === value);
                    this.setState({
                        characterSubRaceOptions: options,
                    });
                    break;
            }
        }
        else if (name === "characterBackground") {
            let selected;
            console.log(value);
            switch (value) {
                default: 
                selected = BackgroundList.find(item => item.BackgroundValue === value);
                this.setState({
                    characterBackgroundSelected: selected,
                });
                break;
                case (""):
                this.setState({
                    characterBackgroundSelected: null,
                    characterPersonalityTrait1: "",
                    characterPersonalityTrait2: "",
                    characterIdeal: "",
                    characterBond: "",
                    characterFlaw: "",
                });
                break;
            }
        }
    };

    render() {
        return (
        <div className="visible">
                            <button onClick={this.handleSpellClick}>Random Spell Console</button>

                            <h2>Character's Name</h2><input onChange={this.handleChangeCharacterCreation} type="text" name="characterName" />
                            <h4>Race</h4>
                            <select onChange={this.handleChangeCharacterCreation} name="characterRace">
                                <option value="">None Selected</option>
                                <option value="dragonborn">Dragonborn</option>
                                <option value="dwarf">Dwarf</option>
                                <option value="elf">Elf</option>
                                <option value="gnome">Gnome</option>
                                <option value="half elf">Half Elf</option>
                                <option value="half orc">Half Orc</option>
                                <option value="halfling">Halfling</option>
                                <option value="human">Human</option>
                                <option value="tiefling">Tiefling</option>
                            </select>
                            {(this.state.characterSubRaceOptions.length > 0)
                                ?
                                <div>
                                    <h4>Sub Race</h4>
                                    <select onChange={this.handleChangeCharacterCreation} name="characterSubRace">
                                    <option value="">None Selected</option>
                                        {this.state.characterSubRaceOptions.map(item => (
                                            <option key={item.SubRaceValue} value={item.SubRaceValue}>{item.SubRaceName}</option>
                                        ))}
                                    </select>
                                </div>
                                : null
                            }
                            <h4>Class</h4>
                            <select onChange={this.handleChangeCharacterCreation} name="characterClass">
                                <option value="">None Selected</option>
                                <option value="barbarian">Barbarian</option>
                                <option value="bard">Bard</option>
                                <option value="cleric">Cleric</option>
                                <option value="druid">Druid</option>
                                <option value="fighter">Fighter</option>
                                <option value="monk">Monk</option>
                                <option value="paladin">Paladin</option>
                                <option value="ranger">Ranger</option>
                                <option value="rogue">Rogue</option>
                                <option value="sorcerer">Sorcerer</option>
                                <option value="warlock">Warlock</option>
                                <option value="wizard">Wizard</option>
                            </select>
                            <br />
                            <br />
                            {(this.state.statRollsRandom.length > 0)
                                ?
                                <div>
                                    <h4>Random Set</h4>
                                    <span>{this.state.statRollsRandom[0]}, {this.state.statRollsRandom[1]}, {this.state.statRollsRandom[2]}, {this.state.statRollsRandom[3]}, {this.state.statRollsRandom[4]}, {this.state.statRollsRandom[5]}</span>
                                </div>
                                : null
                            }
                            {(this.state.statRollsStandard.length > 0)
                                ?
                                <div>
                                    <h4>Standard Set</h4>
                                    <span>{this.state.statRollsStandard[0]}, {this.state.statRollsStandard[1]}, {this.state.statRollsStandard[2]}, {this.state.statRollsStandard[3]}, {this.state.statRollsStandard[4]}, {this.state.statRollsStandard[5]}</span>
                                </div>
                                : null
                            }
                            <br />
                            <button onClick={this.handleGenerateStatRolls}>Random</button> {" "} <button onClick={this.handleStandardSetStats}>Standard Set</button>
                            <br />
                            <select onChange={this.handleChangeCharacterCreation} name="characterBackground">
                                <option value="">None Selected</option>
                                <option value="acolyte">Acolyte</option>
                                <option value="charlatan">Charlatan</option>
                                <option value="criminal">Criminal</option>
                                <option value="entertainer">Entertainer</option>
                                <option value="folk hero">Folk Hero</option>
                                <option value="guild artisan">Guild Artisan</option>
                                <option value="hermit">Hermit</option>
                                <option value="noble">Noble</option>
                                <option value="outlander">Outlander</option>
                                <option value="sage">Sage</option>
                                <option value="sailor">Sailor</option>
                                <option value="soldier">Soldier</option>
                                <option value="urchin">Urchin</option>
                            </select>
                            {(this.state.characterBackground === "")
                            ? null
                            : 
                            <div>
                                <h4>Description</h4>
                                {this.state.characterBackgroundSelected.Description.map(item => (
                                    <p key={item}>{item}</p>
                                ))}
                                <h4>Skills</h4>
                                {this.state.characterBackgroundSelected.Skills.map(item => (
                                    <p key={item}>{item}</p>
                                ))}
                                {(this.state.characterBackgroundSelected.Tools.length > 0)
                                ?
                                <div>
                                    <h4>Tools</h4>
                                    {this.state.characterBackgroundSelected.Tools.map(item => (
                                        <p key={item}>{item}</p>
                                    ))}
                                </div>
                                : null
                                }
                                {(this.state.characterBackgroundSelected.Languages.length > 0)
                                ?
                                <div>
                                    <h4>Languages</h4>
                                    <p>{this.state.characterBackgroundSelected.Languages[0]}</p>
                                </div>
                                : null
                                }
                                <h4>Equipment</h4>
                                {this.state.characterBackgroundSelected.Equipment.map(item => (
                                    <p key={item}>{item}</p>
                                ))}
                                <h4>Starting Currency: {this.state.characterBackgroundSelected.Currency} GP</h4>
                                <h4>Feature: {this.state.characterBackgroundSelected.FeatureName}</h4>
                                {this.state.characterBackgroundSelected.Feature.map(item => (
                                    <p key={item}>{item}</p>
                                ))}
                                <h4>Personality Traits</h4>
                                <select onChange={this.handleChangeCharacterCreation} name="characterPersonalityTrait1">
                                <option value="">None Selected</option>
                                {this.state.characterBackgroundSelected.PersonalityTraits.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                                </select>
                                <select onChange={this.handleChangeCharacterCreation} name="characterPersonalityTrait2">
                                <option value="">None Selected</option>
                                {this.state.characterBackgroundSelected.PersonalityTraits.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                                </select> 
                                <h4>Ideals</h4>
                                <select onChange={this.handleChangeCharacterCreation} name="characterIdeal">
                                <option value="">None Selected</option>
                                {this.state.characterBackgroundSelected.Ideals.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                                </select>
                                <h4>Bond</h4>
                                <select onChange={this.handleChangeCharacterCreation} name="characterBond">
                                <option value="">None Selected</option>
                                {this.state.characterBackgroundSelected.Bonds.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                                </select>
                                <h4>Flaw</h4>
                                <select onChange={this.handleChangeCharacterCreation} name="characterFlaw">
                                <option value="">None Selected</option>
                                {this.state.characterBackgroundSelected.Flaws.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                                </select>
                            </div>
                            }
                            <br />
                            <select onChange={this.handleChangeCharacterCreation} name="characterAlignment">
                                <option value="">None Selected</option>
                                <option value="lawful good">Lawful Good</option>
                                <option value="neutral good">Neutral Good</option>
                                <option value="chaotic good">Chaotic Good</option>
                                <option value="lawful neutral">Lawful Neutral</option>
                                <option value="neutral">Neutral</option>
                                <option value="chaotic neutral">Chaotic Neutral</option>
                                <option value="lawful evil">Lawful Evil</option>
                                <option value="neutral evil">Neutral Evil</option>
                                <option value="chaotic evil">Chaotic Evil</option>
                            </select>
                        </div>
                        )
    }
}

export default CharacterCreation;