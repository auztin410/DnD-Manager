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
        }

        this.handleFindGroup = this.handleFindGroup.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
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

    handleSelect(event) {
        let quest = event.target.innerHTML;
        let found = this.state.groupedQuests.find(item => item.Title === quest);
        console.log(found);
    };

    handleFindGroup(title) {
        console.log(title);
        let found = this.state.groupedQuests.filter(item => item.Group === title);
        console.log("Found");
        console.log(found);
        return (
            found.map(item => (
                <tr key={item.Title}>
                    <td onClick={this.handleSelect} className="profRow" id="questSelect">{item.Title}</td>
                </tr>
            ))
        )
    };

    render() {
        return (
            <div className="visible" id="questTracker">
                {(this.state.singleQuests.length > 0)
                    ?
                    <div className="questSection">
                    <table>
                        <tr>
                            <th className="profRow" id="questHeader">Single Quest</th>
                        </tr>
                        {this.state.singleQuests.map(item => (
                            <tr key={item.Title}>
                                <td className="profRow" id="questSelect">{item.Title}</td>
                            </tr>
                        ))}
                    </table>
                    </div>
                    : null
                }
                {(this.state.groupedTitles.length > 0)
                    ?
                    <div className="questSection">
                        {this.state.groupedTitles.map(item => (
                                <table key={item}>
                                    <tr>
                                        <th className="profRow" id="questHeader">{item}</th>
                                    </tr>
                                    {this.handleFindGroup(item)}
                                </table>
                        ))}
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default QuestTracker;