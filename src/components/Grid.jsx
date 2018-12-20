import React, { Component } from 'react';

class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: [],
            saved: null,
        }
        this.handleClickDown = this.handleClickDown.bind(this);
        this.handleClickRelease = this.handleClickRelease.bind(this);
    }

    componentDidMount() {
        let list = [];
        for (let i = 1; i <= 400; i++) {
            list.push({ id: i, Player: "" });
        }
        list[5].Player = "Aud";
        this.setState({
            squares: list,
        });
    };

    handleClickDown(event) {
            let grid = [...this.state.squares];
            let obj = grid.find(element => element.id == event.target.id);
            console.log(obj);
            let selectedSquare = grid.findIndex(element => element.id == event.target.id);
            let player = obj.Player;
            let saved = this.state.saved;
            console.log(player);

        if (obj.Player = "" && !saved) {
            console.log("Put prompt here!");
        }
        else if (saved) {
            console.log("IF");
            grid[selectedSquare].Player = saved;
            this.setState({
                saved: null,
                squares: grid,
            });
        }
        else if (!this.state.saved) {
            console.log("ELSE IF");
            console.log(`Player: ${player}`);
            grid[selectedSquare].Player = "";
            this.setState({
                saved: player,
                squares: grid,
            })
        }
        // else if (this.state.saved) {
            
        // }
    };

    handleClickRelease(event) {
        let grid = [...this.state.squares];
        let selectedSquare = grid.findIndex(element => element.id == event.target.id);
        let player = this.state.saved;
        console.log(selectedSquare);
        grid[selectedSquare].Player = player;
        this.setState({
            saved: null,
            squares: grid,
        });
    };

    render() {
        return (
            <div className="visible" id="gridMap">
            <h4>Grid</h4>
                {this.state.squares.map(item => (
                    <div className="square" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                ))}
            </div>
        )
    }
}



export default Grid;