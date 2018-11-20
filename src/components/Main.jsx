import React, { Component } from 'react';
import axios from 'axios';
import NpcGenerator from '../assets/Json/NpcGenerator';
import Npc from './Npc';
import WorldEventGenerator from '../assets/Json/World-Shaking-Events';
import WorldShakingEvent from './WorldShakingEvent';
import MagicItemsTables from '../assets/Json/MagicItemTables';
import GemList from '../assets/Json/Gemstones';
import ArtObjectList from '../assets/Json/ArtObject';
import MagicItemsList from '../assets/Json/MagicItemsList';
import Translation from './Translation';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            user: null,
            npc: [],
            npcComponent: false,
            worldShakingEvent: null,
            worldShakingDetails: null,
            worldShakingComponent: false,
            individualLoot: "Challenge0-4",
            individualLootCurrency: [],
            individualLootResult: [],
            treasureLoot: "Challenge0-4",
            treasureCurrency: [],
            treasureGemResults: [],
            treasureArtResults: [],
            treasureMagicItemResults: [],
            displayItem: null,
            displayItemArmorDetails: null,
            textToTranslate: null,
            language: "Elvish",
            displayTranslation: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNpcGenerator = this.handleNpcGenerator.bind(this);
        this.handleWorldShakingEvent = this.handleWorldShakingEvent.bind(this);
        this.DiceRoll = this.DiceRoll.bind(this);
        this.handleRoll = this.handleRoll.bind(this);
        this.handleTreasureLoot = this.handleTreasureLoot.bind(this);
        this.clearTreasureStates = this.clearTreasureStates.bind(this);
        this.handleCloseDisplayItem = this.handleCloseDisplayItem.bind(this);
        this.handleTranslate = this.handleTranslate.bind(this);
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

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleNpcGenerator(event) {
        let appearance = NpcGenerator.appearance[Math.floor(Math.random() * NpcGenerator.appearance.length)];
        let highAbility = NpcGenerator.highAbility[Math.floor(Math.random() * NpcGenerator.highAbility.length)];
        let lowAbility = NpcGenerator.lowAbility[Math.floor(Math.random() * NpcGenerator.lowAbility.length)];
        let talents = NpcGenerator.talents[Math.floor(Math.random() * NpcGenerator.talents.length)];
        let mannerism = NpcGenerator.mannerism[Math.floor(Math.random() * NpcGenerator.mannerism.length)];
        let trait = NpcGenerator.trait[Math.floor(Math.random() * NpcGenerator.trait.length)];
        let ideals = NpcGenerator.ideals[Math.floor(Math.random() * NpcGenerator.ideals.length)];
        let bonds = NpcGenerator.bonds[Math.floor(Math.random() * NpcGenerator.bonds.length)];
        let flawsSecrets = NpcGenerator.flawsSecrets[Math.floor(Math.random() * NpcGenerator.flawsSecrets.length)];
        let name = NpcGenerator.name[Math.floor(Math.random() * NpcGenerator.name.length)];

        this.setState({
            npc: { name, appearance, highAbility, lowAbility, talents, mannerism, trait, ideals, bonds, flawsSecrets },
            npcComponent: true,
        });
    };


    handleWorldShakingEvent(event) {
        let bigEvent = WorldEventGenerator.Event[Math.floor(Math.random() * WorldEventGenerator.Event.length)];
        if (bigEvent === "Rise of a leader or an era" || bigEvent === "Fall of a leader or an era") {
            let details = WorldEventGenerator.Leader[Math.floor(Math.random() * WorldEventGenerator.Leader.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "Cataclysmic disaster") {
            let details = WorldEventGenerator.Disaster[Math.floor(Math.random() * WorldEventGenerator.Disaster.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "Assault or invasion") {
            let details = WorldEventGenerator.Invasion[Math.floor(Math.random() * WorldEventGenerator.Invasion.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "Extinction or depletion") {
            let details = WorldEventGenerator.Extinction[Math.floor(Math.random() * WorldEventGenerator.Extinction.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "New organization") {
            let details = WorldEventGenerator.Organization[Math.floor(Math.random() * WorldEventGenerator.Organization.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else if (bigEvent === "Discovery, expansion, invention") {
            let details = WorldEventGenerator.Discovery[Math.floor(Math.random() * WorldEventGenerator.Discovery.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
                worldShakingComponent: true,
            });
        }
        else {
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: null,
                worldShakingComponent: true,
            });
        }

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
        console.log(`Dice roll ${result}`);
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

    setTreasureCurrency(cp, sp, ep, gp, pp) {
        this.setState({
            treasureCurrency: [cp, sp, ep, gp, pp],
        });
    };

    setTreasureGem(cp, sp, ep, gp, pp, gemLoot) {
        let result = [];
        gemLoot.forEach(item => {
            let resObj = result.find(resObj => resObj.Name === item.Name);
            resObj ? resObj.Count++ : result.push({ 'Name': item.Name, 'Value': item.Value, 'Count': 1 });
        });
        this.setState({
            treasureCurrency: [cp, sp, ep, gp, pp],
            treasureGemResults: result,
        });
    };

    setTreasureArt(cp, sp, ep, gp, pp, artLoot) {
        let result = [];
        artLoot.forEach(item => {
            let resObj = result.find(resObj => resObj.Name === item.Name);
            resObj ? resObj.Count++ : result.push({ 'Name': item.Name, 'Value': item.Value, 'Count': 1 });
        });
        this.setState({
            treasureCurrency: [cp, sp, ep, gp, pp],
            treasureArtResults: result,
        });
    }

    setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot) {
        let result = [];
        gemLoot.forEach(item => {
            let resObj = result.find(resObj => resObj.Name === item.Name);
            resObj ? resObj.Count++ : result.push({ 'Name': item.Name, 'Value': item.Value, 'Count': 1 });
        });
        let resultMagic = [];
        magicItemLoot.forEach(item => {
            let resObj = resultMagic.find(resObj => resObj.Name === item.Name);
            resObj ? resObj.Count++ : resultMagic.push({ 'Name': item.Name, 'Count': 1 });
        });
        this.setState({
            treasureCurrency: [cp, sp, ep, gp, pp],
            treasureGemResults: result,
            treasureMagicItemResults: resultMagic,
        });
    };

    setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot) {
        let result = [];
        artLoot.forEach(item => {
            let resObj = result.find(resObj => resObj.Name === item.Name);
            resObj ? resObj.Count++ : result.push({ 'Name': item.Name, 'Count': 1 });
        });
        console.log(magicItemLoot);
        let resultMagic = [];
        magicItemLoot.forEach(item => {
            let resObj = resultMagic.find(resObj => resObj.Name === item.Name);
            resObj ? resObj.Count++ : resultMagic.push({ 'Name': item.Name, 'Count': 1 });
        });
        console.log(resultMagic);
        this.setState({
            treasureCurrency: [cp, sp, ep, gp, pp],
            treasureArtResults: result,
            treasureMagicItemResults: resultMagic,
        });
    };

    clearTreasureStates() {
        this.setState({
            treasureCurrency: [],
            treasureGemResults: [],
            treasureArtResults: [],
            treasureMagicItemResults: [],
        });
    };

    handleTreasureLoot(event) {
        event.preventDefault();
        switch (this.state.treasureLoot) {
            case "Challenge0-4":
                let cp = this.DiceRoll(6, 6);
                let sp = this.DiceRoll(3, 6);
                let ep = 0;
                let gp = this.DiceRoll(2, 6);
                let pp = 0;
                let i;
                let roll = this.DiceRoll(1, 100);
                if (roll <= 6) {
                    this.setTreasureCurrency(cp, sp, ep, gp, pp);
                }
                else if (roll <= 16) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp10[Math.floor(Math.random() * GemList.Gp10.length)];
                        gemLoot.push(randomGem);
                    }
                    this.setTreasureGem(cp, sp, ep, gp, pp, gemLoot);
                }
                else if (roll <= 26) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    this.setTreasureArt(cp, sp, ep, gp, pp, artLoot);
                }
                else if (roll <= 36) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    this.setTreasureGem(cp, sp, ep, gp, pp, gemLoot);
                }
                else if (roll <= 44) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp10[Math.floor(Math.random() * GemList.Gp10.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 52) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 60) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 65) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp10[Math.floor(Math.random() * GemList.Gp10.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 70) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 75) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 78) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp10[Math.floor(Math.random() * GemList.Gp10.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 80) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 85) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 92) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 97) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 99) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll === 100) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(2, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else {
                    console.log("Didn't hit any if statements");
                }
                break;
            case ("Challenge5-10"):
                cp = this.DiceRoll(2, 6);
                sp = this.DiceRoll(2, 6);
                ep = 0;
                gp = this.DiceRoll(6, 6);
                pp = this.DiceRoll(3, 6);
                roll = this.DiceRoll(1, 100);
                if (roll <= 4) {
                    this.setTreasureCurrency(cp, sp, ep, gp, pp);
                }
                else if (roll <= 10) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    this.setTreasureArt(cp, sp, ep, gp, pp, artLoot);
                }
                else if (roll <= 16) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    this.setTreasureGem(cp, sp, ep, gp, pp, gemLoot);
                }
                else if (roll <= 22) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp100[Math.floor(Math.random() * GemList.Gp100.length)];
                        gemLoot.push(randomGem);
                    }
                    this.setTreasureGem(cp, sp, ep, gp, pp, gemLoot);
                }
                else if (roll <= 28) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    this.setTreasureArt(cp, sp, ep, gp, pp, artLoot);
                }
                else if (roll <= 32) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 36) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 40) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp100[Math.floor(Math.random() * GemList.Gp100.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 44) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 49) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 54) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 59) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp100[Math.floor(Math.random() * GemList.Gp100.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 63) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 66) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 69) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 72) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp100[Math.floor(Math.random() * GemList.Gp100.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 74) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 76) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 78) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll === 79) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp100[Math.floor(Math.random() * GemList.Gp100.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll === 80) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 84) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp25[Math.floor(Math.random() * ArtObjectList.Gp25.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 88) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp50[Math.floor(Math.random() * GemList.Gp50.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 91) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp100[Math.floor(Math.random() * GemList.Gp100.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 94) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 96) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp100[Math.floor(Math.random() * GemList.Gp100.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 98) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll === 99) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp100[Math.floor(Math.random() * GemList.Gp100.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll === 100) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else {
                    console.log("Didn't match any if condition.");
                }
                break;
            case ("Challenge11-16"):
                cp = 0;
                sp = 0;
                ep = 0;
                gp = this.DiceRoll(4, 6);
                pp = this.DiceRoll(5, 6);
                roll = this.DiceRoll(1, 100);
                if (roll <= 3) {
                    this.setTreasureCurrency(cp, sp, ep, gp, pp);
                }
                else if (roll <= 6) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    this.setTreasureArt(cp, sp, ep, gp, pp, artLoot);
                }
                else if (roll <= 9) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp750[Math.floor(Math.random() * ArtObjectList.Gp750.length)];
                        artLoot.push(randomArt);
                    }
                    this.setTreasureArt(cp, sp, ep, gp, pp, artLoot);
                }
                else if (roll <= 12) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp500[Math.floor(Math.random() * GemList.Gp500.length)];
                        gemLoot.push(randomGem);
                    }
                    this.setTreasureGem(cp, sp, ep, gp, pp, gemLoot);
                }
                else if (roll <= 15) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    this.setTreasureGem(cp, sp, ep, gp, pp, gemLoot);
                }
                else if (roll <= 19) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    let magicItemRoll2 = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    for (i = 0; i < magicItemRoll2; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result2 = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem2 = result2[0];
                        magicItemLoot.push(magicItem2);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 23) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    let magicItemRoll2 = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp750[Math.floor(Math.random() * ArtObjectList.Gp750.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    for (i = 0; i < magicItemRoll2; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result2 = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem2 = result2[0];
                        magicItemLoot.push(magicItem2);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 26) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    let magicItemRoll2 = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp500[Math.floor(Math.random() * GemList.Gp500.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    for (i = 0; i < magicItemRoll2; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result2 = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem2 = result2[0];
                        magicItemLoot.push(magicItem2);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 29) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    let magicItemRoll2 = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.A.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    for (i = 0; i < magicItemRoll2; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result2 = MagicItemsTables.B.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem2 = result2[0];
                        magicItemLoot.push(magicItem2);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 35) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 40) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp750[Math.floor(Math.random() * ArtObjectList.Gp750.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 45) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp500[Math.floor(Math.random() * GemList.Gp500.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 50) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 54) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 58) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp750[Math.floor(Math.random() * ArtObjectList.Gp750.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 62) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp500[Math.floor(Math.random() * GemList.Gp500.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 66) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 68) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.E.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 70) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp750[Math.floor(Math.random() * ArtObjectList.Gp750.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.E.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 72) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp500[Math.floor(Math.random() * GemList.Gp500.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.E.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 74) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.E.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 76) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    let magicItemRoll2 = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    for (i = 0; i < magicItemRoll2; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result2 = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem2 = result2[0];
                        magicItemLoot.push(magicItem2);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 78) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    let magicItemRoll2 = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp750[Math.floor(Math.random() * ArtObjectList.Gp750.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    for (i = 0; i < magicItemRoll2; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result2 = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem2 = result2[0];
                        magicItemLoot.push(magicItem2);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 80) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    let magicItemRoll2 = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp500[Math.floor(Math.random() * GemList.Gp500.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    for (i = 0; i < magicItemRoll2; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result2 = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem2 = result2[0];
                        magicItemLoot.push(magicItem2);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 82) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    let magicItemRoll2 = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.F.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    for (i = 0; i < magicItemRoll2; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result2 = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem2 = result2[0];
                        magicItemLoot.push(magicItem2);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 85) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 88) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp750[Math.floor(Math.random() * ArtObjectList.Gp750.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 90) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp500[Math.floor(Math.random() * GemList.Gp500.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 92) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 94) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp250[Math.floor(Math.random() * ArtObjectList.Gp250.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.I.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 96) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(2, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp750[Math.floor(Math.random() * ArtObjectList.Gp750.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.I.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 98) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp500[Math.floor(Math.random() * GemList.Gp500.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.I.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 100) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = 1;
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.I.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                break;
            case ("Challenge17+"):
                cp = 0;
                sp = 0;
                ep = 0;
                gp = this.DiceRoll(12, 6);
                pp = this.DiceRoll(8, 6);
                roll = this.DiceRoll(1, 100);
                if (roll <= 2) {
                    this.setTreasureCurrency(cp, sp, ep, gp, pp);
                }
                else if (roll <= 5) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 8);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 8) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 10);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 8);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp2500[Math.floor(Math.random() * ArtObjectList.Gp2500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 11) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 8);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp7500[Math.floor(Math.random() * ArtObjectList.Gp7500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 14) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(1, 8);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 8);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp5000[Math.floor(Math.random() * GemList.Gp5000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.C.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 22) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 30) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 10);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp2500[Math.floor(Math.random() * ArtObjectList.Gp2500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 38) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp7500[Math.floor(Math.random() * ArtObjectList.Gp7500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 46) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(1, 8);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp5000[Math.floor(Math.random() * GemList.Gp5000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.D.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 52) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.E.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 58) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 10);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp2500[Math.floor(Math.random() * ArtObjectList.Gp2500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.E.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 63) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp7500[Math.floor(Math.random() * ArtObjectList.Gp7500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.E.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 68) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(1, 8);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 6);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp5000[Math.floor(Math.random() * GemList.Gp5000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.E.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll === 69) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll === 70) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 10);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp2500[Math.floor(Math.random() * ArtObjectList.Gp2500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll === 71) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp7500[Math.floor(Math.random() * ArtObjectList.Gp7500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll === 72) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(1, 8);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp5000[Math.floor(Math.random() * GemList.Gp5000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.G.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 74) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 76) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 10);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp2500[Math.floor(Math.random() * ArtObjectList.Gp2500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 78) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp7500[Math.floor(Math.random() * ArtObjectList.Gp7500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 80) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(1, 8);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp5000[Math.floor(Math.random() * GemList.Gp5000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.H.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 85) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(3, 6);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp1000[Math.floor(Math.random() * GemList.Gp1000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.I.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else if (roll <= 90) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 10);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp2500[Math.floor(Math.random() * ArtObjectList.Gp2500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.I.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll <= 95) {
                    let artLoot = [];
                    let artRoll = this.DiceRoll(1, 4);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < artRoll; i++) {
                        let randomArt = ArtObjectList.Gp7500[Math.floor(Math.random() * ArtObjectList.Gp7500.length)];
                        artLoot.push(randomArt);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.I.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureArtMagic(cp, sp, ep, gp, pp, artLoot, magicItemLoot);
                }
                else if (roll >= 96) {
                    let gemLoot = [];
                    let gemRoll = this.DiceRoll(1, 8);
                    let magicItemLoot = [];
                    let magicItemRoll = this.DiceRoll(1, 4);
                    for (i = 0; i < gemRoll; i++) {
                        let randomGem = GemList.Gp5000[Math.floor(Math.random() * GemList.Gp5000.length)];
                        gemLoot.push(randomGem);
                    }
                    for (i = 0; i < magicItemRoll; i++) {
                        let roll = this.DiceRoll(1, 100);
                        let result = MagicItemsTables.I.filter(obj => {
                            return obj.d100 >= roll
                        });
                        let magicItem = result[0];
                        magicItemLoot.push(magicItem);
                    }
                    this.setTreasureGemMagic(cp, sp, ep, gp, pp, gemLoot, magicItemLoot);
                }
                else {
                    console.log("Didn't hit any if conditions,");
                }
        }
    };

    handleMagicItemClick(item) {
        console.log(item);
        let found = MagicItemsList.find(function (el) {
            return el.Name === item
        });
        console.log(found);
        if (!found) {
            this.setState({
                displayItem: {
                    Name: "Healing potion",
                    Description: "The potion's red liquid glimmers when agitated.",
                    Effect: "Regain 2d4+2 hit points.",
                    Weight: .5,
                    Cost: 50,
                    Currency: "GP"
                }
            })
        }
        else if (found) {
            if (found.Armor === true) {
                let armorState = MagicItemsList[0].Data.find(function (el) {
                    return el.Type === found.ArmorDetails
                });
                console.log('Armor details');
                console.log(armorState);
                this.setState({
                    displayItemArmorDetails: armorState
                });
            }
            this.setState({
                displayItem: found
            });
        }

    };

    handleCloseDisplayItem(event) {
        this.setState({
            displayItem: null,
            displayItemArmorDetails: null,
        });
    };

    handleTranslate(event) {
        this.setState({
            displayTranslation: true
        });
    };

    render() {
        if (this.state.npcComponent === true) {
            return (
                <div className="treasureHordeContainer">
                    <div className="main">
                        <button onClick={this.handleNpcGenerator}>NPC Generator</button>
                        <br />
                        <br />
                        <Npc npc={this.state.npc} />
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
                        <button onClick={this.handleNpcGenerator}>NPC Generator</button>
                    </div>
                    <div>
                        <button onClick={this.handleWorldShakingEvent}>World Shaking Event Generator</button>
                        <br />
                        <br />
                        <WorldShakingEvent worldShakingEvent={this.state.worldShakingEvent} worldShakingDetails={this.state.worldShakingDetails} />
                    </div>
                </div>
            )
        }
        else if (this.state.npcComponent === false) {
            return (
                <div className="treasureHordeContainer">
                    <div className="main">
                        <button onClick={this.handleNpcGenerator}>NPC Generator</button>
                    </div>
                    <div>
                        <button onClick={this.handleWorldShakingEvent}>World Shaking Event Generator</button>
                    </div>
                    <div>
                        <form>
                            <select name="individualLoot" onChange={this.handleChange}>
                                <option value="Challenge0-4">Challenge 0-4</option>
                                <option value="Challenge5-10">Challenge 5-10</option>
                                <option value="Challenge11-16">Challenge 11-16</option>
                                <option value="Challenge17+">Challenge 17+</option>
                            </select>
                            <button onClick={this.handleRoll}>Dice Roll!</button>
                        </form>
                        Individual Loot:
                        {this.state.individualLootResult.map(item => (
                            <p key={item.Currency}>{item.Value}{" "}{item.Currency}</p>
                        ))}
                    </div>
                    <div>
                        <form>
                            <select name="treasureLoot" onChange={this.handleChange}>
                                <option value="Challenge0-4">Challenge 0-4</option>
                                <option value="Challenge5-10">Challenge 5-10</option>
                                <option value="Challenge11-16">Challenge 11-16</option>
                                <option value="Challenge17+">Challenge 17+</option>
                            </select>
                            <button onClick={this.handleTreasureLoot}>Test Treasure Loot</button>
                        </form>
                        <button onClick={this.clearTreasureStates}>Clear Treasure States</button>
                        <br />
                        <br />
                        {(this.state.treasureCurrency.length >= 1)
                            ? <div className="generated">
                                <p className="items">{this.state.treasureCurrency[0]} CP</p>
                                <p className="items">{this.state.treasureCurrency[1]} SP</p>
                                <p className="items">{this.state.treasureCurrency[2]} EP</p>
                                <p className="items">{this.state.treasureCurrency[3]} GP</p>
                                <p className="items">{this.state.treasureCurrency[4]} PP</p>
                            </div>
                            : null
                        }
                        {(this.state.treasureArtResults.length >= 1)
                            ? <div className="generated">
                                {this.state.treasureArtResults.map(item => (
                                    <span className="items"><p key={item.Name}>{item.Count} x | {item.Name} | {item.Value}</p></span>
                                ))}
                            </div>
                            : null
                        }
                        {(this.state.treasureGemResults.length >= 1)
                            ? <div className="generated">
                                {this.state.treasureGemResults.map(item => (
                                    <span className="items"><p key={item.Name}>{item.Count} x | {item.Name} | {item.Value}</p></span>
                                ))}
                            </div>
                            : null
                        }

                        {(this.state.treasureMagicItemResults.length >= 1)
                            ? <div className="generated">
                                {this.state.treasureMagicItemResults.map(item => (
                                    <span className="items"><p onClick={() => this.handleMagicItemClick(item.Name)} value={item.Name} key={item.Name}>{item.Count} x | {item.Name}</p></span>
                                ))}
                            </div>
                            : null
                        }

                        {(this.state.displayItem)
                            ?
                            <div className="displayItem">
                                <span className="closeDisplayItem" onClick={this.handleCloseDisplayItem}>X</span>
                                <h2>{this.state.displayItem.Name}</h2>
                                {this.state.displayItem.Description.map(item => (
                                    <p>{item}</p>
                                ))}
                                <p>Type: {this.state.displayItem.Type} | Rarity: {this.state.displayItem.Rarity}</p>
                                {(this.state.displayItem.Use === true)
                                    ?
                                    <div>
                                        <p>Use: {this.state.displayItem.Effects.Use}</p>
                                        <p>Cooldown: {this.state.displayItem.CoolDown}</p>
                                    </div>
                                    : null
                                }
                                {(this.state.displayItem.Passive === true)
                                    ?
                                    <p>Passive: {this.state.displayItem.Effects.Passive}</p>
                                    : null
                                }
                                {(this.state.displayItem.Table.length > 0)
                                    ?
                                    <div>
                                        {this.state.displayItem.Table.map(item => (
                                            <p>{item.Roll} | {item.Effect}</p>
                                        ))}
                                    </div>
                                    : null
                                }
                                {(this.state.displayItemArmorDetails)
                                    ?
                                    <div>
                                        <p>Armor type: {this.state.displayItemArmorDetails.Type}</p>
                                        <p>AC: {this.state.displayItemArmorDetails.AC} | Dex Modifier: {(this.state.displayItem.DexModifier === true)
                                            ?
                                            "True"
                                            : "False"}</p>
                                        <p>Strength requirement: {this.state.displayItemArmorDetails.Strength} | Stealth disadvantage: {(this.state.displayItemArmorDetails.Stealth === true)
                                            ?
                                            "True"
                                            : "False"
                                        }</p>
                                        <p>Weight: {this.state.displayItemArmorDetails.Weight}</p>
                                    </div>
                                    : null
                                }
                            </div>
                            : null
                        }

                    </div>
                    <div>
                        <input name="textToTranslate" type="text" onChange={this.handleChange} />
                        <select name="language" onChange={this.handleChange}>
                            <option value="Elvish">Elvish</option>
                            <option value="Dwarven">Dwarven</option>
                            <option value="Draconic">Draconic</option>
                            <option value="Abyssal">Abyssal</option>
                        </select>
                        <button onClick={this.handleTranslate}>Translate</button>
                    </div>
                    <br />
                    {(this.state.displayTranslation === true)
                        ?
                        <Translation language={this.state.language} textToTranslate={this.state.textToTranslate}/>
                        : null}
                </div>
            )
        }

    }
}

export default Main;