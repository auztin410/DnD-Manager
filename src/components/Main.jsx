import React, { Component } from 'react';
import axios from 'axios';
import NpcGenerator from '../assets/Json/NpcGenerator';
import Npc from './Npc';
import WorldEventGenerator from '../assets/Json/World-Shaking-Events';
import WorldShakingEvent from './WorldShakingEvent';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            user: null,
            npc: [],
            npcComponent: false,
            worldShakingEvent: null,
            worldShakingDetails: null,
            worldShakingComponent: false,
            individualLoot: "Challenge0-4",
            individualLootCurrency: "",
            individualLootResult: "",
            rollResult: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNpcGenerator = this.handleNpcGenerator.bind(this);
        this.handleWorldShakingEvent = this.handleWorldShakingEvent.bind(this);
        this.DiceRoll = this.DiceRoll.bind(this);
        this.handleRoll = this.handleRoll.bind(this);
    }

    componentDidMount() {
        axios.get('/auth/user').then(response => {
            console.log(response.data)
            if (!!response.data.user) {
                console.log('THERE IS A USER')
                this.setState({
                    loggedIn: true,
                    user: response.data.user
                })
            } else {
                this.setState({
                    loggedIn: false,
                    user: null
                })
            }
        })
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleNpcGenerator(event) {
        let appearance = NpcGenerator.appearance[Math.floor(Math.random() * NpcGenerator.appearance.length)];
        let highAbility = NpcGenerator.highAbility[Math.floor(Math.random() * NpcGenerator.highAbility.length)];
        let lowAbility = NpcGenerator.lowAbility[Math.floor(Math.random() * NpcGenerator.lowAbility.length)];
        let talents = NpcGenerator.talents[Math.floor(Math.random() * NpcGenerator.talents.length)];
        let mannerism = NpcGenerator.mannerism[Math.floor(Math.random() * NpcGenerator.mannerism.length)];
        let trait = NpcGenerator.trait[Math.floor(Math.random() * NpcGenerator.trait.length)];
        let ideals = NpcGenerator.ideals[Math.floor(Math.random() * NpcGenerator.ideals.length)];
        let bonds = NpcGenerator.bonds[Math.floor(Math.random() * NpcGenerator.bonds.length)];
        let flawsSecrets = NpcGenerator.flawsSecrets[Math.floor(Math.random() * NpcGenerator.flawsSecrets.length)];
        let name = NpcGenerator.name[Math.floor(Math.random() * NpcGenerator.name.length)];

        this.setState({
            npc: { name, appearance, highAbility, lowAbility, talents, mannerism, trait, ideals, bonds, flawsSecrets },
            npcComponent: true,
        });
    };

    handleWorldShakingEvent(event) {
        let bigEvent = WorldEventGenerator.Event[Math.floor(Math.random() * WorldEventGenerator.Event.length)];
        if (bigEvent === "Rise of a leader or an era" || bigEvent === "Fall of a leader or an era") {
            let details = WorldEventGenerator.Leader[Math.floor(Math.random() * WorldEventGenerator.Leader.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "Cataclysmic disaster") {
            let details = WorldEventGenerator.Disaster[Math.floor(Math.random() * WorldEventGenerator.Disaster.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "Assault or invasion") {
            let details = WorldEventGenerator.Invasion[Math.floor(Math.random() * WorldEventGenerator.Invasion.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "Extinction or depletion") {
            let details = WorldEventGenerator.Extinction[Math.floor(Math.random() * WorldEventGenerator.Extinction.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "New organization") {
            let details = WorldEventGenerator.Organization[Math.floor(Math.random() * WorldEventGenerator.Organization.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "Discovery, expansion, invention") {
            let details = WorldEventGenerator.Discovery[Math.floor(Math.random() * WorldEventGenerator.Discovery.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else {
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: null,
                worldShakingComponent: true,
            });
        }

    };

    DiceRoll(sides, times) {
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
        this.setState({
            rollResult: result,
        });
        };

        handleRoll(event) {
            event.preventDefault();
            this.DiceRoll(100, 1);
            switch(this.state.individualLoot) {
                case "Challenge0-4":
                if(this.state.rollResult <= 30) {
                    this.DiceRoll(5, 6);
                    let result = this.state.rollResult;
                    console.log(result);
                    this.setState({
                        individualLootCurrency: "CP",
                        individualLootResult: result,
                    });
                }
                else if(this.state.rollResult <= 60) {
                    this.DiceRoll(4, 6);
                    let result = this.state.rollResult;
                    this.setState({
                        individualLootCurrency: "SP",
                        individualLootResult: result,
                    });
                }
                else if(this.state.rollResult <= 70) {
                    this.DiceRoll(3, 6);
                    let result = this.state.rollResult;
                    this.setState({
                        individualLootCurrency: "EP",
                        individualLootResult: result,
                    });
                }
                else if(this.state.rollResult <= 95) {
                    this.DiceRoll(3, 6);
                    let result = this.state.rollResult;
                    this.setState({
                        individualLootCurrency: "GP",
                        individualLootResult: result,
                    });
                }
                else if(this.state.rollResult >= 96) {
                    this.DiceRoll(1, 6);
                    let result = this.state.rollResult;
                    this.setState({
                        individualLootCurrency: "PP",
                        individualLootResult: result,
                    });
                }
                else {
                    console.log("You broke it!");
                }
                break;
                case "Challenge5-10":
                console.log("not built yet!");
                break;
                case "Challenge11-16":
                console.log("not built yet!");
                break;
                case "Challenge17+":
                console.log("not built yet!");
                break;
                default:
                console.log("Default was hit!")
            }
        }

    render() {
        if (this.state.npcComponent === true) {
            return (
                <div>
                    <div className="main">
                        <button onClick={this.handleNpcGenerator}>NPC Generator</button>
                        <br />
                        <br />
                        <Npc npc={this.state.npc} />
                    </div>
                    <div>
                        <button onClick={this.handleWorldShakingEvent}>World Shaking Event Generator</button>
                    </div>
                </div>
            )
        }
        else if (this.state.worldShakingComponent === true) {
            return (
                <div>
                    <div className="main">
                        <button onClick={this.handleNpcGenerator}>NPC Generator</button>
                    </div>
                    <div>
                        <button onClick={this.handleWorldShakingEvent}>World Shaking Event Generator</button>
                        <br />
                        <br />
                        <WorldShakingEvent worldShakingEvent={this.state.worldShakingEvent} worldShakingDetails={this.state.worldShakingDetails} />
                    </div>
                </div>
            )
        }
        else if (this.state.npcComponent === false) {
            return (
                <div>
                    <div className="main">
                        <button onClick={this.handleNpcGenerator}>NPC Generator</button>
                    </div>
                    <div>
                        <button onClick={this.handleWorldShakingEvent}>World Shaking Event Generator</button>
                    </div>
                    <div>
                        <form>
                            <select name="individualLoot" onChange={this.handleChange}>
                                <option value="Challenge0-4">Challenge 0-4</option>
                                <option value="Challenge5-10">Challenge 5-10</option>
                                <option value="Challenge11-16">Challenge 11-16</option>
                                <option value="Challenge17+">Challenge 17+</option>
                            </select>
                        <button onClick={this.handleRoll}>Dice Roll!</button>
                        </form>
                        Individual Loot: {this.state.individualLootResult} {" "} {this.state.individualLootCurrency}
                    </div>
                </div>
            )
        }

    }
}

export default Main;