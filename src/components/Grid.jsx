import React, { Component } from 'react';

class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: [],
            saved: null,
            gridSelect: "",
            terrainSelect: "",
            nameSelect: "",
        }
        this.handleClickDown = this.handleClickDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let list = [];
        for (let i = 1; i <= 400; i++) {
            list.push({ id: i, Player: "", Terrain: "" });
        }
        this.setState({
            squares: list,
        });
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleClickDown(event) {
        let select = this.state.gridSelect;
        let grid = [...this.state.squares];
        let obj = grid.find(element => element.id == event.target.id);
        console.log(obj);
        let selectedSquare = grid.findIndex(element => element.id == event.target.id);
        let player = obj.Player;
        let saved = this.state.saved;
        let terrain = this.state.terrainSelect;
        let newPlayer = this.state.nameSelect;
        console.log(player);
        switch (select) {
            case ("player"):
                if (obj.Player === "" && !saved) {
                    console.log("IF")
                    grid[selectedSquare].Player = newPlayer;
                    this.setState({
                        squares: grid,
                        nameSelect: "",
                    });
                    document.getElementById("nameInput").reset();
                }
                else if (saved) {
                    console.log("ELSE IF 1");
                    grid[selectedSquare].Player = saved;
                    this.setState({
                        saved: null,
                        squares: grid,
                    });
                }
                else if (!this.state.saved) {
                    console.log("ELSE IF 2");
                    console.log(`Player: ${player}`);
                    grid[selectedSquare].Player = "";
                    this.setState({
                        saved: player,
                        squares: grid,
                    })
                }
                break;
            case ("terrain"):
                grid[selectedSquare].Terrain = terrain;
                this.setState({
                    squares: grid,
                });
                break;
        }
    };

    render() {
        return (
            <div>
                <div className="visible" id="gridMap">
                    <h4>Grid</h4>
                    {this.state.squares.map(item => {
                        if (item.Terrain === "") {
                            return (
                                <div className="square" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "wall") {
                            return (
                                <div className="terrainWall" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "water") {
                            return (
                                <div className="terrainWater" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "door") {
                            return (
                                <div className="terrainDoor" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "trap") {
                            return (
                                <div className="terrainTrap" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "treasure") {
                            return (
                                <div className="terrainTreasure" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "lava") {
                            return (
                                <div className="terrainLava" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "rock") {
                            return (
                                <div className="terrainRock" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "forest") {
                            return (
                                <div className="terrainForest" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "swamp") {
                            return (
                                <div className="terrainSwamp" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "mountain") {
                            return (
                                <div className="terrainMountain" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "grass") {
                            return (
                                <div className="terrainGrass" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "snow") {
                            return (
                                <div className="terrainSnow" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                    })}
                </div>
                <div>
                    <select onChange={this.handleChange} name="gridSelect">
                        <option value="">None Selected</option>
                        <option value="player">Player</option>
                        <option value="terrain">Terrain</option>
                    </select>
                    <br />
                    <br />
                    {(this.state.gridSelect === "player")
                        ?
                        <div>
                            <h4>Saved: {this.state.saved}</h4>
                            <br />
                            <form id="nameInput">
                            <input onChange={this.handleChange} type="text" name="nameSelect" />
                            </form>
                        </div>
                        : null
                    }
                    {(this.state.gridSelect === "terrain")
                        ?
                        <div>
                            <select onChange={this.handleChange} name="terrainSelect">
                                <option value="">Remove</option>
                                <option value="wall">Wall</option>
                                <option value="water">Water</option>
                                <option value="door">Door</option>
                                <option value="trap">Trap</option>
                                <option value="treasure">Treasure</option>
                                <option value="lava">Lava</option>
                                <option value="rock">Rough Terrain</option>
                                <option value="forest">Forest</option>
                                <option value="swamp">Swamp</option>
                                <option value="snow">Snow</option>
                                <option value="grass">Grass</option>
                                <option value="mountain">Mountain</option>
                            </select>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}



export default Grid;