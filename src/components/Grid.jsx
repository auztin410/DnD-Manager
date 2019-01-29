import React, { Component } from 'react';
import axios from 'axios';

class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: [],
            saved: null,
            gridSelect: "",
            terrainSelect: "",
            nameSelect: "",
            gridName: "",
            newGrid: "",
            gridList: [],
        }
        this.handleClickDown = this.handleClickDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveGrid = this.handleSaveGrid.bind(this);
        this.handleNewGridMap = this.handleNewGridMap.bind(this);
        this.handleChangeGrid = this.handleChangeGrid.bind(this);
    }

    componentDidMount() {
        let list = [];
        for (let i = 1; i <= 400; i++) {
            list.push({ id: i, Player: "", Terrain: "" });
        }
        this.setState({
            squares: list,
            gridList: this.props.loaded,
        });
        
    };

    handleChange(event) {
            this.setState({
                [event.target.name]: event.target.value
            });        
    };

    handleChangeGrid(event) {
        if(event.target.value === "" || event.target.value === "new") {
            let list = [];
            for (let i = 1; i <= 400; i++) {
            list.push({ id: i, Player: "", Terrain: "" });
            }
            this.setState({
                [event.target.name]: event.target.value,
                squares: list
            });
        }
        else {
            let found = this.state.gridList.find(item => (item._id === event.target.value));
            console.log('found');
            console.log(found);
            this.setState({
                squares: found.grid,
                [event.target.name]: event.target.value
            });
        }
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

    handleSaveGrid() {
        // let url = window.location.href;
        // let sessionId = url.split("/").pop();
        // console.log(sessionId);
        // console.log(this.state.squares);
        axios.post('/grid/save/', {
            _id: this.state.gridName,
            grid: this.state.squares
        }).then((res) => {
            console.log(res);
        }).catch((err) => (console.log(err)));
    };

    handleNewGridMap(event) {
        event.preventDefault();
        axios.post('/grid/new/', {
            name: this.state.newGrid,
            grid: this.state.squares
        }).then((res) => {
            console.log(res);
            console.log(res.data._id);
            let url = window.location.href;
            let sessionId = url.split("/").pop();
            axios.post('/session/grid/', {
                sessionId: sessionId,
                gridId: res.data._id
            }).then((res) => {
                console.log(res);
                // window.location.reload();
                () => {this.props.reload()}
            });
        }).catch((err) => (console.log(err)));
    };

    render() {
        return (
            <div>
                <div className="visible" id="gridMap">
                    {this.state.squares.map(item => {
                        if (item.Terrain === "") {
                            return (
                                <div className="square" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "wallH") {
                            return (
                                <div className="terrainWallH" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "wallV") {
                            return (
                                <div className="terrainWallV" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "water") {
                            return (
                                <div className="terrainWater" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "doorH") {
                            return (
                                <div className="terrainDoorH" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
                            )
                        }
                        else if (item.Terrain === "doorV") {
                            return (
                                <div className="terrainDoorV" key={item.id} onClick={this.handleClickDown} id={item.id}>{item.Player}</div>
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
                <div className="visible" id="gridControls">
                    <br/>
                    <select onChange={this.handleChangeGrid} name="gridName">
                    <option value="">None</option>
                    <option value="new">New</option>
                    {this.state.gridList.map(item => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                    </select>
                    {/* {(this.props.loaded.grid > 0) 
                    ?
                    <select onChange={this.handleChange} name="gridName">
                    <option value="">None</option>
                    <option value="new">New</option>
                    {this.props.loaded.grid.map(item => (
                        <option key={item._id} value={item.name}>{item.name}</option>
                    ))}
                    </select>
                    : 
                    <select onChange={this.handleChange} name="gridName">
                    <option value="">None</option>
                    <option value="new">New</option>
                    </select>
                    } */}
                    <br/>
                    {(this.state.gridName === "new")
                    ?
                    <form>
                    <br/>
                    <input onChange={this.handleChange} type="text" name="newGrid"/>
                    <button onClick={this.handleNewGridMap}>Submit</button>
                    </form>
                    : null
                }
                    <br/>
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
                                <option value="wallH">Wall Horizontal</option>
                                <option value="wallV">Wall Vertical</option>
                                <option value="doorH">Door Horizontal</option>
                                <option value="doorV">Door Vertical</option>
                                <option value="water">Water</option>
                                <option value="trap">Trap</option>
                                <option value="treasure">Treasure</option>
                                <option value="lava">Lava</option>
                                <option value="forest">Forest</option>
                                <option value="swamp">Swamp</option>
                                <option value="snow">Snow</option>
                                <option value="grass">Grass</option>
                                <option value="mountain">Mountain</option>
                            </select>
                        </div>
                        : null
                    }
                    <br />
                    <div className="save" onClick={this.handleSaveGrid}><img src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/save.svg')} alt="save" height="24" /></div>
                    <br />
                </div>
            </div>
        )
    }
}



export default Grid;