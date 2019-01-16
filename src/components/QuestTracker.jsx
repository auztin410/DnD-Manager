import React, { Component } from 'react';
import Quest from './Quest';
import Quests from '../assets/Json/QuestFormat.json';

class QuestTracker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            singleQuests: [],
            groupedTitles: [],
            groupedQuests: [],
            showQuest: false,
            selectedQuest: [],
            questName: "",
            chainQuest: "",
            questChainName: "",
            questChainPart: "",
            startNPC: "",
            startLocation: "",
            endNPC: "",
            endLocation: "",
            experience: "",
            questDescription: "",
        }

        this.handleFindGroup = this.handleFindGroup.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCloseQuest = this.handleCloseQuest.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitQuest = this.handleSubmitQuest.bind(this);
    }

    componentDidMount() {
        let singleQuests = Quests.filter(item => item.QuestGroup === false);
        let groupedQuests = Quests.filter(item => item.QuestGroup === true);
        let groupedTitles = [...new Set(groupedQuests.map(item => item.Group))];
        this.setState({
            singleQuests,
            groupedQuests,
            groupedTitles,
        })
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSelect(event) {
        let quest = event.target.innerHTML;
        let found = this.state.groupedQuests.find(item => item.Title === quest);
        console.log(found);
        this.setState({
            selectedQuest: found,
            showQuest: true,
        });
    };

    handleCloseQuest() {
        this.setState({
            selectedQuest: [],
            showQuest: false,
        });
    };

    handleFindGroup(title) {
        console.log(title);
        let found = this.state.groupedQuests.filter(item => item.Group === title);
        let sorted = found.sort(function (a, b) {
            return a.QuestPart - b.QuestPart;
        });
        console.log("Found");
        console.log(found);
        return (
            sorted.map(item => (
                <tr key={item.Title} onClick={this.handleSelect} id="questSelect">
                    <td className="profRow">{item.Title}</td>
                    <td className="profRow">{(item.Completed === true) ? <div className="circle" id="green"></div> : <div className="circle" id="red"></div>}</td>
                </tr>
            ))
        )
    };

    handleSubmitQuest(event) {
        event.preventDefault();
        let group = this.state.groupedQuests;
        let quest = {
            Title: this.state.questName,
            QuestGroup: this.state.chainQuest,
            Group: this.state.chainQuest,
            QuestPart: this.state.questChainPart,
            Start: {
                NPC: this.state.startNPC,
                Location: this.state.startLocation
            },
            End: {
                NPC: this.state.endNPC,
                Location: this.state.endLocation
            },
            Description: this.state.questDescription,
            Reward: [],
            EXP: this.state.experience,
            Completed: false
        }
        group.push(quest);
        this.setState({
            groupedQuests: group,
            questName: "",
            chainQuest: "",
            questChainName: "",
            questChainPart: "",
            startLocation: "",
            startNPC: "",
            endLocation: "",
            endNPC: "",
            questDescription: "",
            experience: ""
        })
    };

    render() {
        return (
            <div className="visible" id="questTracker">
                <div className="createQuest">
                    <form>
                        <span>Quest Name</span><input type="text" name="questName" onChange={this.handleChange} />
                        <br />
                        <span>Chain Quest</span><select name="chainQuest" onChange={this.handleChange}>
                            <option value="">Single Quest</option>
                            <br />
                            <option value="new">New Chain</option>
                            {this.state.groupedTitles.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        {(this.state.chainQuest === "new")
                            ?
                            <div>
                                <span>Quest Chain Name</span><input type="text" name="questChainName" onChange={this.handleChange} />
                                <span>Quest Part</span><input type="text" name="questChainPart" onChange={this.handleChange} />
                            </div>
                            : null
                        }
                        <br />
                        <span>Start NPC</span><input type="text" name="startNPC" onChange={this.handleChange} />
                        <br />
                        <span>Start Location</span><input type="text" name="startLocation" onChange={this.handleChange} />
                        <br />
                        <br />
                        <span>End NPC</span><input type="text" name="endNPC" onChange={this.handleChange} />
                        <br />
                        <span>End Location</span><input type="text" name="endLocation" onChange={this.handleChange} />
                        <br />
                        <span>Experience</span><input type="number" name="experience" onChange={this.handleChange} />
                        <br />
                        <span>Description</span><textarea name="questDescription" cols="30" rows="10" onChange={this.handleChange}></textarea>
                        <br />
                        <button onClick={this.handleSubmitQuest}>Submit</button>
                    </form>
                </div>
                {(this.state.singleQuests.length > 0)
                    ?
                    <div className="questSection">
                        <table>
                            <tr>
                                <th className="profRow" id="questHeader" colSpan="2">Single Quest</th>
                            </tr>
                            {this.state.singleQuests.map(item => (
                                <tr key={item.Title}>
                                    <td className="profRow" id="questSelect">{item.Title}</td>
                                    <td className="profRow">{(item.Completed === true) ? <div className="circle" id="green"></div> : <div className="circle" id="red"></div>}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    : null
                }
                {this.state.groupedTitles.map(item => (
                    <div key={item} className="questSection">
                        <table>
                            <tr>
                                <th className="profRow" id="questHeader" colSpan="2">{item}</th>
                            </tr>
                            {this.handleFindGroup(item)}
                        </table>
                    </div>
                ))}
                {(this.state.showQuest === true)
                    ?
                    <div className="questSelected">
                        <span className="closeDisplayItem" onClick={this.handleCloseQuest}>X</span>
                        <h4>{this.state.selectedQuest.Title}</h4>
                        <p>Start: {this.state.selectedQuest.Start.NPC} | {this.state.selectedQuest.Start.Location}</p>
                        <p>End: {this.state.selectedQuest.End.NPC} | {this.state.selectedQuest.End.Location}</p>
                        <div className="questDescription">
                            {this.state.selectedQuest.Description}
                        </div>
                        <p>Experience: {this.state.selectedQuest.EXP}</p>
                        {(this.state.selectedQuest.Reward.length > 0)
                            ?
                            <table>
                                <tr>
                                    <th className="profRow" colSpan="2">Rewards</th>
                                </tr>

                                {this.state.selectedQuest.Reward.map(item => (
                                    <tr key={item.Name}>
                                        <td className="profRow">{item.Name}</td>
                                        <td className="profRow">{item.Quantity}</td>
                                    </tr>
                                ))}
                            </table>
                            : null
                        }
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default QuestTracker;