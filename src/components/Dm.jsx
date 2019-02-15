import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Dm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            user: null,
            sessionName: "",
            code: "",
            sessionList: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/auth/user').then(response => {
            console.log(response.data)
            if (!!response.data.user) {
                console.log('THERE IS A USER')
                this.setState({
                    loggedIn: true,
                    user: response.data.user,
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
                })
            }
        })
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/create/session/', {
            name: this.state.sessionName,
            userId: this.state.user._id,
            code: this.state.code,
        }).then((res) => {
            console.log(res);
            console.log(res.data._id);
        }).catch((err) => (console.log(err)))
    };

    render() {
        return (
            <div>
                <h4>Sessions</h4>
                <br />
                <div>
                    <form>
                        <input type="text" name="sessionName" onChange={this.handleChange} />
                        <br />
                        <input type="text" name="code" onChange={this.handleChange} />
                        <br />
                        <button onClick={this.handleSubmit}>Submit</button>
                    </form>
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
                    : null
                }
            </div>
        )
    }
}

export default Dm