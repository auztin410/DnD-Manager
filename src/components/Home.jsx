import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: false,
			user: null,
			sessionList: []
		}
	}

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				}, () => {
                    axios.get(`/find/sessions/${this.state.user._id}`).then(response => {
                        console.log(response.data);
                        this.setState({
                            sessionList: response.data,
                        });
                    });
                });
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	};

	render() {
		if (this.state.user) {
			return (
				<div className="Home">
					<br/>
					<div className="characterList">
						<table className="characterTable">
						<tbody>
							<tr className="characterTableHeader">
								<th className="profRow">Name</th>
								<th className="profRow">Level</th>
								<th className="profRow">Race</th>
								<th className="profRow">Class</th>
								<th className="profRow">Background</th>
								<th className="profRow">Session</th>
								<th className="profRow">View</th>
							</tr>
							</tbody>
						</table>
					</div>
					<br />
					{(this.state.sessionList.length > 0)
						?
						<div className="characterList">
							<table className="characterTable">
								<tbody>
									<tr className="characterTableHeader">
										<th className="profRow">Session Link</th>
										<th className="profRow">Session Name</th>
										<th className="profRow">Code</th>
										<th className="profRow" colSpan="8">Players</th>
									</tr>
									{this.state.sessionList.map(item => (
										<tr key={item._id}>
											<td className="profRow"><button>Go to Session</button></td>
											<td className="profRow">{item.name}</td>
											<td className="profRow">{item.code}</td>
											{item.players.map(item2 => (
												<td className="profRow">{item2}</td>
											))}
										</tr>
									))}
								</tbody>
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
}

export default Home
