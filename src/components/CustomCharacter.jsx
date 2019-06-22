import React, { Component } from 'react';
import axios from 'axios';

class CustomCharacter extends Component {
	constructor(props) {
		super(props);
		this.state = {};
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
				<div className="formName">
					<h2>Create Your Custom Character!</h2>
					<br />
					<span>
						Name: <input type="text" />
					</span>
				</div>

				<div className="formRaceClass">
					Race: <input type="text" />
					<br />
					Class: <input type="text" />
				</div>

				<div className="formStats">
					Str: <input className="stats" type="number" /> Dex: <input className="stats" type="number" />
					<br />
					Const: <input className="stats" type="number" /> Int: <input className="stats" type="number" />
					<br />
					Wis: <input className="stats" type="number" /> Char: <input className="stats" type="number" />
				</div>
			</div>
		);
	}
}

export default CustomCharacter;
