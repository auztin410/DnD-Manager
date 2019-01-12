import React from 'react'


const Home = props => {
	if (props.user) {
		return (
			<div className="Home">
				<h4 className="mainUser">Current User: {props.user.local.username}</h4>
				<div className="characterList">
						<table className="characterTable">
							<tr className="characterTableHeader">
								<th className="profRow">Name</th>
								<th className="profRow">Level</th>
								<th className="profRow">Race</th>
								<th className="profRow">Class</th>
								<th className="profRow">Background</th>
								<th className="profRow">Session</th>
								<th className="profRow">View</th>
							</tr>
							<tr>
								<td className="profRow">Magmir Emberbeard</td>
								<td className="profRow">12</td>
								<td className="profRow">Mountain Dwarf</td>
								<td className="profRow">Paladin</td>
								<td className="profRow">Acolyte</td>
								<td className="profRow"><div className="circle" id="red"></div></td>
								<td className="profRow"><button onClick={props.view} className="customButton">View</button></td>
							</tr>
							<tr>
								<td className="profRow">Nakoth Narran</td>
								<td className="profRow">6</td>
								<td className="profRow">Dark Elf</td>
								<td className="profRow">Sorcerer</td>
								<td className="profRow">Charlattan</td>
								<td className="profRow"><div className="circle" id="green"></div></td>
								<td className="profRow"><button className="customButton">View</button></td>
							</tr>
							<tr>
								<td className="profRow">Grubis The Liar</td>
								<td className="profRow">-19</td>
								<td className="profRow">Human/Slob</td>
								<td className="profRow">Warrior?</td>
								<td className="profRow">Homeless</td>
								<td className="profRow"><div className="circle" id="green"></div></td>
								<td className="profRow"><button className="customButton">View</button></td>
							</tr>
						</table>
				</div>
			</div>
		)
	} else {
		return (
			<div className="Home">
				<h4 className="mainUser">No User</h4>
			</div>
		)
	}
}

export default Home
