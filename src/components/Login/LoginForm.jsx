import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../App.css';

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	};

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	};

	handleKeyPress = (event) => {
		if(event.key == 'Enter'){
			this.handleSubmit(event);
		}
	  };

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="loginForm">
					<form className="login">
						<span className="loginText">Username:</span>
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
							onKeyPress={this.handleKeyPress}
							className="loginInput"
							id="loginTopInput"
						/>
						<br/>
						<span className="loginText">Password:</span>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
							onKeyPress={this.handleKeyPress}
							className="loginInput"
							id="loginBottomInput"
						/>{" "}<div onClick={this.handleSubmit} id="loginButton" className="hexagonButton"><div className="hexagonButton-text">Login</div></div>
					</form>
				</div>
			)
		}
	}
}

export default LoginForm
