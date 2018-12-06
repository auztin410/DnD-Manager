import React, { Component } from 'react';
import axios from 'axios';
import Draggable, { DraggableCore } from 'react-draggable';
import NpcGenerator from '../assets/Json/NpcGenerator';
import Npc from './Npc';
import WorldEventGenerator from '../assets/Json/World-Shaking-Events';
import WorldShakingEvent from './WorldShakingEvent';
import MagicItemsTables from '../assets/Json/MagicItemTables';
import GemList from '../assets/Json/Gemstones';
import ArtObjectList from '../assets/Json/ArtObject';
import MagicItemsList from '../assets/Json/MagicItemsList';
import WeaponsList from '../assets/Json/WeaponsList';
import Translation from './Translation';
import Monsters from '../assets/Json/5e-SRD-Monsters';
import MonsterDetails from './MonsterDetails';
import Autocomplete from 'react-autocomplete';
import CreatureNames from '../assets/Json/CreatureNames';
import CreatureTypes from '../assets/Json/CreatureTypes';
import Equipment from '../assets/Json/Equipment';
import EquipmentPacks from '../assets/Json/EquipmentPacks';
import TradeGoods from '../assets/Json/TradeGoods';
import Mounts from '../assets/Json/Mounts';
import TackHarnessVehicle from '../assets/Json/Tack-Harness-Vehicle';
import Ships from '../assets/Json/Ships';




