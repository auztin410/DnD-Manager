import React, { Component } from 'react';
import WeaponsList from '../assets/Json/WeaponsList';
import Equipment from '../assets/Json/Equipment';
import EquipmentPacks from '../assets/Json/EquipmentPacks';
import TradeGoods from '../assets/Json/TradeGoods';
import Mounts from '../assets/Json/Mounts';
import TackHarnessVehicle from '../assets/Json/Tack-Harness-Vehicle';
import Ships from '../assets/Json/Ships';

class Settlement extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleGenerateSettlement = this.handleGenerateSettlement.bind(this);
    }

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
        return (
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
        )
    }
}

export default Settlement;