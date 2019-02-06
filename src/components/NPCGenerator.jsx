import React, { Component } from 'react';
import Npc from './Npc';
import NpcGenerator from '../assets/Json/NpcGenerator';

class NPCGenerator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            npc: []
        }
        this.handleNpcGenerator = this.handleNpcGenerator.bind(this);
    }

    handleNpcGenerator() {
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
            npc: { name, appearance, highAbility, lowAbility, talents, mannerism, trait, ideals, bonds, flawsSecrets }
        });
    };

    render() {
        return (
            <div className="visible" id="npc">
                <div className="buttonSpacer">
                    <span className="customButton" onClick={this.handleNpcGenerator}>NPC Generator</span>
                </div>
                {(this.state.npc.length === 0)
                    ? null
                    :
                    <Npc npc={this.state.npc} />
                }
            </div>
        )
    }
}

export default NPCGenerator;