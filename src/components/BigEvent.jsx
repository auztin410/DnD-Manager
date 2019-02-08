import React, { Component } from 'react';
import WorldShakingEvent from './WorldShakingEvent';
import WorldEventGenerator from '../assets/Json/World-Shaking-Events';

class BigEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            worldShakingEvent: null,
            worldShakingDetails: null
        }
        this.handleWorldShakingEvent = this.handleWorldShakingEvent.bind(this);
    }

    handleWorldShakingEvent() {
        let bigEvent = WorldEventGenerator.Event[Math.floor(Math.random() * WorldEventGenerator.Event.length)];
        if (bigEvent === "Rise of a leader or an era" || bigEvent === "Fall of a leader or an era") {
            let details = WorldEventGenerator.Leader[Math.floor(Math.random() * WorldEventGenerator.Leader.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "Cataclysmic disaster") {
            let details = WorldEventGenerator.Disaster[Math.floor(Math.random() * WorldEventGenerator.Disaster.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "Assault or invasion") {
            let details = WorldEventGenerator.Invasion[Math.floor(Math.random() * WorldEventGenerator.Invasion.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "Extinction or depletion") {
            let details = WorldEventGenerator.Extinction[Math.floor(Math.random() * WorldEventGenerator.Extinction.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "New organization") {
            let details = WorldEventGenerator.Organization[Math.floor(Math.random() * WorldEventGenerator.Organization.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "Discovery, expansion, invention") {
            let details = WorldEventGenerator.Discovery[Math.floor(Math.random() * WorldEventGenerator.Discovery.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else {
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: null,
            });
        }

    };

    render() {
        return (
            <div className={this.props.display}>
                <div className="buttonSpacer">
                    <span className="customButton" onClick={this.handleWorldShakingEvent}>World Shaking Event Generator</span>
                </div>
                {(this.state.worldShakingEvent)
                    ?
                    <WorldShakingEvent worldShakingEvent={this.state.worldShakingEvent} worldShakingDetails={this.state.worldShakingDetails} />
                    : null
                }
            </div>
        )
    }
}

export default BigEvent;