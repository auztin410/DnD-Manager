import React from 'react';

const Quest = props => (
    <div className="questSection">
        <h2>{props.quest.Title}</h2>
        <p>Start: {props.quest.Start.NPC} | {props.quest.Start.Location}<br/>End: {props.quest.End.NPC} | {props.quest.End.Location}<br/>Experience: {props.quest.EXP}</p>
        <p className="questDesc">Description: {props.quest.Description}</p>
        <h4>Rewards</h4>
        <div className="questRewardTable">
        <table>
            <tr>
                <th className="profRow">Item</th>
                <th className="profRow">Quantity</th>
            </tr>
            {props.quest.Reward.map(item => (
                <tr key={item.Name}>
                    <td className="profRow">{item.Name}</td>
                    <td className="profRow">{item.Quantity}</td>
                </tr>
            ))}
        </table>
        </div>
        <br/>
    </div>
)

export default Quest;