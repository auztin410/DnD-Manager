import React, { Component } from 'react';
import axios from 'axios';
import Draggable, { DraggableCore } from 'react-draggable';
import WeaponsList from '../assets/Json/WeaponsList';
import Equipment from '../assets/Json/Equipment';
import EquipmentPacks from '../assets/Json/EquipmentPacks';
import TradeGoods from '../assets/Json/TradeGoods';
import Mounts from '../assets/Json/Mounts';
import TackHarnessVehicle from '../assets/Json/Tack-Harness-Vehicle';
import Ships from '../assets/Json/Ships';
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
            squareModal: false,
            itemsInPack: [],
            itemsInPackTotalWeight: 0,
            merchantPending: [],
            vendorSections: [false, false, false, false, false, false],
            pendingCP: 0,
            pendingSP: 0,
            pendingEP: 0,
            pendingGP: 0,
            pendingPP: 0,
            yourCP: 5,
            yourSP: 20,
            yourEP: 2,
            yourGP: 50,
            yourPP: 1,
            purchased: [],
            play: false,
            pause: true,
            sounds: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            checkboxFarm: false,
            checkboxBlacksmith: false,
            checkboxMine: false,
            checkboxCloth: false,
            checkboxSpice: false,
            checkboxHarbor: false,
            checkboxLivestock: false,
            sizeSettlement: "settlement",
            economySettlement: "thriving",
            singleResource: "farm",
            resourceCheckboxMax: false,
            vendorEquipment: [],
            vendorWeapons: [],
            vendorTradeGoods: [],
            vendorMounts: [],
            vendorTackHarnessVehicle: [],
            vendorShips: [],
        }

        this.handleArrow = this.handleArrow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleOpenClose = this.handleOpenClose.bind(this);
        this.handleMerchantEquipment = this.handleMerchantEquipment.bind(this);
        this.handleMerchantPurchase = this.handleMerchantPurchase.bind(this);
        this.handleVendorSections = this.handleVendorSections.bind(this);
        this.handleGenerateSettlement = this.handleGenerateSettlement.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.economicStatus = this.economicStatus.bind(this);
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

    handleCheckBox(event) {
        console.log(event.target.value);
        console.log(event.target.checked);
        switch (event.target.value) {
            case ("farm"):
                this.setState({
                    checkboxFarm: event.target.checked,
                });
                break;
            case ("blacksmith"):
                this.setState({
                    checkboxBlacksmith: event.target.checked,
                });
                break;
            case ("mine"):
                this.setState({
                    checkboxMine: event.target.checked,
                });
                break;
            case ("cloth"):
                this.setState({
                    checkboxCloth: event.target.checked,
                });
                break;
            case ("spice"):
                this.setState({
                    checkboxSpice: event.target.checked,
                });
                break;
            case ("harbor"):
                this.setState({
                    checkboxHarbor: event.target.checked,
                });
                break;
            case ("livestock"):
                this.setState({
                    checkboxLivestock: event.target.checked,
                });
                break;
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
        // console.log(`Dice roll ${result}`);
        return result;
    };

    // handleTranslate(event) {
    //     this.setState({
    //         displayTranslation: true
    //     });
    // };

    // handleTranslateClose(event) {
    //     this.setState({
    //         displayTranslation: false,
    //         textToTranslate: null,
    //     })
    // };

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

    getSum(total, num) {
        return total + num;
    };

    handleMerchantEquipment(item) {
        console.log(item);
        let pending = [...this.state.merchantPending.map(obj => ({ ...obj }))];
        let thing = item;
        let check = pending.find(el => el.Name === thing.Name);
        if (!check) {
            thing.Count = 1;
            pending.push(thing);
        }
        else {
            var foundIndex = pending.findIndex(el => el.Name === check.Name);
            item.Count += 1;
            pending[foundIndex] = item;

        }
        let CP = [0];
        let SP = [0];
        let GP = [0];
        let PP = [0];
        pending.forEach(item => {
            let cost = item.Cost * item.Count;
            if (item.Currency === "CP") {
                CP.push(cost);
            }
            else if (item.Currency === "SP") {
                SP.push(cost);
            }
            else if (item.Currency === "GP") {
                GP.push(cost);
            }
            else if (item.Currency === "PP") {
                PP.push(cost);
            }
        });
        let totalCP = CP.reduce(this.getSum);
        let totalSP = SP.reduce(this.getSum);
        let totalGP = GP.reduce(this.getSum);
        let totalPP = PP.reduce(this.getSum);
        this.setState({
            merchantPending: pending,
            pendingCP: totalCP,
            pendingSP: totalSP,
            pendingGP: totalGP,
            pendingPP: totalPP,
        });
    };

    handleRemoveFromPending(item) {
        console.log(item);
        let pending = [...this.state.merchantPending];
        console.log(pending);

        let check = pending.find(el => el.Name === item && el.Count > 1);
        console.log(check);
        if (!check) {
            let foundIndex = pending.findIndex(el => el.Name === item)
            pending.splice(foundIndex, 1);
        }
        else {
            var foundIndex = pending.findIndex(el => el.Name === check.Name);
            check.Count -= 1;
            pending[foundIndex] = check;

        }
        let CP = [0];
        let SP = [0];
        let EP = [0];
        let GP = [0];
        let PP = [0];
        pending.map(item => {
            let cost = item.Cost * item.Count;
            if (item.Currency === "CP") {
                CP.push(cost);
            }
            else if (item.Currency === "SP") {
                SP.push(cost);
            }
            else if (item.Currency === "EP") {
                EP.push(cost);
            }
            else if (item.Currency === "GP") {
                GP.push(cost);
            }
            else if (item.Currency === "PP") {
                PP.push(cost);
            }
        });
        let totalCP = CP.reduce(this.getSum);
        let totalSP = SP.reduce(this.getSum);
        let totalEP = EP.reduce(this.getSum);
        let totalGP = GP.reduce(this.getSum);
        let totalPP = PP.reduce(this.getSum);
        this.setState({
            merchantPending: pending,
            pendingCP: totalCP,
            pendingSP: totalSP,
            pendingEP: totalEP,
            pendingGP: totalGP,
            pendingPP: totalPP,
        });
    };

    handleMerchantPurchase() {
        let yourCP = this.state.yourCP;
        let yourSP = this.state.yourSP;
        let yourEP = this.state.yourEP;
        let yourGP = this.state.yourGP;
        let yourPP = this.state.yourPP;
        let costCP = this.state.pendingCP;
        let costSP = this.state.pendingSP;
        let costEP = this.state.pendingEP;
        let costGP = this.state.pendingGP;
        let costPP = this.state.pendingPP;
        if (yourCP >= costCP && yourSP >= costSP && yourEP >= costEP && yourGP >= costGP && yourPP >= costPP) {
            let totalCP = yourCP - costCP;
            let totalSP = yourSP - costSP;
            let totalEP = yourEP - costEP;
            let totalGP = yourGP - costGP;
            let totalPP = yourPP - costPP;
            let purchased = [...this.state.purchased];
            let pending = [...this.state.merchantPending];

            pending.forEach(item => {
                let resObj = purchased.find(resObj => resObj.Name === item.Name);
                resObj ? resObj.Count = resObj.Count + item.Count : purchased.push({ 'Name': item.Name, 'Cost': item.Cost, 'Count': item.Count, 'Description': item.Description, 'Weight': item.Weight, 'Currency': item.Currency });
            });
            console.log(purchased);
            this.setState({
                yourCP: totalCP,
                yourSP: totalSP,
                yourEP: totalEP,
                yourGP: totalGP,
                yourPP: totalPP,
                pendingCP: 0,
                pendingSP: 0,
                pendingEP: 0,
                pendingGP: 0,
                pendingPP: 0,
                purchased: purchased,
                merchantPending: [],

            });
        }
        else if (yourCP <= costCP && yourSP > costSP && yourEP > costEP && yourGP >= costGP && yourPP >= costPP) {
            while (yourCP < costCP) {
                console.log(`Your SP: ${yourSP} Your CP: ${yourCP}`);
                yourSP -= 1
                yourCP += 10
                console.log(`Your SP: ${yourSP} Your CP: ${yourCP}`);
            }
            while (yourSP < costSP) {
                console.log(`Your SP: ${yourSP} Your CP: ${yourCP}`);
                yourGP -= 1
                yourSP += 10
                console.log(`Your SP: ${yourSP} Your CP: ${yourCP}`);
            }

        }
    };

    handleVendorSections(event) {
        console.log(event.target.innerHTML);
        let array0True = [...this.state.vendorSections];
        let array0False = [...this.state.vendorSections];
        let array1True = [...this.state.vendorSections];
        let array1False = [...this.state.vendorSections];
        let array2True = [...this.state.vendorSections];
        let array2False = [...this.state.vendorSections];
        let array3True = [...this.state.vendorSections];
        let array3False = [...this.state.vendorSections];
        let array4True = [...this.state.vendorSections];
        let array4False = [...this.state.vendorSections];
        let array5True = [...this.state.vendorSections];
        let array5False = [...this.state.vendorSections];
        array0True[0] = true;
        array0False[0] = false;
        array1True[1] = true;
        array1False[1] = false;
        array2True[2] = true;
        array2False[2] = false;
        array3True[3] = true;
        array3False[3] = false;
        array4True[4] = true;
        array4False[4] = false;
        array5True[5] = true;
        array5False[5] = false;
        switch (event.target.innerHTML) {
            case ("Items"):
                if (this.state.vendorSections[0] === false) {
                    this.setState({
                        vendorSections: array0True,
                    });
                }
                else if (this.state.vendorSections[0] === true) {
                    this.setState({
                        vendorSections: array0False,
                    });
                }
                break;
            case ("Trade Goods"):
                if (this.state.vendorSections[1] === false) {
                    this.setState({
                        vendorSections: array1True,
                    });
                }
                else if (this.state.vendorSections[1] === true) {
                    this.setState({
                        vendorSections: array1False,
                    });
                }
                break;
            case ("Mounts"):
                if (this.state.vendorSections[2] === false) {
                    this.setState({
                        vendorSections: array2True,
                    });
                }
                else if (this.state.vendorSections[2] === true) {
                    this.setState({
                        vendorSections: array2False,
                    });
                }
                break;
            case ("Tack, Hardness, and Vehicles"):
                if (this.state.vendorSections[3] === false) {
                    this.setState({
                        vendorSections: array3True,
                    });
                }
                else if (this.state.vendorSections[3] === true) {
                    this.setState({
                        vendorSections: array3False,
                    });
                }
                break;
            case ("Ships"):
                if (this.state.vendorSections[4] === false) {
                    this.setState({
                        vendorSections: array4True,
                    });
                }
                else if (this.state.vendorSections[4] === true) {
                    this.setState({
                        vendorSections: array4False,
                    });
                }
                break;
            case ("Weapons"):
                if (this.state.vendorSections[5] === false) {
                    this.setState({
                        vendorSections: array5True,
                    });
                }
                else if (this.state.vendorSections[5] === true) {
                    this.setState({
                        vendorSections: array5False,
                    });
                }
                break;
        }
    };

    economicStatus(Arr, divide, minimum) {
        let result = (Math.floor(Math.random() * Arr.length * divide) + minimum);
        let resultArr = Arr.slice(0, result);
        console.log("Economic Status Function Test");
        console.log(result);
        console.log(resultArr);
        return resultArr;
    };

    handleGenerateSettlement() {
        this.setState({
            vendorTradeGoods: [],
            vendorWeapons: [],
            vendorMounts: [],
            vendorTackHarnessVehicle: [],
            vendorShips: [],
        });
        console.log(`Trade good length ${TradeGoods.length}`);
        let generalItems = this.shuffle(Equipment);
        let weapons = this.shuffle(WeaponsList);
        let tradeGoods = this.shuffle(TradeGoods);
        let mounts = this.shuffle(Mounts);
        let mountEquipment = this.shuffle(TackHarnessVehicle);
        let ships = this.shuffle(Ships);
        let farm = this.shuffle(tradeGoods.filter(item => item.Keyword === "Farm"));
        let livestock = this.shuffle(tradeGoods.filter(item => item.Keyword === "Livestock"));
        let spice = this.shuffle(tradeGoods.filter(item => item.Keyword === "Spice"));
        let ore = this.shuffle(tradeGoods.filter(item => item.Keyword === "Ore"));
        let cloth = this.shuffle(tradeGoods.filter(item => item.Keyword === "Cloth"));
        let combinedTradeGoods = [];
        let result;

        switch (this.state.economySettlement) {
            case ("thriving"):
                console.log("Economic Status Thriving");
                this.setState({
                    vendorEquipment: Equipment,
                });
                if (this.state.checkboxFarm === true) {
                    farm.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxBlacksmith === true) {
                    this.setState({
                        vendorWeapons: weapons,
                    });
                }
                if (this.state.checkboxMine === true) {
                    ore.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxCloth === true) {
                    cloth.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxSpice === true) {
                    spice.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxHarbor === true) {
                    this.setState({
                        vendorShips: ships,
                    });
                }
                if (this.state.checkboxLivestock === true) {
                    livestock.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                        vendorMounts: mounts,
                        vendorTackHarnessVehicle: mountEquipment,
                    });
                }
                break;
            case ("good"):
                console.log("Economic Status Good");
                generalItems = this.economicStatus(generalItems, 1, 5);
                this.setState({
                    vendorEquipment: generalItems,
                });
                if (this.state.checkboxFarm === true) {
                    console.log("Farms True");
                    farm = this.economicStatus(farm, 1, 1);
                    farm.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxBlacksmith === true) {
                    console.log("Blacksmith True");
                    weapons = this.economicStatus(weapons, 1, 4);
                    this.setState({
                        vendorWeapons: weapons,
                    });
                }
                if (this.state.checkboxMine === true) {
                    console.log("Mine True");
                    ore = this.economicStatus(ore, 1, 3);
                    ore.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxCloth === true) {
                    console.log("Cloth True");
                    cloth = this.economicStatus(cloth, 1, 3);
                    cloth.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxSpice === true) {
                    console.log("Spice True");
                    spice = this.economicStatus(spice, 1, 3);
                    spice.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxHarbor === true) {
                    console.log("Harbor True");
                    result = this.economicStatus(ships, 1, 2);
                    console.log("result");
                    console.log(result);
                    this.setState({
                        vendorShips: result,
                    });
                }
                if (this.state.checkboxLivestock === true) {
                    console.log("Livestock True");
                    livestock = this.economicStatus(livestock, 1, 3);
                    mounts = this.economicStatus(mounts, 1, 3);
                    mountEquipment = this.economicStatus(mountEquipment, 1, 3);
                    livestock.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                        vendorMounts: mounts,
                        vendorTackHarnessVehicle: mountEquipment,
                    });
                }
                break;
            case ("fair"):
                console.log("Economic Status Fair");
                generalItems = this.economicStatus(generalItems, 0.75, 3);
                this.setState({
                    vendorEquipment: generalItems,
                });
                if (this.state.checkboxFarm === true) {
                    console.log("Farms True");
                    farm = this.economicStatus(farm, 0.75, 1);
                    farm.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxBlacksmith === true) {
                    console.log("Blacksmith True");
                    weapons = this.economicStatus(weapons, 0.75, 2);
                    this.setState({
                        vendorWeapons: weapons,
                    });
                }
                if (this.state.checkboxMine === true) {
                    console.log("Mine True");
                    ore = this.economicStatus(ore, 0.75, 2);
                    ore.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxCloth === true) {
                    console.log("Cloth True");
                    cloth = this.economicStatus(cloth, 0 / 75, 2);
                    cloth.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxSpice === true) {
                    console.log("Spice True");
                    spice = this.economicStatus(spice, 0.75, 2);
                    spice.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxHarbor === true) {
                    console.log("Harbor True");
                    result = this.economicStatus(ships, 0.75, 1);
                    console.log("result");
                    console.log(result);
                    this.setState({
                        vendorShips: result,
                    });
                }
                if (this.state.checkboxLivestock === true) {
                    console.log("Livestock True");
                    livestock = this.economicStatus(livestock, 0.75, 2);
                    mounts = this.economicStatus(mounts, 0.75, 2);
                    mountEquipment = this.economicStatus(mountEquipment, 0.75, 2);
                    livestock.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                        vendorMounts: mounts,
                        vendorTackHarnessVehicle: mountEquipment,
                    });
                }
                break;
            case ("poor"):
                console.log("Economic Status Poor");
                generalItems = this.economicStatus(generalItems, 0.5, 1);
                this.setState({
                    vendorEquipment: generalItems,
                });
                if (this.state.checkboxFarm === true) {
                    console.log("Farms True");
                    farm = this.economicStatus(farm, 0.5, 0);
                    farm.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxBlacksmith === true) {
                    console.log("Blacksmith True");
                    weapons = this.economicStatus(weapons, 0.5, 0);
                    this.setState({
                        vendorWeapons: weapons,
                    });
                }
                if (this.state.checkboxMine === true) {
                    console.log("Mine True");
                    ore = this.economicStatus(ore, 0.5, 0);
                    ore.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxCloth === true) {
                    console.log("Cloth True");
                    cloth = this.economicStatus(cloth, 0.5, 0);
                    cloth.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxSpice === true) {
                    console.log("Spice True");
                    spice = this.economicStatus(spice, 0.5, 0);
                    spice.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxHarbor === true) {
                    console.log("Harbor True");
                    result = this.economicStatus(ships, 0.5, 0);
                    console.log("result");
                    console.log(result);
                    this.setState({
                        vendorShips: result,
                    });
                }
                if (this.state.checkboxLivestock === true) {
                    console.log("Livestock True");
                    livestock = this.economicStatus(livestock, 0.5, 0);
                    mounts = this.economicStatus(mounts, 0.5, 0);
                    mountEquipment = this.economicStatus(mountEquipment, 0.5, 0);
                    livestock.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                        vendorMounts: mounts,
                        vendorTackHarnessVehicle: mountEquipment,
                    });
                }
                break;
            case ("failing"):
                console.log("Economic Status Failing");
                generalItems = this.economicStatus(generalItems, 0.25, 1);
                this.setState({
                    vendorEquipment: generalItems,
                });
                if (this.state.checkboxFarm === true) {
                    console.log("Farms True");
                    farm = this.economicStatus(farm, 0.25, 0);
                    farm.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxBlacksmith === true) {
                    console.log("Blacksmith True");
                    weapons = this.economicStatus(weapons, 0.25, 0);
                    this.setState({
                        vendorWeapons: weapons,
                    });
                }
                if (this.state.checkboxMine === true) {
                    console.log("Mine True");
                    ore = this.economicStatus(ore, 0.25, 0);
                    ore.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                    console.log(combinedTradeGoods);
                }
                if (this.state.checkboxCloth === true) {
                    console.log("Cloth True");
                    cloth = this.economicStatus(cloth, 0.25, 0);
                    cloth.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxSpice === true) {
                    console.log("Spice True");
                    spice = this.economicStatus(spice, 0.25, 0);
                    spice.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                    });
                }
                if (this.state.checkboxHarbor === true) {
                    console.log("Harbor True");
                    result = this.economicStatus(ships, 0.25, 0);
                    console.log("result");
                    console.log(result);
                    this.setState({
                        vendorShips: result,
                    });
                }
                if (this.state.checkboxLivestock === true) {
                    console.log("Livestock True");
                    livestock = this.economicStatus(livestock, 0.25, 0);
                    mounts = this.economicStatus(mounts, 0.25, 0);
                    mountEquipment = this.economicStatus(mountEquipment, 0.25, 0);
                    livestock.forEach(item => (
                        combinedTradeGoods.push(item)
                    ));
                    this.setState({
                        vendorTradeGoods: combinedTradeGoods,
                        vendorMounts: mounts,
                        vendorTackHarnessVehicle: mountEquipment,
                    });
                }
                break;
        }
    };

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
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
                        <div className="visible" id="merchantDiv">
                            <div className="merchantOptions">
                                {(this.state.vendorSections[0] === true)
                                    ?
                                    <div>
                                        <h2 onClick={this.handleVendorSections} className="woodSign">Items</h2>
                                        {this.state.vendorEquipment.map(item => (
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name} value={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/box-full.svg')} alt="item"/>{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.</div>
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        {(this.state.vendorEquipment.length > 0)
                                            ?
                                            <h2 onClick={this.handleVendorSections} className="woodSign">Items</h2>
                                            : null
                                        }
                                    </div>
                                }
                                {(this.state.vendorSections[1] === true)
                                    ?
                                    <div>
                                        <h2 onClick={this.handleVendorSections} className="woodSign">Trade Goods</h2>
                                        {this.state.vendorTradeGoods.map(item => (
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/balance-scale-left.svg')} alt="item"/>{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.</div>
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        {(this.state.vendorTradeGoods.length > 0)
                                            ?
                                            <h2 onClick={this.handleVendorSections} className="woodSign">Trade Goods</h2>
                                            : null
                                        }
                                    </div>
                                }
                                {(this.state.vendorSections[2] === true)
                                    ?
                                    <div>
                                        <h2 onClick={this.handleVendorSections} className="woodSign">Mounts</h2>
                                        {this.state.vendorMounts.map(item => (
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/horse.svg')} alt="item"/>{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | Carry Weight: {item.CarryingCapacity} | Walking Speed: {item.Speed}</div>
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        {(this.state.vendorMounts.length > 0)
                                            ?
                                            <h2 onClick={this.handleVendorSections} className="woodSign">Mounts</h2>
                                            : null
                                        }
                                    </div>
                                }
                                {(this.state.vendorSections[3] === true)
                                    ?
                                    <div>
                                        <h2 onClick={this.handleVendorSections} className="woodSign">Tack, Hardness, and Vehicles</h2>
                                        {this.state.vendorTackHarnessVehicle.map(item => (
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/horse-head.svg')} alt="item"/>{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | Weight: {item.Weight}</div>
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        {(this.state.vendorTackHarnessVehicle.length > 0)
                                            ?
                                            <h2 onClick={this.handleVendorSections} className="woodSign">Tack, Hardness, and Vehicles</h2>
                                            : null
                                        }
                                    </div>
                                }
                                {(this.state.vendorSections[4] === true)
                                    ?
                                    <div>
                                        <h2 onClick={this.handleVendorSections} className="woodSign">Ships</h2>
                                        {this.state.vendorShips.map(item => (
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/ship.svg')} alt="item"/>{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | Swimming Speed: {item.Speed} Mph</div>
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        {(this.state.vendorShips.length > 0)
                                            ?
                                            <h2 onClick={this.handleVendorSections} className="woodSign">Ships</h2>
                                            : null
                                        }
                                    </div>
                                }
                                {(this.state.vendorSections[5] === true)
                                    ?
                                    <div>
                                        <h2 onClick={this.handleVendorSections} className="woodSign">Weapons</h2>
                                        {this.state.vendorWeapons.map(item => (
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/axe-battle.svg')} alt="item"/>{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | DMG: {item.Damage} | {item.Damage_Type}</div>
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        {(this.state.vendorWeapons.length > 0)
                                            ?
                                            <h2 onClick={this.handleVendorSections} className="woodSign">Weapons</h2>
                                            : null
                                        }
                                    </div>
                                }
                            </div>
                            <div className="merchantPending">
                                <h2 className="woodSign">Pending</h2>
                                {this.state.merchantPending.map(item => (
                                    <div onClick={() => this.handleRemoveFromPending(item.Name)} className="merchantItem" key={item.Name}>{item.Name} | Quantity: {item.Count}</div>
                                ))}
                                <h3 className="woodSign">Total:
                                {(this.state.pendingCP > this.state.yourCP)
                                        ?
                                        <span className="red">CP: {this.state.pendingCP} </span>
                                        : <span>CP: {this.state.pendingCP} </span>
                                    }
                                    |
                                {(this.state.pendingSP > this.state.yourSP)
                                        ?
                                        <span className="red"> SP: {this.state.pendingSP} </span>
                                        : <span> SP: {this.state.pendingSP} </span>
                                    }
                                    |
                                {(this.state.pendingEP > this.state.yourEP)
                                        ?
                                        <span className="red"> EP: {this.state.pendingEP} </span>
                                        : <span> EP: {this.state.pendingEP} </span>
                                    }
                                    |
                                {(this.state.pendingGP > this.state.yourGP)
                                        ?
                                        <span className="red"> GP: {this.state.pendingGP} </span>
                                        : <span> GP: {this.state.pendingGP} </span>
                                    }
                                    |
                                {(this.state.pendingPP > this.state.yourPP)
                                        ?
                                        <span className="red"> PP: {this.state.pendingPP}</span>
                                        : <span> PP: {this.state.pendingPP}</span>
                                    }
                                </h3>
                                {(this.state.merchantPending.length > 0 && this.state.pendingCP <= this.state.yourCP && this.state.pendingSP <= this.state.yourSP && this.state.pendingEP <= this.state.yourEP && this.state.pendingGP <= this.state.yourGP && this.state.pendingPP <= this.state.yourPP)
                                    ?
                                    <div onClick={this.handleMerchantPurchase} className="merchantItem">Buy</div>
                                    : null
                                }
                            </div>
                            <div className="merchantPending">
                                <h2 className="woodSign">Purchased</h2>
                                <h3 className="woodSign">Your: CP: {this.state.yourCP} | SP: {this.state.yourSP} | EP: {this.state.yourEP} | GP: {this.state.yourGP} | PP: {this.state.yourPP}</h3>
                                {this.state.purchased.map(item => (
                                    <div className="merchantItem" key={item.Name}>{item.Name} | Quantity: {item.Count}</div>
                                ))}
                            </div>
                        </div>
                        : null
                    }
                    {(this.state.soundDiv === true)
                        ? <Sounds />
                        : null
                    }
                    {(this.state.settlementDiv === true)
                        ?
                        <div className="visible" id="settlementGeneratorDiv">
                            <h2>Select the size of the settlement</h2>
                            <br />
                            <select onChange={this.handleChange} name="sizeSettlement">
                                <option value="settlement">Settlement</option>
                                <option value="town">Town</option>
                                <option value="city">City</option>
                            </select>
                            <br />
                            <br />
                            <h2>Select the resources available at this settlement</h2>
                            <div className="checkboxDiv">
                                <br />
                                <label><input onChange={this.handleCheckBox} type="checkbox" value="farm" />Farm</label><br />
                                <label><input onChange={this.handleCheckBox} type="checkbox" value="blacksmith" />Blacksmith</label><br />
                                <label><input onChange={this.handleCheckBox} type="checkbox" value="mine" />Mine</label><br />
                                <label><input onChange={this.handleCheckBox} type="checkbox" value="cloth" />Cloth</label><br />
                                <label><input onChange={this.handleCheckBox} type="checkbox" value="spice" />Spice</label><br />
                                <label><input onChange={this.handleCheckBox} type="checkbox" value="harbor" />Harbor</label><br />
                                <label><input onChange={this.handleCheckBox} type="checkbox" value="livestock" />Livestock</label>
                                <br />
                                <br />
                            </div>
                            <h2>Select the economic status of the settlement</h2>
                            <select onChange={this.handleChange} name="economySettlement">
                                <option value="thriving">Thriving</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                                <option value="failing">Failing</option>
                            </select>
                            <br />
                            <br />
                            <button onClick={this.handleGenerateSettlement}>Generate Settlement!</button>
                            <br />
                            <br />
                        </div>
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