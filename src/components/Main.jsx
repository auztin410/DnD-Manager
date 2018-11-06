import React, { Component } from 'react';
import axios from 'axios';
import NpcGenerator from '../assets/Json/NpcGenerator';
import Npc from './Npc';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            user: null,
            npc: [],
            npcComponent: false,
        }

        this.handleNpcGenerator = this.handleNpcGenerator.bind(this);
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
        let appearance = NpcGenerator.appearance[Math.floor(Math.random()*NpcGenerator.appearance.length)];
        let highAbility = NpcGenerator.highAbility[Math.floor(Math.random()*NpcGenerator.highAbility.length)];
        let lowAbility = NpcGenerator.lowAbility[Math.floor(Math.random()*NpcGenerator.lowAbility.length)];
        let talents = NpcGenerator.talents[Math.floor(Math.random()*NpcGenerator.talents.length)];
        let mannerism = NpcGenerator.mannerism[Math.floor(Math.random()*NpcGenerator.mannerism.length)];
        let trait = NpcGenerator.trait[Math.floor(Math.random()*NpcGenerator.trait.length)];
        let ideals = NpcGenerator.ideals[Math.floor(Math.random()*NpcGenerator.ideals.length)];
        let bonds = NpcGenerator.bonds[Math.floor(Math.random()*NpcGenerator.bonds.length)];
        let flawsSecrets = NpcGenerator.flawsSecrets[Math.floor(Math.random()*NpcGenerator.flawsSecrets.length)];
        let name = NpcGenerator.name[Math.floor(Math.random()*NpcGenerator.name.length)];

        this.setState({
            npc: {name, appearance, highAbility, lowAbility, talents, mannerism, trait, ideals, bonds, flawsSecrets},
            npcComponent: true,
        });
    }
    
    render() {
        if (this.state.npcComponent === false) {
            return (
                <div className="main">
                    <button onClick={this.handleNpcGenerator}>NPC Generator</button>
                </div>
            )
        }
        else if (this.state.npcComponent === true) {
            return (
                <div className="main">
                    <button onClick={this.handleNpcGenerator}>NPC Generator</button>
                    <br/>
                    <br/>
                    <Npc npc={this.state.npc}/>
                    {/* <div>
                        Name: {this.state.npc.name}
                        <br/>
                        Appearance: {this.state.npc.appearance}
                        <br/>
                        High ability: {this.state.npc.highAbility}
                        <br/>
                        Low ability: {this.state.npc.lowAbility}
                        <br/>
                        Talent: {this.state.npc.talents}
                        <br/>
                        Mannerism: {this.state.npc.mannerism}
                        <br/>
                        Trait: {this.state.npc.trait}
                        <br/>
                        Ideal: {this.state.npc.ideals}
                        <br/>
                        Bond: {this.state.npc.bonds}
                        <br/>
                        Flaws and secret: {this.state.npc.flawsSecrets}
                    </div> */}
                </div>
            )
        }
        
    }
}

export default Main;