import React, { Component } from 'react';
import axios from 'axios';
import Draggable, { DraggableCore } from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CharacterCreation from './CharacterCreation';
import Sounds from './Sounds';
import Grid from './Grid';
import QuestTracker from './QuestTracker';
import Loot from './Loot';
import Treasure from './Treasure';
import NPCGenerator from './NPCGenerator';
import BigEvent from './BigEvent';
import Creature from './Creature';
import TransDiv from './TransDiv';
import Merchant from './Merchant';
import Settlement from './Settlement';




class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            user: null,
            sessionData: null,
            arrow: [false, "0px"],
            npcComponent: false,
            worldShakingComponent: false,
            individualLootDiv: false,
            treasureLootDiv: false,
            npcDiv: false,
            bigEventDiv: false,
            monsterDiv: false,
            soundDiv: false,
            settlementDiv: false,
            translationDiv: false,
            worldMapDiv: false,
            gridDiv: false,
            equipmentDiv: false,
            merchantDiv: false,
            characterDiv: false,
            questDiv: false,
        }

        this.handleArrow = this.handleArrow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpenClose = this.handleOpenClose.bind(this);
    }

    componentDidMount() {
        let list = [];
        for (let i = 1; i <= 400; i++) {
            list.push({ id: i, Player: "" });
        }

        axios.get('/auth/user').then(response => {
            console.log(response.data)
            if (!!response.data.user) {
                console.log('THERE IS A USER');
                this.setState({
                    loggedIn: true,
                    user: response.data.user,
                }, () => {
                    let url = window.location.href;
                    let sessionId = url.split("/").pop();
                    console.log(sessionId);
                    axios.get(`/session/load/${sessionId}/${this.state.user._id}`).then(response => {
                        console.log("Find Session Response");
                        console.log(response);
                        this.setState({
                            sessionData: response.data,
                        });
                    }).catch((err) => (console.log(err)));
                });
            } else {
                this.setState({
                    loggedIn: false,
                    user: null,
                });
            }
        });
    };

    handleArrow() {
        if (this.state.arrow[0] === false) {
            this.setState({
                arrow: [true, "150px"]
            });
        }
        else if (this.state.arrow[0] === true) {
            this.setState({
                arrow: [false, "0px"]
            });
        }
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleOpenClose(div) {
        switch (div) {
            case ("loot"):
                if (this.state.individualLootDiv === false) {
                    this.setState({
                        individualLootDiv: true
                    });
                }
                else if (this.state.individualLootDiv === true) {
                    this.setState({
                        individualLootDiv: false
                    });
                }
                break;
            case ("treasure"):
                if (this.state.treasureLootDiv === false) {
                    this.setState({
                        treasureLootDiv: true
                    });
                }
                else if (this.state.treasureLootDiv === true) {
                    this.setState({
                        treasureLootDiv: false
                    });
                }
                break;
            case ("npc"):
                if (this.state.npcDiv === false) {
                    this.setState({
                        npcDiv: true
                    });
                }
                else if (this.state.npcDiv === true) {
                    this.setState({
                        npcDiv: false
                    });
                }
                break;
            case ("bigEvent"):
                if (this.state.bigEventDiv === false) {
                    this.setState({
                        bigEventDiv: true
                    });
                }
                else if (this.state.bigEventDiv === true) {
                    this.setState({
                        bigEventDiv: false
                    });
                }
                break;
            case ("enemy"):
                if (this.state.monsterDiv === false) {
                    this.setState({
                        monsterDiv: true
                    });
                }
                else if (this.state.monsterDiv === true) {
                    this.setState({
                        monsterDiv: false
                    });
                }
                break;
            case ("translation"):
                if (this.state.translationDiv === false) {
                    this.setState({
                        translationDiv: true
                    });
                }
                else if (this.state.translationDiv === true) {
                    this.setState({
                        translationDiv: false
                    });
                }
                break;
            case ("gridMap"):
                if (this.state.gridDiv === false) {
                    this.setState({
                        gridDiv: true,
                    });
                }
                else if (this.state.gridDiv === true) {
                    this.setState({
                        gridDiv: false
                    });
                }
                break;
            case ("equipment"):
                if (this.state.equipmentDiv === false) {
                    this.setState({
                        equipmentDiv: true,
                    });
                }
                else if (this.state.equipmentDiv === true) {
                    this.setState({
                        equipmentDiv: false
                    });
                }
                break;
            case ("merchant"):
                if (this.state.merchantDiv === false) {
                    this.setState({
                        merchantDiv: true,
                    });
                }
                else if (this.state.merchantDiv === true) {
                    this.setState({
                        merchantDiv: false
                    });
                }
                break;
            case ("sound"):
                if (this.state.soundDiv === false) {
                    this.setState({
                        soundDiv: true,
                    });
                }
                else if (this.state.soundDiv === true) {
                    this.setState({
                        soundDiv: false
                    });
                }
                break;
            case ("settlement"):
                if (this.state.settlementDiv === false) {
                    this.setState({
                        settlementDiv: true,
                    });
                }
                else if (this.state.settlementDiv === true) {
                    this.setState({
                        settlementDiv: false
                    });
                }
                break;
            case ("character"):
                if (this.state.characterDiv === false) {
                    this.setState({
                        characterDiv: true,
                    });
                }
                else if (this.state.characterDiv === true) {
                    this.setState({
                        characterDiv: false
                    });
                }
                break;
            case ("quest"):
                if (this.state.questDiv === false) {
                    this.setState({
                        questDiv: true,
                    });
                }
                else if (this.state.questDiv === true) {
                    this.setState({
                        questDiv: false
                    });
                }
                break;
        }

    };

    render() {

        if (this.state.npcComponent === true) {
            return (
                <div className="treasureHordeContainer">
                    <div className="main">

                    </div>
                    <div>
                        <button onClick={this.handleWorldShakingEvent}>World Shaking Event Generator</button>
                    </div>
                </div>
            )
        }
        else if (this.state.worldShakingComponent === true) {
            return (
                <div className="treasureHordeContainer">
                    <div className="main">

                    </div>
                    <div>
                        <button onClick={this.handleWorldShakingEvent}>World Shaking Event Generator</button>
                        <br />
                        <br />

                    </div>
                </div>
            )
        }
        else if (this.state.npcComponent === false) {
            return (
                <div>



                    <div className="upArrow" style={{ height: this.state.arrow[1] }}>
                        <div className="bannerContainer">
                            <div className={(this.state.individualLootDiv === true) ? "bannerOpen" : "bannerBlack"} id="bannerFifthInner" onClick={() => this.handleOpenClose("loot")}><FontAwesomeIcon icon="coins" className="bannerIcon" /></div>
                            <div className={(this.state.treasureLootDiv === true) ? "bannerOpen" : "bannerGrey"} id="bannerFourthInner" onClick={() => this.handleOpenClose("treasure")}><FontAwesomeIcon icon="dice-d20" className="bannerIcon" /></div>
                            <div className={(this.state.npcDiv === true) ? "bannerOpen" : "bannerRed"} id="bannerThirdInner" onClick={() => this.handleOpenClose("npc")}><FontAwesomeIcon icon="address-card" className="bannerIcon" /></div>
                            <div className={(this.state.bigEventDiv === true) ? "bannerOpen" : "bannerBlack"} id="bannerSecondInner" onClick={() => this.handleOpenClose("bigEvent")}><FontAwesomeIcon icon="cloud-moon" className="bannerIcon" /></div>
                            <div className={(this.state.monsterDiv === true) ? "bannerOpen" : "bannerGrey"} id="bannerInner" onClick={() => this.handleOpenClose("enemy")}><FontAwesomeIcon icon="dragon" className="bannerIcon" /></div>
                            <div className={(this.state.translationDiv === true) ? "bannerOpen" : "bannerRed"} id="bannerMiddle" onClick={() => this.handleOpenClose("translation")}><FontAwesomeIcon icon="map-signs" className="bannerIcon" /></div>
                            <div className={(this.state.gridDiv === true) ? "bannerOpen" : "bannerGrey"} id="bannerInner" onClick={() => this.handleOpenClose("gridMap")}><FontAwesomeIcon icon="chess-board" className="bannerIcon" /></div>
                            <div className={(this.state.merchantDiv === true) ? "bannerOpen" : "bannerBlack"} id="bannerSecondInner" onClick={() => this.handleOpenClose("merchant")}><FontAwesomeIcon icon="hands-helping" className="bannerIcon" /></div>
                            <div className={(this.state.soundDiv === true) ? "bannerOpen" : "bannerRed"} id="bannerThirdInner" onClick={() => this.handleOpenClose("sound")}><FontAwesomeIcon icon="drum" className="bannerIcon" /></div>
                            <div className={(this.state.settlementDiv === true) ? "bannerOpen" : "bannerGrey"} id="bannerFourthInner" onClick={() => this.handleOpenClose("settlement")}><FontAwesomeIcon icon="landmark" className="bannerIcon" /></div>
                            <div className={(this.state.questDiv === true) ? "bannerOpen" : "bannerBlack"} id="bannerFifthInner" onClick={() => this.handleOpenClose("quest")}><FontAwesomeIcon icon="exclamation" className="bannerIcon" /></div>
                        </div>
                    </div>
                    {(this.state.arrow[0] === false)
                        ?
                        <div><FontAwesomeIcon onClick={this.handleArrow} icon="caret-down" className="arrowIcon" /></div>
                        :
                        <div className="UpArrow"><FontAwesomeIcon onClick={this.handleArrow} icon="caret-up" className="arrowIcon" /></div>
                    }


                    {/* Left and Right Arrows */}
                    <span className="leftArrow"><img src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/angle-left.svg')} alt="leftArrow"/></span>
                    <span className="rightArrow"><img src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/angle-right.svg')} alt="rightArrow"/></span>


                    {/* Individual Loot Div */}
                    {(this.state.individualLootDiv === true)
                        ?
                        <Loot/>
                        : null
                    }
                    {/* Treasure Loot Div */}
                    {(this.state.treasureLootDiv === true)
                        ?
                        <Treasure/>
                        : null
                    }
                    {/* NPC Div */}
                    {(this.state.npcDiv === true)
                        ?
                        <NPCGenerator/>
                        : null
                    }
                    {/* World Shaking Event Div */}
                    {(this.state.bigEventDiv === true)
                        ?
                        <BigEvent/>
                        : null
                    }
                    {/* Monster Generator Div */}
                    {(this.state.monsterDiv === true)
                        ?
                        <Creature/>
                        : null
                    }
                    {/* Translation Div  */}
                    {(this.state.translationDiv === true)
                        ?
                        <TransDiv/>
                        : null
                    }
                    {/* Grid Div */}
                    {(this.state.gridDiv === true)
                        ? <Grid/>
                        : null
                    }

                    {/* Merchant Div */}
                    {(this.state.merchantDiv === true)
                        ?
                        <Merchant/>
                        : null
                    }
                    {(this.state.soundDiv === true)
                        ? <Sounds/>
                        : null
                    }
                    {(this.state.settlementDiv === true)
                        ?
                        <Settlement/>
                        : null
                    }
                    {(this.state.characterDiv === true)
                        ? <CharacterCreation />
                        : null
                    }
                    {(this.state.questDiv === true)
                        ? <QuestTracker />
                        : null
                    }
                </div>
            )
        }

    }
}

export default Main;