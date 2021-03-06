import React, { Component } from 'react';
import axios from 'axios';
import Quests from '../assets/Json/QuestFormat.json';
import Autocomplete from 'react-autocomplete';
import Equipment from '../assets/Json/Equipment';
import MagicItemsList from '../assets/Json/MagicItemsList';
import WeaponsList from '../assets/Json/WeaponsList';
import TradeGoods from '../assets/Json/TradeGoods';
import Mounts from '../assets/Json/Mounts';
import TackHarnessVehicle from '../assets/Json/Tack-Harness-Vehicle';
import Ships from '../assets/Json/Ships';

class QuestTracker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allQuests: [],
            singleQuests: [],
            groupedTitles: [],
            groupedQuests: [],
            showQuest: false,
            selectedQuest: [],
            questName: "",
            chainQuest: "",
            chainBoolean: false,
            questChainName: "",
            questChainPart: "",
            startNPC: "",
            startLocation: "",
            endNPC: "",
            endLocation: "",
            experience: "",
            questDescription: "",
            rewardOptions: "",
            rewardSelected: "",
            rewardList: false,
            rewards: [],
            rewardQuantity: 0,
            displayMiscQuest: false,
            displayChainQuests: false,
        }

        this.handleFindGroup = this.handleFindGroup.bind(this);
        this.handleSelectGroup = this.handleSelectGroup.bind(this);
        this.handleSelectSingle = this.handleSelectSingle.bind(this);
        this.handleCloseQuest = this.handleCloseQuest.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitQuest = this.handleSubmitQuest.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleCreateQuest = this.handleCreateQuest.bind(this);
        this.handleDisplayMisc = this.handleDisplayMisc.bind(this);
        this.handleDisplayChainQuests = this.handleDisplayChainQuests.bind(this);
        this.handleFindGroupQuest = this.handleFindGroupQuest.bind(this);
    }

    componentDidMount() {
        let url = window.location.href;
        let sessionId = url.split("/").pop();
        axios.get(`/quest/all/${sessionId}`).then(response => {
            console.log('All Quests For Session Id');
            console.log(response.data);
            this.setState({
                allQuests: response.data,
            }, () => {
                let singleQuests = this.state.allQuests.filter(item => item.questGroup === false);
                let groupedQuests = this.state.allQuests.filter(item => item.questGroup === true);
                let groupedTitles = [...new Set(groupedQuests.map(item => item.group))];
                console.log(singleQuests);
                console.log(groupedQuests);
                console.log(groupedTitles);
                this.setState({
                    singleQuests,
                    groupedQuests,
                    groupedTitles,
                });
            });
        }).catch((err) => (console.log(err)));
    };

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            switch (name) {
                case "chainQuest":
                    if (value === "single quest") {
                        this.setState({
                            chainBoolean: false,
                            questChainName: "single quest",
                            chainQuest: ""
                        });
                    }
                    else {
                        this.setState({
                            chainBoolean: true,
                            questChainName: this.state.chainQuest,
                        });
                    }
                    break;
                case "rewardOptions":
                    if (value === "") {
                        this.setState({
                            rewardSelected: "",
                            rewardList: false,
                        });
                    }
                    else if (value === "coin") {
                        this.setState({
                            rewardSelected: "coin",
                            rewardList: false,
                        });
                    }
                    else if (value === "equipment") {
                        this.setState({
                            rewardSelected: Equipment,
                            rewardList: true,
                        })
                    }
                    else if (value === "weapon") {
                        this.setState({
                            rewardSelected: WeaponsList,
                            rewardList: true,
                        });
                    }
                    else if (value === "magic") {
                        this.setState({
                            rewardSelected: MagicItemsList,
                            rewardList: true,
                        })
                    }
                    else if (value === "trade") {
                        this.setState({
                            rewardSelected: TradeGoods,
                            rewardList: true,
                        })
                    }
                    else if (value === "mount") {
                        this.setState({
                            rewardSelected: Mounts,
                            rewardList: true,
                        });
                    }
                    else if (value === "harness") {
                        this.setState({
                            rewardSelected: TackHarnessVehicle,
                            rewardList: true,
                        });
                    }
                    else if (value === "ship") {
                        this.setState({
                            rewardSelected: Ships,
                            rewardList: true,
                        });
                    }
            }
            this.componentDidMount();
        });
    };

    handleSelectGroup(event) {
        let quest = event.target.innerHTML;
        let found = this.state.groupedQuests.find(item => item.title === quest);
        console.log(found);
        this.setState({
            selectedQuest: found,
            showQuest: true,
        });
    };

    handleSelectSingle(event) {
        let quest = event.target.innerHTML;
        let found = this.state.singleQuests.find(item => item.title === quest);
        console.log(found);
        this.setState({
            selectedQuest: found,
            showQuest: true,
        });
    }

    handleCloseQuest() {
        this.setState({
            selectedQuest: [],
            showQuest: false,
        });
    };

    handleFindGroup(title) {
        console.log(title);
        let found = this.state.groupedQuests.filter(item => item.group === title);
        let sorted = found.sort(function (a, b) {
            return a.questPart - b.questPart;
        });
        console.log("Found");
        console.log(found);
        return (
            sorted.map(item => (
                <tr key={item.title}>
                    <td onClick={this.handleSelectGroup} id="questSelect" className="profRow">{item.title}</td>
                    <td className="profRow">{(item.completed === true) ? <div className="circle" id="green"></div> : <div className="circle" id="red"></div>}</td>
                </tr>
            ))
        )
    };

    handleFindGroupQuest(title) {
        console.log(title);
        let found = this.state.groupedQuests.filter(item => item.group === title);
        let sorted = found.sort(function (a, b) {
            return a.questPart - b.questPart;
        });
        console.log("Found");
        console.log(found);
        return (
            sorted.map(item => (
                <div key={item.title} className="quest">
                    <h2>{item.title}</h2>
                    <p>Start NPC: {item.startNPC} | Start: {item.startLocation}</p>
                    <p>End NPC: {item.endLocation} | End: {item.endLocation}</p>
                    <h4>Description</h4>
                    <p>{item.description}</p>
                    <p>Experience: {item.experience}</p>
                    {(item.reward.length > 0)
                        ?
                        <table>
                            <tbody>
                                <tr>
                                    <th className="profRow" colSpan="2">Rewards</th>
                                </tr>
                                {item.reward.map(items => (
                                    <tr key={items.name}>
                                        <td className="profRow">{items.name}</td>
                                        <td className="profRow">{items.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : null
                    }
                </div>
            ))
        )
    };

    handleSubmitQuest(event) {
        event.preventDefault();
        let group = this.state.groupedQuests;
        let quest = {
            Title: this.state.questName,
            QuestGroup: this.state.chainBoolean,
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
        }, () => {
            document.getElementById("questCreation").reset();
        });
    };

    handleAddItem(event) {
        event.preventDefault();
        let reward = {
            name: this.state.value,
            quantity: this.state.rewardQuantity,
            type: this.state.rewardOptions,
        }
        let current = this.state.rewards;
        current.push(reward);
        this.setState({
            rewards: current,
            value: "",
        });
        this.inputQuantity.value = "";
    };

    handleCreateQuest(event) {
        event.preventDefault();
        let url = window.location.href;
        let sessionId = url.split("/").pop();
        axios.post('/quest/create/', {
            title: this.state.questName,
            questGroup: this.state.chainBoolean,
            group: this.state.questChainName,
            part: this.state.questChainPart,
            startNPC: this.state.startNPC,
            startLocation: this.state.startLocation,
            endNPC: this.state.endNPC,
            endLocation: this.state.endLocation,
            description: this.state.questDescription,
            reward: this.state.rewards,
            experience: this.state.experience,
            completed: false,
            sessionId: sessionId
        }).then((res) => {
            console.log(res.data)
            document.getElementById("questCreation").reset();
            this.setState({
                rewards: [],
            });
            this.componentDidMount();
        }).catch((err) => (console.log(err)));
    };

    handleDisplayMisc() {
        if (this.state.displayMiscQuest) {
            this.setState({
                displayMiscQuest: false,
            });
        }
        else if (!this.state.displayMiscQuest) {
            this.setState({
                displayMiscQuest: true,
            });
        }
    };

    handleDisplayChainQuests() {
        if (this.state.displayChainQuests) {
            this.setState({
                displayChainQuests: false,
            });
        }
        else if (!this.state.displayChainQuests) {
            this.setState({
                displayChainQuests: true,
            });
        }
    };

    render() {
        return (
            <div className={this.props.display}>
                <form id="questCreation">
                    <div className="createQuest">
                        <div><span className="questText">Quest Name</span><input type="text" name="questName" onChange={this.handleChange} /></div>

                        <div><span className="questText">Chain Quest</span><select name="chainQuest" onChange={this.handleChange}>
                            <option value="single quest">Single Quest</option>
                            <option value="new">New Chain</option>
                            {this.state.groupedTitles.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select></div>
                        {(this.state.chainQuest === "new")
                            ?
                            <div><span>
                                <span className="questText">Quest Chain Name</span><input type="text" name="questChainName" onChange={this.handleChange} />
                            </span></div>
                            : <div></div>
                        }
                        <br />
                        {(this.state.chainQuest === "")
                            ? null
                            : <div>
                                <span className="questText">Quest Chain Part</span><input type="text" name="questChainPart" onChange={this.handleChange} /></div>
                        }
                        <div><span className="questText">Start NPC</span><input type="text" name="startNPC" onChange={this.handleChange} />
                            <br />
                            <span className="questText">Start Location</span><input type="text" name="startLocation" onChange={this.handleChange} /></div>

                        <div><span className="questText">End NPC</span><input type="text" name="endNPC" onChange={this.handleChange} />
                            <br />
                            <span className="questText">End Location</span><input type="text" name="endLocation" onChange={this.handleChange} /></div>

                        <div className="form9"><span className="questText">Quest Reward</span>
                            <br />
                            <select onChange={this.handleChange} name="rewardOptions">
                                <option value="">None</option>
                                <option value="coin">Coin</option>
                                <option value="equipment">Equipment</option>
                                <option value="weapon">Weapon</option>
                                <option value="magic">Magic Item</option>
                                <option value="trade">Trade Good</option>
                                <option value="mount">Mount</option>
                                <option value="harness">Harness/Tackle</option>
                                <option value="ship">Ship</option>
                            </select>
                        </div>
                        <br />
                        {(this.state.rewardList === true)
                            ?
                            <div>
                                <Autocomplete
                                    items={this.state.rewardSelected}
                                    inputProps={{ style: { fontSize: "18px" } }}
                                    shouldItemRender={(item, value) => item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    getItemValue={item => item.Name}
                                    renderItem={(item, highlighted) =>
                                        <div className="customButton"
                                            key={item.id}
                                            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                        >
                                            {item.Name}
                                        </div>
                                    }
                                    value={this.state.value}
                                    onChange={e => this.setState({ value: e.target.value })}
                                    onSelect={value => this.setState({ value })}
                                />{" "}<input onChange={this.handleChange} ref={el => this.inputQuantity = el} className="numberInput" type="number" name="rewardQuantity"></input>{" "}<button onClick={this.handleAddItem}>Add Item</button>
                                <br />
                            </div>
                            : null
                        }
                        <br />
                        {(this.state.rewards.length > 0)
                            ?
                            <table className="rewardTable">
                                <tbody>
                                    <tr>
                                        <th id="questHeader" className="profRow">Item</th>
                                        <th id="questHeader" className="profRow">Quantity</th>
                                    </tr>
                                    {this.state.rewards.map(item => (
                                        <tr>
                                            <td className="profRow">{item.name}</td>
                                            <td className="profRow">{item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : null
                        }

                        <div><span className="questText">Experience</span><input type="number" name="experience" onChange={this.handleChange} /></div>
                        <br />
                        <div><span className="questText">Description</span>
                            <textarea className="descriptionArea" name="questDescription" cols="30" rows="10" onChange={this.handleChange}></textarea></div>


                        <br />
                        <button onClick={this.handleCreateQuest}>Submit</button>
                    </div>
                </form>

                <div className="questDisplay">
                    <h2 onClick={this.handleDisplayMisc}>Misc Quests</h2>
                    {(this.state.displayMiscQuest)
                        ?
                        <div>
                            {this.state.singleQuests.map(item => (
                                <div key={item.title} className="quest">
                                    <h2>{item.title}</h2>
                                    <p>Start NPC: {item.startNPC} | Start: {item.startLocation}</p>
                                    <p>End NPC: {item.endLocation} | End: {item.endLocation}</p>
                                    <h4>Description</h4>
                                    <p>{item.description}</p>
                                    <p>Experience: {item.experience}</p>
                                    {(item.reward.length > 0)
                                        ?
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th className="profRow" colSpan="2">Rewards</th>
                                                </tr>
                                                {item.reward.map(items => (
                                                    <tr key={items.name}>
                                                        <td className="profRow">{items.name}</td>
                                                        <td className="profRow">{items.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        : null
                                    }
                                </div>
                            ))}
                        </div>
                        : null
                    }
                    <h2 onClick={this.handleDisplayChainQuests}>Chain Quests</h2>
                    {(this.state.displayChainQuests)
                    ?
                    <div>
                    {(this.state.groupedTitles.length > 0)
                        ?
                        <div>
                            {this.state.groupedTitles.map(item => (
                                <div key={item.title} className="groupQuest">
                                    <h2>{item}</h2>
                                    {this.handleFindGroupQuest(item)}
                                </div>
                            ))}
                        </div>
                        : null
                    }
                    </div>
                    : null
                    }
                    
                </div>
                {/* <div className="questSection">
                {(this.state.singleQuests.length > 0)
                    ?
                    <div className="questTables">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="profRow" id="questHeader" colSpan="2">One-Off Quests</th>
                                </tr>
                                {this.state.singleQuests.map(item => (
                                    <tr key={item.title}>
                                        <td onClick={this.handleSelectSingle} className="profRow" id="questSelect">{item.title}</td>
                                        <td className="profRow">{(item.completed === true) ? <div className="circle" id="green"></div> : <div className="circle" id="red"></div>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    : null
                }
                {this.state.groupedTitles.map(item => (
                    <div key={item} className="questTables">
                        <table>
                            <tbody>
                            <tr>
                                <th className="profRow" id="questHeader" colSpan="2">{item}</th>
                            </tr>
                            {this.handleFindGroup(item)}
                            </tbody>
                        </table>
                    </div>
                ))}
                {(this.state.showQuest === true)
                    ?
                    <div className="questSelected">
                        <span className="closeDisplayItem" onClick={this.handleCloseQuest}>X</span>
                        <h4>{this.state.selectedQuest.title}</h4>
                        <p>Start: {this.state.selectedQuest.startNPC} | {this.state.selectedQuest.startLocation}</p>
                        <p>End: {this.state.selectedQuest.endNPC} | {this.state.selectedQuest.endLocation}</p>
                        <div className="questDescription">
                            {this.state.selectedQuest.description}
                        </div>
                        <p>Experience: {this.state.selectedQuest.experience}</p>
                        {(this.state.selectedQuest.reward.length > 0)
                            ?
                            <table>
                                <tbody>
                                <tr>
                                    <th className="profRow" colSpan="2">Rewards</th>
                                </tr>

                                {this.state.selectedQuest.reward.map(item => (
                                    <tr key={item.name}>
                                        <td className="profRow">{item.name}</td>
                                        <td className="profRow">{item.quantity}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            : null
                        }
                    </div>
                    : null
                }
                </div> */}
            </div>
        )
    }
}

export default QuestTracker;