class Main extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            user: null,
            npc: [],
            value: "",
            creatureNamesAutoComplete: ["Aboleth", "Acolyte", "Adult Black Dragon", "Adult Blue Dracolich", "Adult Blue Dragon", "Adult Brass Dragon", "Adult Bronze Dragon", "Adult Copper Dragon", "Adult Gold Dragon", "Adult Green Dragon", "Adult Red Dragon", "Adult Silver Dragon", "Adult White Dragon", "Air Elemental", "Ancient Black Dragon", "Ancient Blue Dragon", "Ancient Brass Dragon", "Ancient Bronze Dragon", "Ancient Copper Dragon", "Ancient Gold Dragon", "Ancient Green Dragon", "Ancient Red Dragon", "Ancient Silver Dragon", "Ancient White Dragon", "Androsphinx", "Animated Armor", "Ankheg", "Ape", "Archmage", "Assassin", "Awakened Shrub", "Awakened Tree", "Axe Beak", "Azer", "Baboon", "Badger", "Balor", "Bandit", "Bandit Captain", "Barbed Devil", "Basilisk", "Bat", "Bearded Devil", "Behir", "Berserker", "Black Bear", "Black Dragon Wyrmling", "Black Pudding", "Blink Dog", "Blood Hawk", "Blue Dragon Wyrmling", "Boar", "Bone Devil", "Brass Dragon Wyrmling", "Bronze Dragon Wyrmling", "Brown Bear", "Bugbear", "Bulette", "Camel", "Carrion Crawler", "Cat", "Cave Bear", "Centaur", "Chain Devil", "Chimera", "Chuul", "Clay Golem", "Cloaker", "Cloud Giant", "Cockatrice", "Commoner", "Constrictor Snake", "Copper Dragon Wyrmling", "Couatl", "Crab", "Crocodile", "Cult Fanatic", "Cultist", "Darkmantle", "Death Dog", "Deep Gnome (Svirfneblin)", "Deer", "Deva", "Dire Wolf", "Djinni", "Doppelganger", "Draft Horse", "Dragon Turtle", "Dretch", "Drider", "Drow", "Druid", "Dryad", "Duergar", "Dust Mephit", "Eagle", "Earth Elemental", "Efreeti", "Elephant", "Elk", "Erinyes", "Ettercap", "Ettin", "Fire Elemental", "Fire Giant", "Flesh Golem", "Flying Snake", "Flying Sword", "Frog", "Frost Giant", "Gargoyle", "Gelatinous Cube", "Ghast", "Ghost", "Ghoul", "Giant Ape", "Giant Badger", "Giant Bat", "Giant Boar", "Giant Centipede", "Giant Constrictor Snake", "Giant Crab", "Giant Crocodile", "Giant Eagle", "Giant Elk", "Giant Fire Beetle", "Giant Frog", "Giant Goat", "Giant Hyena", "Giant Lizard", "Giant Octopus", "Giant Owl", "Giant Poisonous Snake", "Giant Rat", "Giant Rat (Diseased)", "Giant Scorpion", "Giant Sea Horse", "Giant Shark", "Giant Spider", "Giant Toad", "Giant Vulture", "Giant Wasp", "Giant Weasel", "Giant Wolf Spider", "Gibbering Mouther", "Glabrezu", "Gladiator", "Gnoll", "Goat", "Goblin", "Gold Dragon Wyrmling", "Gorgon", "Gray Ooze", "Green Dragon Wyrmling", "Green Hag", "Grick", "Griffon", "Grimlock", "Guard", "Guardian Naga", "Gynosphinx", "Half-Red Dragon Veteran", "Harpy", "Hawk", "Hell Hound", "Hezrou", "Hill Giant", "Hippogriff", "Hobgoblin", "Homunculus", "Horned Devil", "Hunter Shark", "Hydra", "Hyena", "Ice Devil", "Ice Mephit", "Imp", "Invisible Stalker", "Iron Golem", "Jackal", "Killer Whale", "Knight", "Kobold", "Kraken", "Lamia", "Lemure", "Lich", "Lion", "Lizard", "Lizardfolk", "Mage", "Magma Mephit", "Magmin", "Mammoth", "Manticore", "Marilith", "Mastiff", "Medusa", "Merfolk", "Merrow", "Mimic", "Minotaur", "Minotaur Skeleton", "Mule", "Mummy", "Mummy Lord", "Nalfeshnee", "Night Hag", "Nightmare", "Noble", "Ochre Jelly", "Octopus", "Ogre", "Ogre Zombie", "Oni", "Orc", "Otyugh", "Owl", "Owlbear", "Panther", "Pegasus", "Phase Spider", "Pit Fiend", "Planetar", "Plesiosaurus", "Poisonous Snake", "Polar Bear", "Pony", "Priest", "Pseudodragon", "Purple Worm", "Quasit", "Quipper", "Rakshasa", "Rat", "Raven", "Red Dragon Wyrmling", "Reef Shark", "Remorhaz", "Rhinoceros", "Riding Horse", "Roc", "Roper", "Rug of Smothering", "Rust Monster", "Saber-Toothed Tiger", "Sahuagin", "Salamander", "Satyr", "Scorpion", "Scout", "Sea Hag", "Sea Horse", "Shadow", "Shambling Mound", "Shield Guardian", "Shrieker", "Silver Dragon Wyrmling", "Skeleton", "Solar", "Specter", "Spider", "Spirit Naga", "Sprite", "Spy", "Steam Mephit", "Stirge", "Stone Giant", "Stone Golem", "Storm Giant", "Succubus/Incubus", "Swarm of Bats", "Swarm of Beetles", "Swarm of Centipedes", "Swarm of Insects", "Swarm of Poisonous Snakes", "Swarm of Quippers", "Swarm of Rats", "Swarm of Ravens", "Swarm of Spiders", "Swarm of Wasps", "Tarrasque", "Thug", "Tiger", "Treant", "Tribal Warrior", "Triceratops", "Troll", "Tyrannosaurus Rex", "Unicorn", "Vampire", "Vampire Spawn", "Veteran", "Violet Fungus", "Vrock", "Vulture", "Warhorse", "Warhorse Skeleton", "Water Elemental", "Weasel", "Werebear", "Wereboar", "Wererat", "Weretiger", "Werewolf", "White Dragon Wyrmling", "Wight", "Will-o'-Wisp", "Winter Wolf", "Wolf", "Worg", "Wraith", "Wyvern", "Xorn", "Young Black Dragon", "Young Blue Dragon", "Young Brass Dragon", "Young Bronze Dragon", "Young Copper Dragon", "Young Gold Dragon", "Young Green Dragon", "Young Red Dragon", "Young Silver Dragon", "Young White Dragon", "Zombie"],
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
            displayItemWeaponChoices: [],
            displayItemWeaponTypeSelected: null,
            displayItemWeaponTypeDetails: null,
            textToTranslate: null,
            language: "Elvish",
            displayTranslation: false,
            individualLootDiv: false,
            treasureLootDiv: false,
            npcDiv: false,
            bigEventDiv: false,
            monsterDiv: false,
            creatureChallengeRatings: ["", "0", "1/2", "1/4", "1/8", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "19", "20", "21", "22", "23", "24", "30"],
            creatureTypes: ["", "aberration", "humanoid", "dragon", "undead", "elemental", "monstrosity", "construct", "beast", "plant", "fiend", "ooze", "fey", "giant", "celestial", "swarm of Tiny beasts"],
            searchByChallengeRating: "",
            searchByType: "",
            translationDiv: false,
            worldMapDiv: false,
            gridDiv: false,
            equipmentDiv: false,
            merchantDiv: false,
            enemy: null,
            worldMap: null,
            showWorldMap: false,
            squares: [],
            selectedSquare: null,
            gridName: null,
            squareModal: false,
            rotation: 0,
            player1Rotation: 0,
            player2Rotation: 0,
            player3Rotation: 0,
            player4Rotation: 0,
            tinyRotation: 0,
            smallRotation: 0,
            mediumRotation: 0,
            largeRotation: 0,
            hugeRotation: 0,
            gargantuanRotation: 0,
            torch: "off",
            gridIcons: "player1",
            gridIconPlayer1: false,
            gridIconPlayer2: false,
            gridIconPlayer3: false,
            gridIconPlayer4: false,
            gridIconTorch: false,
            gridIconTinyCreature1: false,
            gridIconSmallCreature1: false,
            gridIconMediumCreature1: false,
            gridIconLargeCreature1: false,
            gridIconHugeCreature1: false,
            gridIconGargantuanCreature1: false,
            equipmentPack: "Burglar's Pack",
            itemsInPack: [],
            itemsInPackTotalWeight: 0,
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
        this.handleTranslateClose = this.handleTranslateClose.bind(this);
        this.handleOpenClose = this.handleOpenClose.bind(this);
        this.handleGenerateMonster = this.handleGenerateMonster.bind(this);
        this.handleMonsterActions = this.handleMonsterActions.bind(this);
        this.handleLoadWorldMap = this.handleLoadWorldMap.bind(this);
        this.handleSquare = this.handleSquare.bind(this);
        this.handleSetSquare = this.handleSetSquare.bind(this);
        this.handleRotate = this.handleRotate.bind(this);
        this.handleTorch = this.handleTorch.bind(this);
        this.handleCreateIcon = this.handleCreateIcon.bind(this);
        this.handleRemoveIcon = this.handleRemoveIcon.bind(this);
        this.handleSelectWeaponType = this.handleSelectWeaponType.bind(this);
        this.handleEquipmentPack = this.handleEquipmentPack.bind(this);
        this.handleSearchCreature = this.handleSearchCreature.bind(this);
        this.handleSelectCreature = this.handleSelectCreature.bind(this);

        // Delete these after testing is complete.
        this.handleTestWeapons = this.handleTestWeapons.bind(this);
    }

    componentDidMount() {
        let list = [];
        for (let i = 1; i <= 400; i++) {
            list.push({ id: i, Player: "" });
        }

        axios.get('/auth/user').then(response => {
            console.log(response.data)
            if (!!response.data.user) {
                console.log('THERE IS A USER')
                this.setState({
                    loggedIn: true,
                    user: response.data.user,
                    squares: list,
                })
            } else {
                this.setState({
                    loggedIn: false,
                    user: null,
                    squares: list,
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
            npc: { name, appearance, highAbility, lowAbility, talents, mannerism, trait, ideals, bonds, flawsSecrets }
        });
    };


    handleWorldShakingEvent(event) {
        let bigEvent = WorldEventGenerator.Event[Math.floor(Math.random() * WorldEventGenerator.Event.length)];
        if (bigEvent === "Rise of a leader or an era" || bigEvent === "Fall of a leader or an era") {
            let details = WorldEventGenerator.Leader[Math.floor(Math.random() * WorldEventGenerator.Leader.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "Cataclysmic disaster") {
            let details = WorldEventGenerator.Disaster[Math.floor(Math.random() * WorldEventGenerator.Disaster.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "Assault or invasion") {
            let details = WorldEventGenerator.Invasion[Math.floor(Math.random() * WorldEventGenerator.Invasion.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "Extinction or depletion") {
            let details = WorldEventGenerator.Extinction[Math.floor(Math.random() * WorldEventGenerator.Extinction.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "New organization") {
            let details = WorldEventGenerator.Organization[Math.floor(Math.random() * WorldEventGenerator.Organization.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else if (bigEvent === "Discovery, expansion, invention") {
            let details = WorldEventGenerator.Discovery[Math.floor(Math.random() * WorldEventGenerator.Discovery.length)];
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: details,
            });
        }
        else {
            this.setState({
                worldShakingEvent: bigEvent,
                worldShakingDetails: null,
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

    // For testing weapon types
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

    handleTranslate(event) {
        this.setState({
            displayTranslation: true
        });
    };

    handleTranslateClose(event) {
        this.setState({
            displayTranslation: false,
            textToTranslate: null,
        })
    }

    handleOpenClose(event) {
        console.log(event.target.alt);
        switch (event.target.alt) {
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
            case ("worldMap"):
                if (this.state.worldMapDiv === false) {
                    this.setState({
                        worldMapDiv: true
                    });
                }
                else if (this.state.worldMapDiv === true) {
                    this.setState({
                        worldMapDiv: false
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
        }

    };

    handleCreateIcon() {
        switch (this.state.gridIcons) {
            case ("player1"):
                this.setState({
                    gridIconPlayer1: true
                });
                break;
            case ("player2"):
                this.setState({
                    gridIconPlayer2: true
                });
                break;
            case ("player3"):
                this.setState({
                    gridIconPlayer3: true
                });
                break;
            case ("player4"):
                this.setState({
                    gridIconPlayer4: true
                });
                break;
            case ("torch"):
                this.setState({
                    gridIconTorch: true
                });
                break;
            case ("tiny1"):
                this.setState({
                    gridIconTinyCreature1: true
                });
                break;
            case ("small1"):
                this.setState({
                    gridIconSmallCreature1: true
                });
                break;
            case ("medium1"):
                this.setState({
                    gridIconMediumCreature1: true
                });
                break;
            case ("large1"):
                this.setState({
                    gridIconLargeCreature1: true
                });
                break;
            case ("huge1"):
                this.setState({
                    gridIconHugeCreature1: true
                });
                break;
            case ("gargantuan1"):
                this.setState({
                    gridIconGargantuanCreature1: true
                });
                break;
        }
    };

    handleRemoveIcon(event) {
        switch (event.target.id) {
            case ("player1"):
                this.setState({
                    gridIconPlayer1: false
                });
                break;
            case ("player2"):
                this.setState({
                    gridIconPlayer2: false
                });
                break;
            case ("player3"):
                this.setState({
                    gridIconPlayer3: false
                });
                break;
            case ("player4"):
                this.setState({
                    gridIconPlayer4: false
                });
                break;
            case ("torch"):
                this.setState({
                    gridIconTorch: false
                });
                break;
            case ("tiny1"):
                this.setState({
                    gridIconTinyCreature1: false
                });
                break;
            case ("small1"):
                this.setState({
                    gridIconSmallCreature1: false
                });
                break;
            case ("medium1"):
                this.setState({
                    gridIconMediumCreature1: false
                });
                break;
            case ("large1"):
                this.setState({
                    gridIconLargeCreature1: false
                });
                break;
            case ("huge1"):
                this.setState({
                    gridIconHugeCreature1: false
                });
                break;
            case ("gargantuan1"):
                this.setState({
                    gridIconGargantuanCreature1: false
                });
                break;
        }
    }

    handleGenerateMonster() {
        var Enemy = Monsters[Math.floor(Math.random() * Monsters.length)];
        console.log(Enemy);
        this.setState({
            enemy: Enemy,
        });
    };

    handleSearchCreature() {
        let found = Monsters.find(resObj => resObj.name === this.state.value);
        console.log(found);
        this.setState({
            enemy: found,
        });
    };

    handleSelectCreature() {
        let arr = [];
        let randomCreature;
        if (this.state.searchByChallengeRating === "") {
            arr = Monsters.filter(resObj => resObj.type === this.state.searchByType);
        }
        else if (this.state.searchByType === "") {
            arr = Monsters.filter(resObj => resObj.challenge_rating === this.state.searchByChallengeRating);
        }
        else {
            arr = Monsters.filter(resObj => resObj.challenge_rating === this.state.searchByChallengeRating && resObj.type === this.state.searchByType);

        }

        randomCreature = arr[Math.floor(Math.random() * arr.length)];
        console.log(randomCreature);
        this.setState({
            enemy: randomCreature,
        });
    };

    handleMonsterActions() {
        console.log("monster action click");
        this.setState({
            monsterAction: true
        });
    };

    handleLoadWorldMap() {
        this.setState({
            showWorldMap: true,
        });
    };

    handleSquare(event) {
        let selected = event.target.id;
        let grid = this.state.squares;
        let selectedSquare = grid.find(element => element.id == event.target.id);
        console.log(selectedSquare);
        this.setState({
            squareModal: true,
            selectedSquare: selected,
        });
    };

    handleSetSquare() {
        let grid = this.state.squares;
        let selectedSquare = grid.findIndex(element => element.id == this.state.selected);
        console.log(selectedSquare);
        grid[selectedSquare] = { Number: this.state.selected, Player: this.state.gridName };
        this.setState({
            square: grid,
            squareModal: false,
        });

    };

    handleRotate(event) {
        console.log(event.target.id);
        switch (event.target.id) {
            case ("player1"):
                let newRotation1 = this.state.player1Rotation + 45;
                if (newRotation1 >= 360) {
                    newRotation1 = - 360;
                }
                this.setState({
                    player1Rotation: newRotation1,
                });
                break;
            case ("player2"):
                let newRotation2 = this.state.player2Rotation + 45;
                if (newRotation2 >= 360) {
                    newRotation2 = - 360;
                }
                this.setState({
                    player2Rotation: newRotation2,
                });
                break;
            case ("player3"):
                let newRotation3 = this.state.player3Rotation + 45;
                if (newRotation3 >= 360) {
                    newRotation3 = - 360;
                }
                this.setState({
                    player3Rotation: newRotation3,
                });
                break;
            case ("player4"):
                let newRotation4 = this.state.player4Rotation + 45;
                if (newRotation4 >= 360) {
                    newRotation4 = - 360;
                }
                this.setState({
                    player4Rotation: newRotation4,
                });
                break;
            case ("tiny"):
                let newRotation5 = this.state.tinyRotation + 45;
                if (newRotation5 >= 360) {
                    newRotation5 = - 360;
                }
                this.setState({
                    tinyRotation: newRotation5,
                });
                break;
            case ("small"):
                let newRotation6 = this.state.smallRotation + 45;
                if (newRotation6 >= 360) {
                    newRotation6 = - 360;
                }
                this.setState({
                    smallRotation: newRotation6,
                });
                break;
            case ("medium"):
                let newRotation7 = this.state.mediumRotation + 45;
                if (newRotation7 >= 360) {
                    newRotation7 = - 360;
                }
                this.setState({
                    mediumRotation: newRotation7,
                });
                break;
            case ("large"):
                let newRotation8 = this.state.largeRotation + 45;
                if (newRotation8 >= 360) {
                    newRotation8 = - 360;
                }
                this.setState({
                    largeRotation: newRotation8,
                });
                break;
            case ("huge"):
                let newRotation9 = this.state.hugeRotation + 45;
                if (newRotation9 >= 360) {
                    newRotation9 = - 360;
                }
                this.setState({
                    hugeRotation: newRotation9,
                });
                break;
            case ("gargantuan"):
                let newRotation10 = this.state.gargantuanRotation + 45;
                if (newRotation10 >= 360) {
                    newRotation10 = - 360;
                }
                this.setState({
                    gargantuanRotation: newRotation10,
                });
                break;
        }
    };

    handleTorch() {
        if (this.state.torch === "off") {
            this.setState({
                torch: "on"
            });
        }
        else if (this.state.torch === "on") {
            this.setState({
                torch: "off"
            });
        }
    };

    handleEquipmentPack() {
        console.log(`Equipment pack: ${this.state.equipmentPack}`);
        let pack = EquipmentPacks.find(element => element.Name == this.state.equipmentPack);
        console.log(pack);
        let items = pack.Items;
        let allItems = [];
        let allWeight = [];
        items.forEach(item => {
            let found = Equipment.find(element => element.Name === item.Name)
            found.Quantity = found.Count * item.Count;
            allItems.push(found);
            let weight = item.Count * found.Weight;
            allWeight.push(weight);
        });
        let totalWeight = allWeight.reduce(this.getSum);
        this.setState({
            itemsInPack: allItems,
            itemsInPackTotalWeight: totalWeight
        });
    };

    getSum(total, num) {
        return total + num;
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
                    <div className="buttons">
                        {/* Buttons for opening up divs */}
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/Loot.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Loot_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Loot.png'))} alt="loot" />
                        {" "}
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/Treasure.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Treasure_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Treasure.png'))} alt="treasure" />
                        {" "}
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/NPC.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/NPC_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/NPC.png'))} alt="npc" />
                        {" "}
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/Event.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Event_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Event.png'))} alt="bigEvent" />
                        {" "}
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/Enemy.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Enemy_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Enemy.png'))} alt="enemy" />
                        {" "}
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/Translate.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Translate_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Translate.png'))} alt="translation" />
                        {" "}
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/World_Map.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/World_Map_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/World_Map.png'))} alt="worldMap" />
                        {" "}
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/Grid.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Grid_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Grid.png'))} alt="gridMap" />
                        {" "}
                        <img onClick={this.handleOpenClose} src={require('../assets/loot.png')} alt="equipment" />
                        {" "}
                        <img onClick={this.handleOpenClose} src={require('../assets/npc.png')} alt="merchant" />
                    </div>

                    {/* Individual Loot Div */}
                    {(this.state.individualLootDiv === true)
                        ?
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
                        : null
                    }
                    {/* Treasure Loot Div */}
                    {(this.state.treasureLootDiv === true)
                        ?
                        <div className="visible" id="treasureLoot">
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
                                    {this.state.treasureArtResults.map(item => (
                                        <span className="items" key={item.Name}><p key={item.Name}>{item.Count} x | {item.Name} | {item.Value} GP</p></span>
                                    ))}
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
                        : null
                    }
                    {/* NPC Div */}
                    {(this.state.npcDiv === true)
                        ?
                        <div className="visible" id="npc">
                            <div className="buttonSpacer">
                                <span className="customButton" onClick={this.handleNpcGenerator}>NPC Generator</span>
                            </div>
                            {(this.state.npc.length === 0)
                                ? null
                                :
                                <Npc npc={this.state.npc} />
                            }
                        </div>
                        : null
                    }
                    {/* World Shaking Event Div */}
                    {(this.state.bigEventDiv === true)
                        ?
                        <div className="visible" id="worldShakingEvent">
                            <div className="buttonSpacer">
                                <span className="customButton" onClick={this.handleWorldShakingEvent}>World Shaking Event Generator</span>
                            </div>
                            {(this.state.worldShakingEvent)
                                ?
                                <WorldShakingEvent worldShakingEvent={this.state.worldShakingEvent} worldShakingDetails={this.state.worldShakingDetails} />
                                : null
                            }
                        </div>
                        : null
                    }
                    {/* Monster Generator Div */}
                    {(this.state.monsterDiv === true)
                        ?
                        <div className="visible" id="monster">
                            <div className="buttonSpacer">
                                {/* <input type="text" name="searchCreature" onChange={this.handleChange} />     */}
                                <Autocomplete
                                    items={CreatureNames}
                                    shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    getItemValue={item => item.label}
                                    renderItem={(item, highlighted) =>
                                        <div className="customButton"
                                            key={item.id}
                                            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                        >
                                            {item.label}
                                        </div>
                                    }
                                    value={this.state.value}
                                    onChange={e => this.setState({ value: e.target.value })}
                                    onSelect={value => this.setState({ value })}
                                />
                                {" "} <span className="customButton" onClick={this.handleSearchCreature}>Search</span> {" "} <span className="customButton" onClick={this.handleGenerateMonster}>Random</span> <select name="searchByChallengeRating" onChange={this.handleChange} className="customButton">{this.state.creatureChallengeRatings.map(item => (<option value={item} key={item}>{item}</option>))}</select> {" "} <select name="searchByType" onChange={this.handleChange} className="customButton">{CreatureTypes.map(item => (<option value={item.Name} key={item.Name}>{item.Title}</option>))}</select> {" "} <span onClick={this.handleSelectCreature} className="customButton">Find</span>
                            </div>
                            {(this.state.enemy)
                                ?
                                <MonsterDetails monster={this.state.enemy} />
                                :
                                <div>
                                    <h2>No Creature Found</h2>
                                </div>
                            }

                        </div>
                        : null
                    }
                    {/* Translation Div  */}
                    {(this.state.translationDiv === true)
                        ?
                        <div className="visible" id="translation">
                            <input className="customButton" name="textToTranslate" type="text" onChange={this.handleChange} />
                            <select className="customButton" name="language" onChange={this.handleChange}>
                                <option value="Elvish">Elvish</option>
                                <option value="Dwarven">Dwarven</option>
                                <option value="Draconic">Draconic</option>
                                <option value="Abyssal">Abyssal</option>
                            </select>
                            <span className="customButton" onClick={this.handleTranslate}>Translate</span>
                            <span className="customButton" onClick={this.handleTranslateClose}>Clear</span>
                            <br />
                            {(this.state.displayTranslation === true)
                                ?
                                <Translation language={this.state.language} textToTranslate={this.state.textToTranslate} />
                                : null}
                        </div>
                        : null
                    }
                    {/* World Map Div */}
                    {(this.state.worldMapDiv === true)
                        ?
                        <div className="visible" id="worldMap">

                            {(this.state.showWorldMap === true)
                                ?
                                <div>
                                    <br />
                                    <img className="mapImage" src={this.state.worldMap} alt="map" />
                                </div>
                                :
                                <div>
                                    <form>
                                        <input className="customButton" name="worldMap" type="text" onChange={this.handleChange} />
                                        <br />
                                        <br />
                                        <span className="customButton" onClick={this.handleLoadWorldMap}>Submit</span>
                                    </form>
                                </div>
                            }
                        </div>
                        : null}
                    {/* Grid Div */}
                    {(this.state.gridDiv === true)
                        ?
                        <div className="visible" id="gridMap">
                            {this.state.squares.map(item => (
                                <div className="square" key={item.id} onClick={this.handleSquare} id={item.id}>{item.Player}</div>
                            ))}
                        </div>
                        : null
                    }
                    {(this.state.gridDiv === true)
                        ?
                        <div className="visible" id="gridIcons">
                            <form>
                                <select name="gridIcons" onChange={this.handleChange}>
                                    <option value="player1">Player 1</option>
                                    <option value="player2">Player 2</option>
                                    <option value="player3">Player 3</option>
                                    <option value="player4">Player 4</option>
                                    <option value="torch">Torch</option>
                                    <option value="tiny1">Tiny Creature</option>
                                    <option value="small1">Small Creature</option>
                                    <option value="medium1">Medium Creature</option>
                                    <option value="large1">Large Creature</option>
                                    <option value="huge1">Huge Creature</option>
                                    <option value="gargantuan1">Gargantuan Creature</option>
                                </select>
                                <br />
                                <br />
                                <span className="customButton" onClick={this.handleCreateIcon}>Create</span>
                            </form>
                            {(this.state.gridIconPlayer1 === true)
                                ?
                                <div className="iconInfo">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="player1" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.player1Rotation}deg)` }}>1</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="player1" onClick={this.handleRemoveIcon}>Remove Player 1</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconPlayer2 === true)
                                ?
                                <div className="iconInfo">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="player2" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.player2Rotation}deg)` }}>2</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="player2" onClick={this.handleRemoveIcon}>Remove Player 2</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconPlayer3 === true)
                                ?
                                <div className="iconInfo">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="player3" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.player3Rotation}deg)` }}>3</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="player3" onClick={this.handleRemoveIcon}>Remove Player 3</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconPlayer4 === true)
                                ?
                                <div className="iconInfo">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="player4" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.player4Rotation}deg)` }}>4</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="player4" onClick={this.handleRemoveIcon}>Remove Player 4</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconTorch === true)
                                ?
                                <div className="iconInfo">
                                    <Draggable>
                                        <div>
                                            <div className={this.state.torch} onDoubleClick={this.handleTorch}>

                                            </div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="torch" onClick={this.handleRemoveIcon}>Remove Torch</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconTinyCreature1 === true)
                                ?
                                <div className="iconInfo">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="tiny" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.tinyRotation}deg)` }}>T</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="tiny1" onClick={this.handleRemoveIcon}>Remove Tiny Creature</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconSmallCreature1 === true)
                                ?
                                <div className="iconInfo">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="small" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.smallRotation}deg)` }}>S</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="small1" onClick={this.handleRemoveIcon}>Remove Small Creature</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconMediumCreature1 === true)
                                ?
                                <div className="iconInfo">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="medium" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.mediumRotation}deg)` }}>M</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="medium1" onClick={this.handleRemoveIcon}>Remove Medium Creature</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconLargeCreature1 === true)
                                ?
                                <div className="iconInfo" id="iconInfoLarge">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="large" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.largeRotation}deg)` }}>L</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="large1" onClick={this.handleRemoveIcon}>Remove Large Creature</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconHugeCreature1 === true)
                                ?
                                <div className="iconInfo" id="iconInfoHuge">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="huge" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.hugeRotation}deg)` }}>H</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="huge1" onClick={this.handleRemoveIcon}>Remove Huge Creature</button>
                                </div>
                                : null
                            }
                            {(this.state.gridIconGargantuanCreature1 === true)
                                ?
                                <div className="iconInfo" id="iconInfoGargantuan">
                                    <Draggable>
                                        <div>
                                            <div className="draggable" id="gargantuan" onDoubleClick={this.handleRotate} style={{ transform: `rotate(${this.state.gargantuanRotation}deg)` }}>G</div>
                                        </div>
                                    </Draggable>
                                    <button className="removeIcon" id="gargantuan1" onClick={this.handleRemoveIcon}>Remove Gargantuan Creature</button>
                                </div>
                                : null
                            }
                        </div>
                        : null
                    }
                    {(this.state.equipmentDiv === true)
                        ?
                        <div className="visible" id="equipmentDiv">
                            <form>
                                <select name="equipmentPack" onChange={this.handleChange} className="customButton">
                                    {EquipmentPacks.map(item => (
                                        <option value={item.Name} key={item.Name}>{item.Name} | {item.Cost} {item.Currency}</option>
                                    ))}
                                </select>
                                <br />
                                <br />
                                <span className="customButton" onClick={this.handleEquipmentPack}>Select</span>
                            </form>
                            {(this.state.itemsInPack.length > 0)
                                ?
                                <div>
                                    {this.state.itemsInPack.map(item => (
                                        <div className="monsterGrouping">
                                            <p>{item.Name} | Cost: {item.Cost} {item.Currency} | Weight: {item.Weight} lbs. | Quantity: {item.Quantity}</p>
                                        </div>
                                    ))}
                                    <div className="monsterGrouping">
                                        <p>Total weight: {this.state.itemsInPackTotalWeight} lbs.</p>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                        : null
                    }
                    {(this.state.merchantDiv === true)
                        ?
                        <div class="visible" id="merchantDiv">
                            <div className="merchantOptions">
                                <h2 className="woodSign">Items</h2>
                                {Equipment.map(item => (
                                    <div className="merchantItem">{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.</div>
                                ))}
                                <h2 className="woodSign">Trade Goods</h2>
                                {TradeGoods.map(item => (
                                    <div className="merchantItem">{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.</div>
                                ))}
                                <h2 className="woodSign">Mounts</h2>
                                {Mounts.map(item => (
                                    <div className="merchantItem">{item.Name} | Cost: {item.Cost} {item.Currency} | Carry Weight: {item.CarryingCapacity} | Walking Speed: {item.Speed}</div>
                                ))}
                                <h2 className="woodSign">Tack, Hardness, and Vehicles</h2>
                                {TackHarnessVehicle.map(item => (
                                   <div className="merchantItem">{item.Name} | Cost: {item.Cost} {item.Currency} | Weight: {item.Weight}</div> 
                                ))}
                                <h2 className="woodSign">Ships</h2>
                                {Ships.map(item => (
                                    <div className="merchantItem">{item.Name} | Cost: {item.Cost} {item.Currency} | Swimming Speed: {item.Speed} Mph</div>
                                ))}
                            </div>
                        </div>
                        : null
                    }
                </div>
            )
        }

    }
}

export default Main;