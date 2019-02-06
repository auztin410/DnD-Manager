import React, { Component } from 'react';

class Loot extends Component {
    constructor(props) {
        super(props)
        this.state = {
            individualLoot: "Challenge0-4",
            individualLootCurrency: [],
            individualLootResult: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRoll = this.handleRoll.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    DiceRoll(times, sides) {
        var allRolls = [];
        var i;
        for (i = 0; i < times; i++) {
            var roll = Math.floor(Math.random() * sides) + 1;
            allRolls.push(roll);
        }
        var result = allRolls.reduce(add, 0);
        function add(a, b) {
            return a + b;
        }
        // console.log(`Dice roll ${result}`);
        return result;
    };

    handleRoll(event) {
        event.preventDefault();
        let individualLoot = this.DiceRoll(1, 100);
        console.log(`Individual loot ${individualLoot}`);
        switch (this.state.individualLoot) {
            case "Challenge0-4":
                if (individualLoot <= 30) {
                    let roll = this.DiceRoll(5, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: roll
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: 0
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot <= 60) {
                    let roll = this.DiceRoll(4, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: roll
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: 0
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot <= 70) {
                    let roll = this.DiceRoll(3, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: roll
                            },
                            {
                                Currency: "GP",
                                Value: 0
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot <= 95) {
                    let roll = this.DiceRoll(3, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: roll
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot >= 96) {
                    let roll = this.DiceRoll(1, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: 0
                            },
                            {
                                Currency: "PP",
                                Value: roll
                            }
                        ]
                    });
                }
                break;
            case "Challenge5-10":
                if (individualLoot <= 30) {
                    let roll = this.DiceRoll(4, 6);
                    let roll2 = this.DiceRoll(1, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: roll
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: roll2
                            },
                            {
                                Currency: "GP",
                                Value: 0
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot <= 60) {
                    let roll = this.DiceRoll(6, 6);
                    let roll2 = this.DiceRoll(2, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: roll
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: roll2
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot <= 70) {
                    let roll = this.DiceRoll(3, 6);
                    let roll2 = this.DiceRoll(2, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: roll
                            },
                            {
                                Currency: "GP",
                                Value: roll2
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot <= 95) {
                    let roll = this.DiceRoll(4, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: roll
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot >= 96) {
                    let roll = this.DiceRoll(2, 6);
                    let roll2 = this.DiceRoll(3, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: roll
                            },
                            {
                                Currency: "PP",
                                Value: roll2
                            }
                        ]
                    });
                }
                break;
            case "Challenge11-16":
                if (individualLoot >= 20) {
                    let roll = this.DiceRoll(4, 6);
                    let roll2 = this.DiceRoll(1, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: roll
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: roll2
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot >= 35) {
                    let roll = this.DiceRoll(1, 6);
                    let roll2 = this.DiceRoll(1, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: roll
                            },
                            {
                                Currency: "GP",
                                Value: roll2
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot >= 75) {
                    let roll = this.DiceRoll(2, 6);
                    let roll2 = this.DiceRoll(1, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: roll
                            },
                            {
                                Currency: "PP",
                                Value: roll2
                            }
                        ]
                    });
                }
                else if (individualLoot <= 76) {
                    let roll = this.DiceRoll(2, 6);
                    let roll2 = this.DiceRoll(2, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: roll
                            },
                            {
                                Currency: "PP",
                                Value: roll2
                            }
                        ]
                    });
                }
                break;
            case "Challenge17+":
                if (individualLoot >= 15) {
                    let roll = this.DiceRoll(2, 6);
                    let roll2 = this.DiceRoll(8, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: roll
                            },
                            {
                                Currency: "GP",
                                Value: roll2
                            },
                            {
                                Currency: "PP",
                                Value: 0
                            }
                        ]
                    });
                }
                else if (individualLoot >= 55) {
                    let roll = this.DiceRoll(1, 6);
                    let roll2 = this.DiceRoll(1, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: roll
                            },
                            {
                                Currency: "PP",
                                Value: roll2
                            }
                        ]
                    });
                }
                else if (individualLoot <= 56) {
                    let roll = this.DiceRoll(1, 6);
                    let roll2 = this.DiceRoll(2, 6);
                    this.setState({
                        individualLootResult: [
                            {
                                Currency: "CP",
                                Value: 0
                            },
                            {
                                Currency: "SP",
                                Value: 0
                            },
                            {
                                Currency: "EP",
                                Value: 0
                            },
                            {
                                Currency: "GP",
                                Value: roll
                            },
                            {
                                Currency: "PP",
                                Value: roll2
                            }
                        ]
                    });
                }
                break;
            default:
                console.log("Default was hit!")
        }
    };


    render() {
        return (
            <div className="visible" id="individualLoot">
                <form>
                    <select className="customButton" name="individualLoot" onChange={this.handleChange}>
                        <option value="Challenge0-4">Challenge 0-4</option>
                        <option value="Challenge5-10">Challenge 5-10</option>
                        <option value="Challenge11-16">Challenge 11-16</option>
                        <option value="Challenge17+">Challenge 17+</option>
                    </select>
                    <span className="customButton" onClick={this.handleRoll}>Dice Roll!</span>
                </form>
                <div className="generated">
                    <h4>Individual Loot:</h4>
                    {this.state.individualLootResult.map(item => (
                        <p key={item.Currency}>{item.Value}{" "}{item.Currency}</p>
                    ))}
                </div>
            </div>
        )
    }
}

export default Loot;