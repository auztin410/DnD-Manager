import React, { Component } from 'react';
import RaceList from '../assets/Json/RaceList';
import BackgroundList from '../assets/Json/BackgroundList';
import Classes from '../assets/Json/Classes';
import Packs from '../assets/Json/EquipmentPacks';

class CharacterCreation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characterName: "",
            characterRace: "",
            characterSubRace: "",
            characterClass: "",
            characterClassSelected: null,
            classSkillChoice1: "",
            classSkillChoice2: "",
            classSkillChoice3: "",
            classSkillChoice4: "",
            startingChoice1: null,
            startingChoice2: null,
            packChoice: "",
            characterBackground: "",
            characterBackgroundSelected: null,
            characterPersonalityTrait1: "",
            characterPersonalityTrait2: "",
            characterIdeal: "",
            characterBond: "",
            characterFlaw: "",
            characterSpecialization: "",
            characterAlignment: "",
            characterSubRaceOptions: [],
            showDetails: false,
            statRolls: [],
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
            skills: []
        }

        this.handleGenerateStatRolls = this.handleGenerateStatRolls.bind(this);
        this.handleStandardSetStats = this.handleStandardSetStats.bind(this);
        this.handleChangeCharacterCreation = this.handleChangeCharacterCreation.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.handleStatChange = this.handleStatChange.bind(this);
        this.handleStatRemove = this.handleStatRemove.bind(this);
        this.handleSetSkills = this.handleSetSkills.bind(this);
        this.handleCreateCharacter = this.handleCreateCharacter.bind(this);

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
            statRolls: [],
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
            statRolls: allStatRolls,
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        });
    };

    handleStandardSetStats() {
        this.setState({
            statRolls: [15, 14, 13, 12, 10, 8],
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
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
        else if (name === "characterClass") {
            let selected;
            console.log(value);
            switch (value) {
                default:
                    selected = Classes.find(item => item.Name === value);
                    this.setState({
                        characterClassSelected: selected,
                    });
                    break;
                case (""):
                    this.setState({
                        characterClassSelected: null,
                    });
                    break;
            }
        }
    };

    handleDetails() {
        if (this.state.showDetails === true) {
            this.setState({
                showDetails: false,
            });
        }
        else if (this.state.showDetails === false) {
            this.setState({
                showDetails: true,
            });
        }
    };

    handleStatChange(event) {
        let value = event.target.value;
        let rolls = this.state.statRolls;
        console.log(`value: ${value}`);
        console.log(rolls);
        let index = rolls.findIndex(item => item == value);
        console.log(index);
        console.log(rolls[index]);
        rolls.splice(index, 1);
        this.setState({
            [event.target.name]: event.target.value,
            statRolls: rolls,
        });
    };

    handleStatRemove(event) {
        let name = event.target.id;
        let rolls = this.state.statRolls;
        let strength = this.state.strength;
        let dexterity = this.state.dexterity;
        let constitution = this.state.constitution;
        let intelligence = this.state.intelligence;
        let wisdom = this.state.wisdom;
        let charisma = this.state.charisma;
        switch (name) {
            case ("strength"):
                rolls.push(strength);
                this.setState({
                    statRolls: rolls,
                    strength: 0,
                });
                break;
            case ("dexterity"):
                rolls.push(dexterity);
                this.setState({
                    statRolls: rolls,
                    dexterity: 0,
                });
                break;
            case ("constitution"):
                rolls.push(constitution);
                this.setState({
                    statRolls: rolls,
                    constitution: 0,
                });
                break;
            case ("intelligence"):
                rolls.push(intelligence);
                this.setState({
                    statRolls: rolls,
                    intelligence: 0,
                });
                break;
            case ("wisdom"):
                rolls.push(wisdom);
                this.setState({
                    statRolls: rolls,
                    wisdom: 0,
                });
                break;
            case ("charisma"):
                rolls.push(charisma);
                this.setState({
                    statRolls: rolls,
                    charisma: 0,
                });
                break;
        }
    };

    handleSetSkills(arr){
        this.setState({
            skills: arr,
        }, () => {
            let character = {
                name: this.state.characterName,
                race: this.state.characterRace,
                subRace: this.state.characterSubRace,
                job: this.state.characterClass,
                weaponProf: this.state.characterClassSelected.Weapon,
                armorProf: this.state.characterClassSelected.Armor,
                toolProf: this.state.characterClassSelected.Tools,
                savingThrows: this.state.characterClassSelected.SavingThrows,
                strength: this.state.strength,
                dexterity: this.state.dexterity,
                constitution: this.state.constitution,
                intelligence: this.state.intelligence,
                wisdom: this.state.wisdom,
                charisma: this.state.charisma,
                skills: this.state.skills
            }
            console.log(character);
        });
    };

    handleCreateCharacter() {
        let allItems = [];
        let unpack = [];


        if (this.state.characterClassSelected.Pack.length === 1) {
            this.setState({
                packChoice: this.state.characterClassSelected.Pack[0],
            }, () => {
                let found = Packs.find(item => (item.Name = this.state.packChoice));
                found.Items.map(item => (
                    unpack.push(item)
                ));
                let choice1 = this.state.startingChoice1;
                let choice1Found = this.state.characterClassSelected.StartingChoices1.find(item => (item.Name === choice1));
                console.log(choice1Found);
                let choice2 = this.state.startingChoice2;
                let choice2Found = this.state.characterClassSelected.StartingChoices2.find(item => (item.Name === choice2));
                console.log(choice2Found);
                let backgroundItems = this.state.characterBackgroundSelected.Equipment;
                let classItems = this.state.characterClassSelected.Equipment;
                console.log(classItems);
                allItems = unpack.concat(choice1Found, choice2Found, backgroundItems, classItems);
                
                console.log("All Items");
                console.log(allItems);
            });
        }
        else {
            let found = Packs.find(item => (item.Name = this.state.packChoice));
            found.Items.map(item => (
                unpack.push(item)
            ));
            let choice1 = this.state.startingChoice1;
            let choice1Found = this.state.characterClassSelected.StartingChoices1.find(item => (item.Name === choice1));
            console.log(choice1Found);
            let choice2 = this.state.startingChoice2;
            let choice2Found = this.state.characterClassSelected.StartingChoices2.find(item => (item.Name === choice2));
            console.log(choice2Found);
            let backgroundItems = this.state.characterBackgroundSelected.Equipment;
            let classItems = this.state.characterClassSelected.Equipment;
            console.log(classItems);
            allItems = unpack.concat(choice1Found, choice2Found, backgroundItems, classItems);

            console.log("All Items");
            console.log(allItems);
        }

        switch(this.state.characterClassSelected.Skills){
            case 2:
            let skills = [this.state.classSkillChoice1, this.state.classSkillChoice2];
            this.handleSetSkills(skills);
            break;
            case 3:
            skills = [this.state.classSkillChoice1, this.state.classSkillChoice2, this.state.classSkillChoice3];
            this.handleSetSkills(skills);
            break;
            case 4:
            skills = [this.state.classSkillChoice1, this.state.classSkillChoice2, this.state.classSkillChoice3, this.state.classSkillChoice4];
            this.handleSetSkills(skills);
            break;
        }
        
    };

    render() {
        return (
            <div id="characterCreation">
                <span>Name{" "}<input onChange={this.handleChangeCharacterCreation} type="text" name="characterName" className="customSelect" /></span>
                <br />
                <span>Race{" "}<select onChange={this.handleChangeCharacterCreation} name="characterRace" className="customSelect">
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
                </select></span>

                {(this.state.characterSubRaceOptions.length > 0)
                    ?
                    <span>Sub Race
                        <select onChange={this.handleChangeCharacterCreation} name="characterSubRace" className="customSelect">
                            <option value="">None Selected</option>
                            {this.state.characterSubRaceOptions.map(item => (
                                <option key={item.SubRaceValue} value={item.SubRaceValue}>{item.SubRaceName}</option>
                            ))}
                        </select>
                    </span>
                    : null
                }
                <br />
                <span>Class
                <select onChange={this.handleChangeCharacterCreation} name="characterClass" className="customSelect">
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
                </span>
                <br />
                {(this.state.characterClassSelected)
                    ?
                    <div>
                        <h4>Proficiencies</h4>
                        <br />
                        <table className="proficiencyTable">
                            <tbody>
                                <tr className="profRow">
                                    <th className="profRow">Weapons</th>
                                    {this.state.characterClassSelected.Weapon.map(item => (
                                        <td key={item} className="profRow">{item}</td>
                                    ))}
                                </tr>
                                <tr className="profRow">
                                    <th className="profRow">Armor</th>
                                    {this.state.characterClassSelected.Armor.map(item => (
                                        <td key={item} className="profRow">{item}</td>
                                    ))}
                                </tr>
                                {(this.state.characterClassSelected.Tools.length > 0)
                                    ?
                                    <tr className="profRow">
                                        <th className="profRow">Tools</th>
                                        {this.state.characterClassSelected.Tools.map(item => (
                                            <td key={item} className="profRow">{item}</td>
                                        ))}
                                    </tr>
                                    : null
                                }
                                <tr className="profRow">
                                    <th className="profRow">Saving Throws</th>
                                    {this.state.characterClassSelected.SavingThrows.map(item => (
                                        <td key={item} className="profRow">{item}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <span>Skills
                        {(this.state.characterClassSelected.Skills === 2)
                                ?
                                <span>
                                    <select onChange={this.handleChangeCharacterCreation} name="classSkillChoice1" className="customSelect">
                                        <option value="">None Selected</option>
                                        {this.state.characterClassSelected.SkillChoices.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                    <select onChange={this.handleChangeCharacterCreation} name="classSkillChoice2" className="customSelect">
                                        <option value="">None Selected</option>
                                        {this.state.characterClassSelected.SkillChoices.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                </span>
                                : null
                            }
                            {(this.state.characterClassSelected.Skills === 3)
                                ?
                                <span>
                                    <select onChange={this.handleChangeCharacterCreation} name="classSkillChoice1" className="customSelect">
                                        <option value="">None Selected</option>
                                        {this.state.characterClassSelected.SkillChoices.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                    <select onChange={this.handleChangeCharacterCreation} name="classSkillChoice2" className="customSelect">
                                        <option value="">None Selected</option>
                                        {this.state.characterClassSelected.SkillChoices.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                    <select onChange={this.handleChangeCharacterCreation} name="classSkillChoice3" className="customSelect">
                                        <option value="">None Selected</option>
                                        {this.state.characterClassSelected.SkillChoices.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                </span>
                                : null
                            }
                            {(this.state.characterClassSelected.Skills === 4)
                                ?
                                <span>
                                    <select onChange={this.handleChangeCharacterCreation} name="classSkillChoice1" className="customSelect">
                                        <option value="">None Selected</option>
                                        {this.state.characterClassSelected.SkillChoices.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                    <select onChange={this.handleChangeCharacterCreation} name="classSkillChoice2" className="customSelect">
                                        <option value="">None Selected</option>
                                        {this.state.characterClassSelected.SkillChoices.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                    <select onChange={this.handleChangeCharacterCreation} name="classSkillChoice3" className="customSelect">
                                        <option value="">None Selected</option>
                                        {this.state.characterClassSelected.SkillChoices.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                    <select onChange={this.handleChangeCharacterCreation} name="classSkillChoice3" className="customSelect">
                                        <option value="">None Selected</option>
                                        {this.state.characterClassSelected.SkillChoices.map(item => (
                                            <option value={item} key={item}>{item}</option>
                                        ))}
                                    </select>
                                </span>
                                : null
                            }
                        </span>
                        <br />
                        <span>Weapon Choices
                        <select onChange={this.handleChangeCharacterCreation} name="startingChoice1" className="customSelect">
                                <option value="">None Selected</option>
                                {this.state.characterClassSelected.StartingChoices1.map(item => (
                                    <option value={item.Name} key={item.Name}>{item.Count} X {item.Name}</option>
                                ))}
                            </select>
                            <select onChange={this.handleChangeCharacterCreation} name="startingChoice2" className="customSelect">
                                <option value="">None Selected</option>
                                {this.state.characterClassSelected.StartingChoices2.map(item => (
                                    <option value={item.Name} key={item.Name}>{item.Count} X {item.Name}</option>
                                ))}
                            </select>
                        </span>
                        <br />
                        <br />
                        <h4>Starting Pack</h4>
                        {(this.state.characterClassSelected.Pack.length > 1)
                            ?
                            <div>
                                <select onChange={this.handleChangeCharacterCreation} name="packChoice" className="customSelect">
                                    <option value="">None Selected</option>
                                    {this.state.characterClassSelected.Pack.map(item => (
                                        <option value={item} key={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            :
                            <div>
                                <p>{this.state.characterClassSelected.Pack[0]}</p>
                            </div>
                        }
                        <h4>Extra Equipment</h4>
                        <table>
                            <tbody>
                                {this.state.characterClassSelected.Equipment.map(item => (
                                    <tr key={item.Name} className="profRow">
                                        <th className="profRow" key={item.Name}>{item.Name}</th>
                                        <td className="profRow" key={item.Count}>{item.Count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <br />
                        <span onClick={this.handleDetails} className="customButton">Details</span>
                        {(this.state.showDetails === true)
                            ?
                            <div className="scrollDiv">
                                {this.state.characterClassSelected.Features.map(item => (
                                    <div key={item.Name} className="monsterGrouping" id="features">
                                        <h4 className="plaque">{item.Name}</h4>
                                        <p>Level: {item.Level}</p>
                                        <p>Uses: {item.Uses}</p>{" "}<p>Cooldown: {item.CoolDown}</p>
                                        {item.Description.map(item => (
                                            <p key={item}>{item}</p>
                                        ))}
                                    </div>
                                ))}
                                {(this.state.characterClassSelected.Level[0].SpellSlots)
                                    ?
                                    <div>
                                        <h4>Spell Slots</h4>
                                        <table>
                                            <tbody>
                                                <tr className="tableHeader">
                                                    <th>Level</th>
                                                    <th>Spells Known</th>
                                                    <th>Cantrips Known</th>
                                                    <th>1st</th>
                                                    <th>2nd</th>
                                                    <th>3rd</th>
                                                    <th>4th</th>
                                                    <th>5th</th>
                                                    <th>6th</th>
                                                    <th>7th</th>
                                                    <th>8th</th>
                                                    <th>9th</th>
                                                </tr>
                                                {this.state.characterClassSelected.Level.map(item => (
                                                    <tr key={item.Level} id="tableRow" className={`tableRow${item.Level}`}>
                                                        <td><strong>{item.Level}</strong></td>
                                                        <td>{item.SpellsKnown}</td>
                                                        <td>{item.CantripsKnown}</td>
                                                        <td>{item.SpellSlots[0]}</td>
                                                        <td>{item.SpellSlots[1]}</td>
                                                        <td>{item.SpellSlots[2]}</td>
                                                        <td>{item.SpellSlots[3]}</td>
                                                        <td>{item.SpellSlots[4]}</td>
                                                        <td>{item.SpellSlots[5]}</td>
                                                        <td>{item.SpellSlots[6]}</td>
                                                        <td>{item.SpellSlots[7]}</td>
                                                        <td>{item.SpellSlots[8]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    : null
                                }
                            </div>
                            : null
                        }
                    </div>
                    : null
                }
                <br />
                {(this.state.statRolls.length > 0)
                    ?
                    <div>
                        {this.state.statRolls.map((item, index) => (<span key={index}>{item}{" | "}</span>))}
                    </div>
                    : null
                }
                <br />
                <div className="statContainer">
                    <div className="statDiv">
                        {(this.state.strength === 0) ? <span>Strength:<select name="strength" onChange={this.handleStatChange}><option value="">-</option>{this.state.statRolls.map((item, index) => <option key={index} value={item}>{item}</option>)} </select></span> : <div onClick={this.handleStatRemove} id="strength" className="hexagon"><div className="hexagon-text"><h4>Strength</h4><h2>{this.state.strength}</h2></div></div>}
                        {(this.state.dexterity === 0) ? <span>Dexterity:<select name="dexterity" onChange={this.handleStatChange}><option value="">-</option>{this.state.statRolls.map((item, index) => <option key={index} value={item}>{item}</option>)} </select></span> : <div onClick={this.handleStatRemove} className="hexagon" id="dexterity"><div className="hexagon-text"><h4>Dexterity</h4><h2>{this.state.dexterity}</h2></div></div>}
                        {(this.state.constitution === 0) ? <span>Constitution:<select name="constitution" onChange={this.handleStatChange}><option value="">-</option>{this.state.statRolls.map((item, index) => <option key={index} value={item}>{item}</option>)} </select></span> : <div onClick={this.handleStatRemove} className="hexagon" id="constitution"><div className="hexagon-text"><h4>Constitution</h4><h2>{this.state.constitution}</h2></div></div>}
                        {(this.state.intelligence === 0) ? <span>Intelligence:<select name="intelligence" onChange={this.handleStatChange}><option value="">-</option>{this.state.statRolls.map((item, index) => <option key={index} value={item}>{item}</option>)} </select></span> : <div onClick={this.handleStatRemove} className="hexagon" id="intelligence"><div className="hexagon-text"><h4>Intelligence</h4><h2>{this.state.intelligence}</h2></div></div>}
                        {(this.state.wisdom === 0) ? <span>Wisdom:<select name="wisdom" onChange={this.handleStatChange}><option value="">-</option>{this.state.statRolls.map((item, index) => <option key={index} value={item}>{item}</option>)} </select></span> : <div onClick={this.handleStatRemove} className="hexagon" id="wisdom"><div className="hexagon-text"><h4>Wisdom</h4><h2>{this.state.wisdom}</h2></div></div>}
                        {(this.state.charisma === 0) ? <span>Charisma:<select name="charisma" onChange={this.handleStatChange}><option value="">-</option>{this.state.statRolls.map((item, index) => <option key={index} value={item}>{item}</option>)} </select></span> : <div onClick={this.handleStatRemove} className="hexagon" id="charisma"><div className="hexagon-text"><h4>Charisma</h4><h2>{this.state.charisma}</h2></div></div>}
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <button onClick={this.handleGenerateStatRolls} className="customButton">Random</button> {" "} <button onClick={this.handleStandardSetStats} className="customButton">Standard Set</button>
                </div>
                <br />
                <h4>Background</h4>
                <select onChange={this.handleChangeCharacterCreation} name="characterBackground" className="customSelect">
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

                        <table>
                            <tr className="profRow">
                                <th className="profRow">Skills</th>
                                {this.state.characterBackgroundSelected.Skills.map(item => (
                                    <td className="profRow" key={item}>{item}</td>
                                ))}
                            </tr>
                            {(this.state.characterBackgroundSelected.Tools.length > 0)
                                ?
                                <tr className="profRow">
                                    <th className="profRow">Tools</th>
                                    {this.state.characterBackgroundSelected.Tools.map(item => (
                                        <td className="profRow" key={item}>{item}</td>
                                    ))}
                                </tr>
                                : null
                            }
                            {(this.state.characterBackgroundSelected.Languages.length > 0)
                                ?
                                <tr className="profRow">
                                    <th className="profRow">Languages</th>
                                    {this.state.characterBackgroundSelected.Languages.map(item => (
                                        <td className="profRow" key={item}>{item}</td>
                                    ))}
                                </tr>
                                : null
                            }
                            <tr className="profRow">
                                <th className="profRow">Equipment</th>
                                {this.state.characterBackgroundSelected.Equipment.map(item => (
                                    <td className="profRow" key={item}>{item}</td>
                                ))}
                            </tr>
                            <tr className="profRow">
                                <th className="profRow">Starting Currency</th>
                                <td className="profRow">{this.state.characterBackgroundSelected.Currency} GP</td>
                            </tr>
                        </table>
                        <br />
                        <h4>Feature: {this.state.characterBackgroundSelected.FeatureName}</h4>
                        {this.state.characterBackgroundSelected.Feature.map(item => (
                            <p key={item}>{item}</p>
                        ))}
                        <h4>Personality Traits</h4>
                        <select onChange={this.handleChangeCharacterCreation} name="characterPersonalityTrait1" className="customSelect">
                            <option value="">None Selected</option>
                            {this.state.characterBackgroundSelected.PersonalityTraits.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        <select onChange={this.handleChangeCharacterCreation} name="characterPersonalityTrait2" className="customSelect">
                            <option value="">None Selected</option>
                            {this.state.characterBackgroundSelected.PersonalityTraits.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        <h4>Ideals</h4>
                        <select onChange={this.handleChangeCharacterCreation} name="characterIdeal" className="customSelect">
                            <option value="">None Selected</option>
                            {this.state.characterBackgroundSelected.Ideals.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        <h4>Bond</h4>
                        <select onChange={this.handleChangeCharacterCreation} name="characterBond" className="customSelect">
                            <option value="">None Selected</option>
                            {this.state.characterBackgroundSelected.Bonds.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        <h4>Flaw</h4>
                        <select onChange={this.handleChangeCharacterCreation} name="characterFlaw" className="customSelect">
                            <option value="">None Selected</option>
                            {this.state.characterBackgroundSelected.Flaws.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        {(this.state.characterBackgroundSelected.Specialization.length > 0)
                            ?
                            <div>
                                <h4>{this.state.characterBackgroundSelected.SpecializationName}</h4>
                                <select onChange={this.handleChangeCharacterCreation} name="characterSpecialization" className="customSelect">
                                    <option value="">None Selected</option>
                                    {this.state.characterBackgroundSelected.Specialization.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            : null
                        }
                    </div>
                }
                <br />
                <h4>Alignment</h4>
                <select onChange={this.handleChangeCharacterCreation} name="characterAlignment" className="customSelect">
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
                <br />
                <br />
                <button onClick={this.handleCreateCharacter}>Submit!</button>
            </div>
        )
    }
}

export default CharacterCreation;