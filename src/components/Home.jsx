import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loggedIn: false,
			user: null,
			sessionList: [],
			reload: false,
		}
		this.handleReload = this.handleReload.bind(this);
	}

	componentDidMount() {
		setTimeout(this.handleReload, 1000);
	};

	handleReload() {
		console.log("Triggered Reload!");
		axios.get('/auth/user').then(response => {
			console.log(response.data);
			console.log("Home Did Mount!");
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user,
					reload: true,
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
					user: null,
					reload: true,
				})
			}
		})
	};

	render() {
		if (!this.props.userData) {
			return (
				<div className="Home">
					<br />
					<h2>Welcome to Dungeons and Dragons Manager!</h2>
					<h3>Please log in to check out the tool.</h3>
					{(this.state.reload === false)
						?
						<div>
							{this.handleReload()}
						</div>
						: null
					}
				</div>
			)
			
		} else {
			return (
				<div className="Home">
					<br />
					<div className="characterList">
						<h3 className="title">Characters</h3>
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
							<h3 className="title">Sessions</h3>
							<table className="characterTable">
								<tbody>
									<tr className="characterTableHeader">
										<th className="profRow">Session</th>
										<th className="profRow"> Name</th>
										<th className="profRow">Code</th>
										<th className="profRow" colSpan="8">Players</th>
									</tr>
									{this.state.sessionList.map(item => (
										<tr key={item._id}>
											<td className="profRow"><Link to={`/main/${item._id}`} className="linkingBlack"><span className="link"><FontAwesomeIcon icon="dungeon" /></span></Link></td>
											<td className="profRow">{item.name}</td>
											<td className="profRow">{item.code}</td>
											{item.players.map(item2 => (
												<td className="profRow" id="playerList">{item2}</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
						:
						<div>
							{(this.state.reload === false)
								?
								<div>
									{this.handleReload()}
								</div>
								: null
							}
						</div>
					}

				</div>
			)
		}
	}
}

export default Home
