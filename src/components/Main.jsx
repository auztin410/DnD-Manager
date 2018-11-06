import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            user: null,
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
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
    };
    
    render() {
        return (
            <div className="main">

            </div>
        )
    }
}

export default Main;