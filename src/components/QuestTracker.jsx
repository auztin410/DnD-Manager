import React, { Component } from 'react';
import Quest from './Quest';
import Quests from '../assets/Json/QuestFormat.json';

class QuestTracker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            singleQuests: [],
            groupedQuests: [],
        }
    }

    componentDidMount() {
        let singleQuests = Quests.filter(item => item.QuestGroup === false);
        let groupedQuests = Quests.filter(item => item.QuestGroup === true);
        this.setState({
            singleQuests,
            groupedQuests,
        })
    }

    render() {
        return (
            <div className="visible" id="questTracker">
                {(this.state.singleQuests.length > 0)
                ?
                <div>
                    {this.state.singleQuests.map(item => (
                        <span className="quest">{item.Title}</span>
                    ))}
                </div>
                : null
                }
                <br/>
                {(this.state.groupedQuests.length > 0)
                ?
                <div>
                    {this.state.groupedQuests.map(item => (
                        <span className="quest">{item.Title}</span>
                    ))}
                </div>
                : null
                }
            </div>
        )
    }
}

export default QuestTracker;