import React, { Component } from 'react';
import axios from 'axios';

class Dm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            user: null,
            sessionName: "",
        }
        
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let list = [];
        for (let i = 1; i <= 400; i++) {
            list.push({ id: i, Player: "" });
        }

        axios.get('/auth/user').then(response => {
            console.log(response.data)
            if (!!response.data.user) {
                console.log('THERE IS A USER')
                this.setState({
                    loggedIn: true,
                    user: response.data.user,
                })
            } else {
                this.setState({
                    loggedIn: false,
                    user: null,
                })
            }
        })
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <div>
                <h4>Sessions</h4>
                <br/>
                <div>
                    <form>
                        <input type="sessionName" onChange={this.handleChange}/>
                        <br/>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Dm