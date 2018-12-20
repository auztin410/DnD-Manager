import React, { Component } from 'react';
import { blackLotus, nightSounds, darkWinds, rumination, beach, bigStorm, carnivalRide, dryLava, earthquake, fire, firePlace, forestFire, forest, heartbeat, hurricane, jungle, noMoreMagic, ocean, rain, rainThunder, song18, storm, swamp, loomingBattle, wind, windHowl } from '../assets/Music';
import ReactHowler from 'react-howler';

class Sounds extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sounds: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        }
        this.handlePlay = this.handlePlay.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    handlePlay(event) {
        console.log(`Sound ${event.target.id}`);
        let sounds = [...this.state.sounds];
        switch (event.target.id) {
            case ("darkWinds"):
                sounds[0] = true;
                break;
            case ("blackLotus"):
                sounds[1] = true;
                break;
            case ("nightSounds"):
                sounds[2] = true;
                break;
            case ("rumination"):
                sounds[3] = true;
                break;
            case ("beach"):
                sounds[4] = true;
                break;
            case ("bigStorm"):
                sounds[5] = true;
                break;
            case ("carnivalRide"):
                sounds[6] = true;
                break;
            case ("dryLava"):
                sounds[7] = true;
                break;
            case ("earthquake"):
                sounds[8] = true;
                break;
            case ("fire"):
                sounds[9] = true;
                break;
            case ("fireplace"):
                sounds[10] = true;
                break;
            case ("forestFire"):
                sounds[11] = true;
                break;
            case ("forest"):
                sounds[12] = true;
                break;
            case ("heartbeat"):
                sounds[13] = true;
                break;
            case ("hurricane"):
                sounds[14] = true;
                break;
            case ("jungle"):
                sounds[15] = true;
                break;
            case ("noMoreMagic"):
                sounds[16] = true;
                break;
            case ("ocean"):
                sounds[17] = true;
                break;
            case ("rain"):
                sounds[18] = true;
                break;
            case ("rainThunder"):
                sounds[19] = true;
                break;
            case ("song18"):
                sounds[20] = true;
                break;
            case ("storm"):
                sounds[21] = true;
                break;
            case ("swamp"):
                sounds[22] = true;
                break;
            case ("loomingBattle"):
                sounds[23] = true;
                break;
            case ("wind"):
                sounds[24] = true;
                break;
            case ("windHowl"):
                sounds[25] = true;
                break;
        }
        this.setState({
            sounds,
        });

    };

    handleStop(event) {
        let sounds = [...this.state.sounds];
        switch (event.target.id) {
            case ("darkWinds"):
                sounds[0] = false;
                break;
            case ("blackLotus"):
                sounds[1] = false;
                break;
            case ("nightSounds"):
                sounds[2] = false;
                break;
            case ("rumination"):
                sounds[3] = false;
                break;
            case ("beach"):
                sounds[4] = false;
                break;
            case ("bigStorm"):
                sounds[5] = false;
                break;
            case ("carnivalRide"):
                sounds[6] = false;
                break;
            case ("dryLava"):
                sounds[7] = false;
                break;
            case ("earthquake"):
                sounds[8] = false;
                break;
            case ("fire"):
                sounds[9] = false;
                break;
            case ("fireplace"):
                sounds[10] = false;
                break;
            case ("forestFire"):
                sounds[11] = false;
                break;
            case ("forest"):
                sounds[12] = false;
                break;
            case ("heartbeat"):
                sounds[13] = false;
                break;
            case ("hurricane"):
                sounds[14] = false;
                break;
            case ("jungle"):
                sounds[15] = false;
                break;
            case ("noMoreMagic"):
                sounds[16] = false;
                break;
            case ("ocean"):
                sounds[17] = false;
                break;
            case ("rain"):
                sounds[18] = false;
                break;
            case ("rainThunder"):
                sounds[19] = false;
                break;
            case ("song18"):
                sounds[20] = false;
                break;
            case ("storm"):
                sounds[21] = false;
                break;
            case ("swamp"):
                sounds[22] = false;
                break;
            case ("loomingBattle"):
                sounds[23] = false;
                break;
            case ("wind"):
                sounds[24] = false;
                break;
            case ("windHowl"):
                sounds[25] = false;
                break;
        }
        this.setState({
            sounds,
        });
    };

    render() {
        return (
            <div className="visible" id="soundDiv">
                            {(this.state.sounds[0] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Dark Winds</h4>
                                    <span onClick={this.handleStop} id="darkWinds" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={darkWinds}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Dark Winds</h4>
                                    <span onClick={this.handlePlay} id="darkWinds" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[1] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Black Lotus</h4>
                                    <span onClick={this.handleStop} id="blackLotus" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={blackLotus}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Black Lotus</h4>
                                    <span onClick={this.handlePlay} id="blackLotus" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[2] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Night Sounds</h4>
                                    <span onClick={this.handleStop} id="nightSounds" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={nightSounds}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Night Sounds</h4>
                                    <span onClick={this.handlePlay} id="nightSounds" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[3] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Rumination</h4>
                                    <span onClick={this.handleStop} id="rumination" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={rumination}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Rumination</h4>
                                    <span onClick={this.handlePlay} id="rumination" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[4] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Beach</h4>
                                    <span onClick={this.handleStop} id="beach" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={beach}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Beach</h4>
                                    <span onClick={this.handlePlay} id="beach" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[5] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Big Storm</h4>
                                    <span onClick={this.handleStop} id="bigStorm" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={bigStorm}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Big Storm</h4>
                                    <span onClick={this.handlePlay} id="bigStorm" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[6] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Carnival Ride</h4>
                                    <span onClick={this.handleStop} id="carnivalRide" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={carnivalRide}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Carnival Ride</h4>
                                    <span onClick={this.handlePlay} id="carnivalRide" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[7] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Dry Lava</h4>
                                    <span onClick={this.handleStop} id="dryLava" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={dryLava}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Dry Lava</h4>
                                    <span onClick={this.handlePlay} id="dryLava" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[8] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Earthquake</h4>
                                    <span onClick={this.handleStop} id="earthquake" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={earthquake}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Earthquake</h4>
                                    <span onClick={this.handlePlay} id="earthquake" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[9] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Fire</h4>
                                    <span onClick={this.handleStop} id="fire" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={fire}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Fire</h4>
                                    <span onClick={this.handlePlay} id="fire" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[10] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Fireplace</h4>
                                    <span onClick={this.handleStop} id="fireplace" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={firePlace}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Fireplace</h4>
                                    <span onClick={this.handlePlay} id="fireplace" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[11] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Forest Fire</h4>
                                    <span onClick={this.handleStop} id="forestFire" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={forestFire}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Forest Fire</h4>
                                    <span onClick={this.handlePlay} id="forestFire" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[12] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Forest</h4>
                                    <span onClick={this.handleStop} id="forest" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={forest}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Forest</h4>
                                    <span onClick={this.handlePlay} id="forest" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[13] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Heartbeat</h4>
                                    <span onClick={this.handleStop} id="heartbeat" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={heartbeat}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Heartbeat</h4>
                                    <span onClick={this.handlePlay} id="heartbeat" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[14] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Hurricane</h4>
                                    <span onClick={this.handleStop} id="hurricane" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={hurricane}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Hurricane</h4>
                                    <span onClick={this.handlePlay} id="hurricane" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[15] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Jungle</h4>
                                    <span onClick={this.handleStop} id="jungle" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={jungle}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Jungle</h4>
                                    <span onClick={this.handlePlay} id="jungle" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[16] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">No More Magic</h4>
                                    <span onClick={this.handleStop} id="noMoreMagic" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={noMoreMagic}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">No More Magic</h4>
                                    <span onClick={this.handlePlay} id="noMoreMagic" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[17] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Ocean</h4>
                                    <span onClick={this.handleStop} id="ocean" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={ocean}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Ocean</h4>
                                    <span onClick={this.handlePlay} id="ocean" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[18] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Rain</h4>
                                    <span onClick={this.handleStop} id="rain" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={rain}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Rain</h4>
                                    <span onClick={this.handlePlay} id="rain" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[19] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Rain and Thunder</h4>
                                    <span onClick={this.handleStop} id="rainThunder" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={rainThunder}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Rain and Thunder</h4>
                                    <span onClick={this.handlePlay} id="rainThunder" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[20] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Song 18</h4>
                                    <span onClick={this.handleStop} id="song18" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={song18}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Song 18</h4>
                                    <span onClick={this.handlePlay} id="song18" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[21] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Storm</h4>
                                    <span onClick={this.handleStop} id="storm" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={storm}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Storm</h4>
                                    <span onClick={this.handlePlay} id="storm" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[22] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Swamp</h4>
                                    <span onClick={this.handleStop} id="swamp" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={swamp}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Swamp</h4>
                                    <span onClick={this.handlePlay} id="swamp" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[23] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Looming Battle</h4>
                                    <span onClick={this.handleStop} id="loomingBattle" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={loomingBattle}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Looming Battle</h4>
                                    <span onClick={this.handlePlay} id="loomingBattle" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[24] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Wind</h4>
                                    <span onClick={this.handleStop} id="wind" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={wind}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Wind</h4>
                                    <span onClick={this.handlePlay} id="wind" className="soundButton">Play</span></div>
                            }
                            {(this.state.sounds[25] === true)
                                ?
                                <div className="soundSection">
                                    <h4 className="soundTitle">Wind Howl</h4>
                                    <span onClick={this.handleStop} id="windHowl" className="soundButton">Stop</span>
                                    <ReactHowler
                                        src={windHowl}
                                        playing={true}
                                        loop={true}
                                        ref={(ref) => (this.player = ref)}
                                    />
                                </div>
                                :
                                <div className="soundSection">
                                    <h4 className="soundTitle">Wind Howl</h4>
                                    <span onClick={this.handlePlay} id="windHowl" className="soundButton">Play</span></div>
                            }
                        </div>
        )
    }
}

export default Sounds;