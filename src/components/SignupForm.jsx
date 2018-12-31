import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import '../App.css';

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
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
	}
	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!
		axios
			.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
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
		}
		return (
			<div className="loginForm">
				<h1>Signup form</h1>
				<label htmlFor="username">Username: </label>
				<input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
					className="loginInput"
				/>
				<br/>
				<br/>
				<label htmlFor="password">Password: </label>
				<input
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
					className="loginInput"
				/>
				<br/>
				<br/>
				<label htmlFor="confirmPassword">Confirm Password: </label>
				<input
					type="password"
					name="confirmPassword"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
					className="loginInput"
					id="loginBottomInput"
				/>{" "}<div onClick={this.handleSubmit} id="registerButton" className="hexagonButton"><div className="hexagonButton-text">Register</div></div>
				<br/>
				{/* <button onClick={this.handleSubmit}>Sign up</button> */}
			</div>
		)
	}
}

export default SignupForm
