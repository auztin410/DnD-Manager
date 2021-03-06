import React, { Component } from 'react';
import MagicItemsTables from '../assets/Json/MagicItemTables';
import GemList from '../assets/Json/Gemstones';
import ArtObjectList from '../assets/Json/ArtObject';
import MagicItemsList from '../assets/Json/MagicItemsList';
import WeaponsList from '../assets/Json/WeaponsList';

class Treasure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            treasureLoot: "Challenge0-4",
            treasureCurrency: [],
            treasureGemResults: [],
            treasureArtResults: [],
            treasureMagicItemResults: [],
            displayItem: null,
            displayItemArmorDetails: null,
            displayItemWeaponChoices: [],
            displayItemWeaponTypeSelected: null,
            displayItemWeaponTypeDetails: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTreasureLoot = this.handleTreasureLoot.bind(this);
        this.clearTreasureStates = this.clearTreasureStates.bind(this);
        this.handleCloseDisplayItem = this.handleCloseDisplayItem.bind(this);
        this.handleSelectWeaponType = this.handleSelectWeaponType.bind(this);

        this.handleTestWeapons = this.handleTestWeapons.bind(this);
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
            resObj ? resObj.Count++ : result.push({ 'Name': item.Name, 'Value': item.Value, 'Count': 1 });
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

    clearTreasureStates(event) {
        event.preventDefault();
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

    clearTreasureStates(event) {
        event.preventDefault();
        this.setState({
            treasureCurrency: [],
            treasureGemResults: [],
            treasureArtResults: [],
            treasureMagicItemResults: [],
        });
    };

    handleTestWeapons() {
        let test = [
            {
                Count: 1,
                Name: "Weapon, +3"
            },
            {
                Count: 1,
                Name: "Vorpal sword"
            },
            {
                Count: 1,
                Name: "Berserker axe"
            },
            {
                Count: 1,
                Name: "Giant slayer"
            }
        ];
        this.setState({
            treasureMagicItemResults: test
        })
    };

    handleCloseDisplayItem(event) {
        this.setState({
            displayItem: null,
            displayItemArmorDetails: null,
        });
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
            else if (found.Weapon === true) {
                let weaponState = found.Type.substring(found.Type.indexOf("(") + 1);
                weaponState = weaponState.slice(0, -1);
                console.log(found.Type);
                console.log(`Test for weapon type: ${weaponState}`);
                let any = ["Any Weapon", "Club", "Dagger", "Greatclub", "Handaxe", "Javelin", "Light hammer", "Mace", "Quarterstaff", "Sickle", "Spear", "Crossbow, light", "Dart", "Shortbow", "Sling", "Battleaxe", "Flail", "Glaive", "Greataxe", "Greatsword", "Halberd", "Lance", "Longsword", "Maul", "Morningstar", "Pike", "Rapier", "Scimitar", "Shortsword", "Trident", "War pick", "Warhammer", "Whip", "Blowgun", "Crossbow, hand", "Crossbow, heavy", "Longbow", "Net"];
                let swords = ["Any Sword", "Greatsword", "Longsword", "Scimitar", "Shortsword", "Rapier"];
                let axes = ["Any Axe", "Handaxe", "Battleaxe", "Greataxe"];
                let axeOrSword = ["Any Axe or Sword", "Greatsword", "Longsword", "Scimitar", "Shortsword", "Rapier", "Handaxe", "Battleaxe", "Greataxe"];
                let swordSlashing = ["Any Slashing Sword", "Greatsword", "Longsword", "Scimitar"];
                // IF statement for if any weapon list of weapons state is any, and so on and so forth.
                if (weaponState === "any") {
                    this.setState({
                        displayItemWeaponChoices: any
                    });
                }
                else if (weaponState === "any sword") {
                    this.setState({
                        displayItemWeaponChoices: swords
                    })
                }
                else if (weaponState === "any axe") {
                    this.setState({
                        displayItemWeaponChoices: axes
                    });
                }
                else if (weaponState === "any axe or sword") {
                    this.setState({
                        displayItemWeaponChoices: axeOrSword
                    });
                }
                else if (weaponState === "any sword that deals slashing damage") {
                    this.setState({
                        displayItemWeaponChoices: swordSlashing
                    });
                }
                else {
                    this.setState({
                        displayItemWeaponChoices: []
                    });
                }
            }
            this.setState({
                displayItem: found
            });

        }

    };

    handleSelectWeaponType() {
        let selected = this.state.displayItemWeaponTypeSelected;
        let weaponType = WeaponsList.find(function (el) {
            return el.Name === selected
        });
        console.log("Weapon type found!");
        console.log(weaponType);
        this.setState({
            displayItemWeaponTypeDetails: weaponType
        });
    };


    render() {
        return(
            <div className={this.props.display}>
                            <form>
                                <select className="customButton" name="treasureLoot" onChange={this.handleChange}>
                                    <option value="Challenge0-4">Challenge 0-4</option>
                                    <option value="Challenge5-10">Challenge 5-10</option>
                                    <option value="Challenge11-16">Challenge 11-16</option>
                                    <option value="Challenge17+">Challenge 17+</option>
                                </select>
                                <span className="customButton" onClick={this.handleTreasureLoot}>Test Treasure Loot</span>
                                <span className="customButton" onClick={this.clearTreasureStates}>Clear Treasure States</span>
                                <span className="customButton" onClick={this.handleTestWeapons}>Test</span>
                            </form>

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
                                    <table>
                                        <tr>
                                            <th className="profRow">Item</th>
                                            <th className="profRow">Quantity</th>
                                            <th className="profRow">Value GP</th>
                                        </tr>
                                        {this.state.treasureArtResults.map(item => (
                                            <tr key={item.Name}>
                                                <td className="profRow">{item.Name}</td>
                                                <td className="profRow">{item.Count}</td>
                                                <td className="profRow">{item.Value}</td>
                                            </tr>
                                            // <span className="items" key={item.Name}><p key={item.Name}>{item.Count} x | {item.Name} | {item.Value} GP</p></span>
                                        ))}
                                    </table>
                                </div>
                                : null
                            }
                            {(this.state.treasureGemResults.length >= 1)
                                ? <div className="generated">
                                    {this.state.treasureGemResults.map(item => (
                                        <span className="items" key={item.Name}><p key={item.Name}>{item.Count} x | {item.Name} | {item.Value} GP</p></span>
                                    ))}
                                </div>
                                : null
                            }

                            {(this.state.treasureMagicItemResults.length >= 1)
                                ? <div className="generated">
                                    {this.state.treasureMagicItemResults.map(item => (
                                        <span className="items" key={item.Name}><p className="magicItem" onClick={() => this.handleMagicItemClick(item.Name)} value={item.Name} key={item.Name}>{item.Count} x | {item.Name}</p></span>
                                    ))}
                                </div>
                                : null
                            }
                            {/* Display Item ON Click Div Modal */}
                            {(this.state.displayItem)
                                ?
                                <div className="displayItem">
                                    <span className="closeDisplayItem" onClick={this.handleCloseDisplayItem}>X</span>
                                    {/* Weapon type select options */}
                                    {(this.state.displayItemWeaponChoices.length > 0)
                                        ?
                                        <div className="itemSection">
                                            <h2>{this.state.displayItem.Name}</h2>
                                            <p>Type:  <select name="displayItemWeaponTypeSelected" onChange={this.handleChange}>
                                                {this.state.displayItemWeaponChoices.map(item => (
                                                    <option value={item}>{item}</option>
                                                ))}
                                            </select> | Rarity: {this.state.displayItem.Rarity} <span className="customButton" onClick={this.handleSelectWeaponType}>Select Type</span></p>



                                        </div>
                                        :
                                        <div className="itemSection">
                                            <h2>{this.state.displayItem.Name}</h2>
                                            <p>Type: {this.state.displayItem.Type} | Rarity: {this.state.displayItem.Rarity}</p>
                                        </div>
                                    }
                                    {(this.state.displayItem.Use === true)
                                        ?
                                        <div className="itemSection">
                                            <p>Use: {this.state.displayItem.Effects.Use}</p>
                                            <p>Cool down: {this.state.displayItem.CoolDown}</p>
                                        </div>
                                        : null
                                    }
                                    {(this.state.displayItem.Passive === true)
                                        ?
                                        <div className="itemSection">
                                            <p>Passive: {this.state.displayItem.Effects.Passive}</p>
                                        </div>
                                        : null
                                    }
                                    {this.state.displayItem.Description.map(item => (
                                        <div className="itemSection">
                                            <p>{item}</p>
                                        </div>
                                    ))}
                                    {(this.state.displayItem.Table.length > 0)
                                        ?
                                        <div className="itemSection">
                                            {this.state.displayItem.Table.map(item => (
                                                <p>{item.Roll} | {item.Effect}</p>
                                            ))}
                                        </div>
                                        : null
                                    }
                                    {(this.state.displayItemArmorDetails)
                                        ?
                                        <div className="itemSection">
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
                                    {(this.state.displayItemWeaponTypeDetails)
                                        ?
                                        <div className="itemSection">
                                            <p>Weapon type: {this.state.displayItemWeaponTypeDetails.Name} | Style: {this.state.displayItemWeaponTypeDetails.Type}</p>
                                            <p>Damage: {this.state.displayItemWeaponTypeDetails.Damage} | Damage Type: {this.state.displayItemWeaponTypeDetails.Damage_Type}</p>
                                            <p>Weight: {this.state.displayItemWeaponTypeDetails.Weight}</p>
                                            {this.state.displayItemWeaponTypeDetails.Properties.map(item => (
                                                <p>{item}</p>
                                            ))}
                                        </div>
                                        : null
                                    }
                                </div>
                                : null
                            }
                        </div>
        )
    }
}

export default Treasure;