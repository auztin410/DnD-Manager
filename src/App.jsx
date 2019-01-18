import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/SignupForm';
// import Header from './components/Header';
import Home from './components/Home';
import Main from './components/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faHouseDamage, faDungeon, faSignOutAlt, faUser, faUserPlus} from '@fortawesome/free-solid-svg-icons';

library.add(faHouseDamage, faDungeon, faSignOutAlt, faUser, faUserPlus);

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<div className="navbar">
				<div className="ddm">DDM</div>
				<div className="user">User: {props.user.local.username}</div>
				<div className="links">
				<Link to="/">
					<span className="link"><FontAwesomeIcon icon="house-damage" /></span>
					
						</Link>
				{" "}

				<Link to="/main">
					<span className="link"><FontAwesomeIcon icon="dungeon" /></span>
						</Link>
				{" "}
				<Link to="#" onClick={props._logout}>
					<span className="link"><FontAwesomeIcon icon="sign-out-alt" /></span>
						</Link>
				</div>
			</div>
		)
	} else {
		return (
			<div className="navbar">
			<div className="ddm">DDM</div>
			<div className="user">No User</div>
			<div className="links">
				<Link to="/" className="nav-link">
					<span className="link"><FontAwesomeIcon icon="house-damage" /></span>
						</Link>
				{" "}
				<Link to="/login" className="nav-link">
					<span className="link"><FontAwesomeIcon icon="user" /></span>
						</Link>
				{" "}
				<Link to="/signup" className="nav-link">
					<span className="link"><FontAwesomeIcon icon="user-plus" /></span>
						</Link>
			</div>
			</div>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			d20: true,
			characterDetails: false,
			details: [],
		}
		this._logout = this._logout.bind(this);
		this._login = this._login.bind(this);
		this.handleView = this.handleView.bind(this);
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	};

	handleView(details) {
		console.log("Test prop function");
		if(this.state.characterDetails === false) {
			this.setState({
				characterDetails: true,
				details,
			});
		}
		else if (this.state.characterDetails === true) {
			this.setState({
				characterDetails: false,
				details: [],
			});
		}		
	};

	render() {
		return (
			<div className="App">
					{/* <h1 className="header">Dungeons and Dragons Game Manager</h1> */}
				{/* <Header user={this.state.user} /> */}
				{/* LINKS to our different 'pages' */}
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} user={this.state.user} />
				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				<Route exact path="/" render={() => <Home user={this.state.user} view={this.handleView} show={this.state.characterDetails} details={this.state.details} />} />
				<Route
					exact
					path="/login"
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>
				<Route exact path="/signup" component={SignupForm} />

				<Route exact path="/main" component={Main} />	
				
			</div>
		)
	}
}

export default App
