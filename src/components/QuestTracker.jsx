import React, { Component } from 'react';
import Quest from './Quest';
import Quests from '../assets/Json/QuestFormat.json';

class QuestTracker extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="visible" id="questTracker">
                {(Quests.map(item => (
                    <Quest key={item.Title} quest={item}/>
                )))}
            </div>
        )
    }
}

export default QuestTracker;