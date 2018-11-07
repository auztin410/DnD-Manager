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
        }

        this.handleNpcGenerator = this.handleNpcGenerator.bind(this);
        this.handleWorldShakingEvent = this.handleWorldShakingEvent.bind(this);
        this.handleDiceRoll = this.handleDiceRoll.bind(this);
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

    handleDiceRoll() {
        var sides = 6;
        var times = 5;
        var array = [];
        var i;
                for (i = 0; i < times; i++) {
                    var randomNumber = Math.floor(Math.random() * sides) + 1;
                    array.push(randomNumber); 
                }
        console.log(array);
        var sum = array.reduce(add, 0);
        function add(a, b) {
            return a + b;
        }
        console.log(sum);
        };

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
                        <button onClick={this.handleDiceRoll}>Dice Roll!</button>
                    </div>
                </div>
            )
        }

    }
}

export default Main;