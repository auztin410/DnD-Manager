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

    handleFindGroup(title) {
        console.log(title);
        let found = this.state.groupedQuests.filter(item => item.Group === title);
        console.log("Found");
        console.log(found);
        return (
            found.map(item => (
                <span key={item.Title} className="quest">{item.Title}</span>
            ))
        )        
    };

    render() {
        return (
            <div className="visible" id="questTracker">
                {(this.state.singleQuests.length > 0)
                ?
                <div>
                    {this.state.singleQuests.map(item => (
                        <span key={item.Title} className="quest">{item.Title}</span>
                    ))}
                </div>
                : null
                }
                <br/>
                {(this.state.groupedQuests.length > 0)
                ?
                <div>
                    {this.state.groupedQuests.map(item => (
                        <span key={item.Title} className="quest">{item.Title}</span>
                    ))}
                </div>
                : null
                }
                {(this.state.groupedTitles.length > 0)
                ?
                <div>
                    {this.state.groupedTitles.map(item => (
                        <div key={item} className="questGroups">
                            <h4>{item}</h4>
                            {this.handleFindGroup(item)}
                        </div>
                    ))}
                </div>
                : null
                }
            </div>
        )
    }
}

export default QuestTracker;