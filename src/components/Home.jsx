import React from 'react'


const Home = props => {
	const Magmir = {
		Name: "Magmir Emberbeard",
		Class: "Paladin",
		Race: "Mount Dwarf",
		Level: 12,
		Background: "Acolyte",
		Weapon: "Warhammer",
		Armor: "Half-plate",
		Strength: 16,
		Dexterity: 12,
		Constitution: 14,
		Intelligence: 15,
		Wisdom: 13,
		Charisma: 15,
		Equipment: [
			{
				Name: "Javelin",
				Quantity: 4
			},
			{
				Name: "Potion of Healing",
				Quantity: 2
			},
			{
				Name: "Backpack",
				Quantity: 1
			},
			{
				Name: "Rations (1 day)",
				Quantity: 10
			},
			{
				Name: "Amulet",
				Quantity: 1
			}
		]
	};

	if (props.user) {
		return (
			<div className="Home">
				{/* <h4 className="mainUser">Current User: {props.user.local.username}</h4> */}
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
								<td className="profRow"><button onClick={() => props.view(Magmir)} className="customButton">View</button></td>
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
				{(props.show === true) 
					?
					<div className="characterDetails">
						<h4 className="name">{props.details.Name}</h4>
						<br/>
						<table>
							<tr>
								<th className="profRow">Level</th>
								<th className="profRow">Race</th>
								<th className="profRow">Class</th>
								<th className="profRow">Background</th>
								<th className="profRow">Str</th>
								<th className="profRow">Dex</th>
								<th className="profRow">Con</th>
								<th className="profRow">Int</th>
								<th className="profRow">Wis</th>
								<th className="profRow">Char</th>
							</tr>
							<tr>
								<td className="profRow">{props.details.Level}</td>
								<td className="profRow">{props.details.Race}</td>
								<td className="profRow">{props.details.Class}</td>
								<td className="profRow">{props.details.Background}</td>
								<td className="profRow">{props.details.Strength}</td>
								<td className="profRow">{props.details.Dexterity}</td>
								<td className="profRow">{props.details.Constitution}</td>
								<td className="profRow">{props.details.Intelligence}</td>
								<td className="profRow">{props.details.Wisdom}</td>
								<td className="profRow">{props.details.Charisma}</td>
							</tr>
						</table>
						<br/>
						<h4>Equipped</h4>
						<br/>
						<table>
							<tr>
								<th className="profRow">Weapon</th>
								<td className="profRow">{props.details.Weapon}</td>
							</tr>
							<tr>
								<th className="profRow">Armor</th>
								<td className="profRow">{props.details.Armor}</td>
							</tr>
						</table>
						<br/>
						<h4>Equipment</h4>
						<br/>
						<table>
							<tr>
								<th>Item</th>
								<th>Quantity</th>
							</tr>
							{props.details.Equipment.map(item => (
									<tr key={item.Name}>
									<td className="profRow">{item.Name}</td>
									<td className="profRow">{item.Quantity}</td>
									</tr>
								))}							
						</table>
					</div>
					: null
				}
			</div>
		)
	} else {
		return (
			<div className="Home">
				{/* <h4 className="mainUser">No User</h4> */}
			</div>
		)
	}
}

export default Home
