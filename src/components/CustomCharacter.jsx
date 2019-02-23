import React, { Component } from 'react';
import axios from 'axios';

class CustomCharacter extends Component {
    constructor(props) {
        super(props)
        this.state = {

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

    render(){
        return(
            <div id="characterCreation">
                <h2>Create Your Custom Character!</h2>
                <br/>
               <span>Name<input type="text"/></span>
            </div>
        )
    }
}

export default CustomCharacter;