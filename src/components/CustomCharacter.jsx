import React, { Component } from 'react';
import axios from 'axios';

class CustomCharacter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numbers: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]
		};
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
			</div>
		);
	}
}

export default CustomCharacter;
