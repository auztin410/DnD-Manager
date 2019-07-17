import React, { Component } from 'react';
import axios from 'axios';
import skills from '../assets/Json/Skills';
import Equipment from '../assets/Json/Equipment';
import MagicItemsList from '../assets/Json/MagicItemsList';
import WeaponsList from '../assets/Json/WeaponsList';
import TradeGoods from '../assets/Json/TradeGoods';
import Mounts from '../assets/Json/Mounts';
import TackHarnessVehicle from '../assets/Json/Tack-Harness-Vehicle';
import Ships from '../assets/Json/Ships';
import Autocomplete from 'react-autocomplete';

class CustomCharacter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numbers: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ],
			alignment: [
				'lawful good',
				'neutral good',
				'chaotic good',
				'lawful neutral',
				'neutral',
				'chaotic neutral',
				'lawful evil',
				'neutral evil',
				'chaotic evil'
			],
			skills,
			itemType: '',
			rewardSelected: null,
			rewardList: null,
			inventory: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
	}

	componentDidMount() {
		axios.get('/auth/user').then((response) => {
			console.log(response.data);
			if (!!response.data.user) {
				console.log('THERE IS A USER');
				this.setState(
					{
						loggedIn: true,
						user: response.data.user
					},
					() => {
						axios.get(`/find/sessions/${this.state.user._id}`).then((response) => {
							console.log(response.data);
							this.setState({
								sessionList: response.data
							});
						});
					}
				);
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	handleChange(event) {
		let value = event.target.value;
		if (value === '') {
			this.setState({
				rewardSelected: '',
				rewardList: false
			});
		} else if (value === 'coin') {
			this.setState({
				rewardSelected: 'coin',
				rewardList: false
			});
		} else if (value === 'equipment') {
			this.setState({
				rewardSelected: Equipment,
				rewardList: true
			});
		} else if (value === 'weapon') {
			this.setState({
				rewardSelected: WeaponsList,
				rewardList: true
			});
		} else if (value === 'magic') {
			this.setState({
				rewardSelected: MagicItemsList,
				rewardList: true
			});
		} else if (value === 'trade') {
			this.setState({
				rewardSelected: TradeGoods,
				rewardList: true
			});
		} else if (value === 'mount') {
			this.setState({
				rewardSelected: Mounts,
				rewardList: true
			});
		} else if (value === 'harness') {
			this.setState({
				rewardSelected: TackHarnessVehicle,
				rewardList: true
			});
		} else if (value === 'ship') {
			this.setState({
				rewardSelected: Ships,
				rewardList: true
			});
		}
	}

	handleAddItem() {
		let item = this.state.value;
		let inventory = this.state.inventory;
		inventory.push(item);
		this.setState(
			{
				inventory
			},
			() => {
				this.setState({
					value: ''
				});
			}
		);
	}

	render() {
		return (
			<div id="characterCreation">
				<div className="formName box">
					<h2>Create Your Custom Character!</h2>
					<br />
					<span>
						Name: <input type="text" />
					</span>
				</div>

				<div className="formRaceClass box">
					Race: <input type="text" />
					<br />
					<br />
					Class: <input type="text" />
				</div>

				<div className="formStats box">
					<span className="stat">Str:</span>
					<select name="strength">
						{' '}
						{this.state.numbers.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}{' '}
					</select>{' '}
					<span className="stat">Dex:</span>
					<select name="dexterity">
						{' '}
						{this.state.numbers.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}{' '}
					</select>
					<br />
					<span className="stat">Con:</span>
					<select name="constitution">
						{' '}
						{this.state.numbers.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}{' '}
					</select>{' '}
					<span className="stat">Int:</span>
					<select name="intelligence">
						{' '}
						{this.state.numbers.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}{' '}
					</select>
					<br />
					<span className="stat">Wis:</span>
					<select name="wisdom">
						{' '}
						{this.state.numbers.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}{' '}
					</select>{' '}
					<span className="stat">Cha:</span>
					<select name="charisma">
						{' '}
						{this.state.numbers.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}{' '}
					</select>
				</div>

				<div className="formBackground box">
					Background<br />
					<span>
						Name: <input type="text" />
					</span>
					<br />
					<span>Description: </span> <br /> <br />
					<textarea name="" cols="30" rows="10" />
					<br />
					<span>
						Personality Traits: <input type="text" /> <button>Add</button>
					</span>
					<br />
					<span>
						Ideals: <input type="text" /> <button>Add</button>
					</span>
					<br />
					Bonds: <input type="text" /> <button>Add</button>
					<br />
					Flaw: <input type="text" /> <button>Add</button>
					<br />
					Alignment:{' '}
					<select name="alignment">
						{this.state.alignment.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className="formItems box">
					Items<br />
					<select onChange={this.handleChange} name="itemType">
						<option value="">None</option>
						<option value="equipment">Equipment</option>
						<option value="weapon">Weapon</option>
						<option value="magic">Magic Item</option>
						<option value="trade">Trade Good</option>
						<option value="mount">Mount</option>
						<option value="harness">Harness/Tackle</option>
						<option value="ship">Ship</option>
					</select>
					{this.state.rewardList === true ? (
						<div>
							<Autocomplete
								items={this.state.rewardSelected}
								inputProps={{ style: { fontSize: '18px' } }}
								shouldItemRender={(item, value) =>
									item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1}
								getItemValue={(item) => item.Name}
								renderItem={(item, highlighted) => (
									<div
										className="customButton"
										key={item.id}
										style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
									>
										{item.Name}
									</div>
								)}
								value={this.state.value}
								onChange={(e) => this.setState({ value: e.target.value })}
								onSelect={(value) => this.setState({ value })}
							/>{' '}
							<input
								onChange={this.handleChange}
								ref={(el) => (this.inputQuantity = el)}
								className="numberInput"
								type="number"
								name="rewardQuantity"
							/>{' '}
							<button onClick={this.handleAddItem}>Add Item</button>
							<br />
						</div>
					) : null}
					{this.state.inventory.length > 0 ? (
						<div> {this.state.inventory.map((item) => <div key={item}>{item}</div>)}</div>
					) : null}
				</div>

				<div className="formSkills box">
					Skills<br />
					<select name="skills">
						<option value="">None Selected</option>
						{this.state.skills.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>{' '}
					<button>Add</button>
				</div>
			</div>
		);
	}
}

export default CustomCharacter;
