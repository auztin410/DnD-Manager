import React, { Component } from 'react';
import axios from 'axios';
import Draggable, { DraggableCore } from 'react-draggable';
import NpcGenerator from '../assets/Json/NpcGenerator';
import Npc from './Npc';
import WorldEventGenerator from '../assets/Json/World-Shaking-Events';
import WorldShakingEventComponent from './WorldShakingEvent';
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
import Spells from '../assets/Json/Spells';
import RaceList from '../assets/Json/RaceList';
import BackgroundList from '../assets/Json/BackgroundList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CharacterCreation from './CharacterCreation';
import Sounds from './Sounds';
import Grid from './Grid';
import QuestTracker from './QuestTracker';




class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            user: null,
            d20: ["Close", "110px", "94px", "spin", "1s", "0s"],
            npc: [],
            value: "",
            arrow: [false, "0px"],
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
            soundDiv: false,
            settlementDiv: false,
            creatureChallengeRatings: ["", "0", "1/2", "1/4", "1/8", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "19", "20", "21", "22", "23", "24", "30"],
            creatureTypes: ["", "aberration", "humanoid", "dragon", "undead", "elemental", "monstrosity", "construct", "beast", "plant", "fiend", "ooze", "fey", "giant", "celestial", "swarm of Tiny beasts"],
            searchByChallengeRating: "",
            searchByType: "",
            translationDiv: false,
            worldMapDiv: false,
            gridDiv: false,
            equipmentDiv: false,
            merchantDiv: false,
            characterDiv: false,
            questDiv: false,
            enemy: null,
            worldMap: null,
            showWorldMap: false,
            squareModal: false,
            equipmentPack: "Burglar's Pack",
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
        this.handled20 = this.handled20.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
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
        this.handleSelectWeaponType = this.handleSelectWeaponType.bind(this);
        this.handleEquipmentPack = this.handleEquipmentPack.bind(this);
        this.handleSearchCreature = this.handleSearchCreature.bind(this);
        this.handleSelectCreature = this.handleSelectCreature.bind(this);
        this.handleMerchantEquipment = this.handleMerchantEquipment.bind(this);
        this.handleMerchantPurchase = this.handleMerchantPurchase.bind(this);
        this.handleVendorSections = this.handleVendorSections.bind(this);
        this.handleGenerateSettlement = this.handleGenerateSettlement.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.economicStatus = this.economicStatus.bind(this);

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

    handled20() {
		if (this.state.d20[0] === "Close") {
			this.setState({
				d20: ["Open", "0px", "0px", "spinRev", "1s", "0s"],
			});
		}
		else if (this.state.d20[0] === "Open") {
			this.setState({
				d20: ["Close", "110px", "94px", "spin", "0s", "1s"],
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

    handleNpcGenerator() {
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


    handleWorldShakingEvent() {
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
        // console.log(`Dice roll ${result}`);
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
                   
                    
                  
                    <div className="upArrow" style={{height: this.state.arrow[1]}}>
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/Loot.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Loot_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Loot.png'))} alt="loot" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/Buttons/Treasure.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Treasure_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Treasure.png'))} alt="treasure" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/Buttons/NPC.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/NPC_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/NPC.png'))} alt="npc" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/Buttons/Event.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Event_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Event.png'))} alt="bigEvent" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/Buttons/Enemy.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Enemy_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Enemy.png'))} alt="enemy" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/Buttons/Translate.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Translate_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Translate.png'))} alt="translation" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/Buttons/World_Map.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/World_Map_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/World_Map.png'))} alt="worldMap" />
                        <br/>
                        <img onClick={this.handleOpenClose} src={require('../assets/Buttons/Grid.png')} onMouseOver={e => (e.currentTarget.src = require('../assets/Buttons/Grid_Hover.png'))} onMouseOut={e => (e.currentTarget.src = require('../assets/Buttons/Grid.png'))} alt="gridMap" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/loot.png')} alt="equipment" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/npc.png')} alt="merchant" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/npc.png')} alt="sound" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/town.png')} alt="settlement" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/npc.png')} alt="character" />{" "}<img onClick={this.handleOpenClose} src={require('../assets/npc.png')} alt="quest"/>
                    </div>
                    {(this.state.arrow[0] === false)
                        ?
                        <div><FontAwesomeIcon onClick={this.handleArrow} icon="caret-down" className="arrowIcon"/></div>
                        :
                        <div className="UpArrow"><FontAwesomeIcon onClick={this.handleArrow} icon="caret-up" className="arrowIcon"/></div>
                        }
                    
                    
                    
                    

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
                                <WorldShakingEventComponent worldShakingEvent={this.state.worldShakingEvent} worldShakingDetails={this.state.worldShakingDetails} />
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
                                <Autocomplete
                                    items={CreatureNames}
                                    inputProps={{style: {fontSize: "18px"}}}
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
                        ? <Grid/>
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
                                </select>{" "}<span className="customButton" onClick={this.handleEquipmentPack}>Select</span>                                
                            </form>
                            {(this.state.itemsInPack.length > 0)
                                ?
                                <div>
                                    <table>
                                        <tr id="tableHeader">
                                            <th>Item</th>
                                            <th>Cost</th>
                                            <th>Weight</th>
                                            <th>Quantity</th>
                                        </tr>
                                    {this.state.itemsInPack.map(item => (
                                        <tr className="profRow">
                                            <td className="profRow">{item.Name}</td>
                                            <td className="profRow">{item.Cost}{" "}{item.Currency}</td>
                                            <td className="profRow">{item.Weight}</td>
                                            <td className="profRow">{item.Quantity}</td>
                                        </tr>
                                    ))}
                                    </table>
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
                        <div className="visible" id="merchantDiv">
                            <div className="merchantOptions">
                                {(this.state.vendorSections[0] === true)
                                    ?
                                    <div>
                                        <h2 onClick={this.handleVendorSections} className="woodSign">Items</h2>
                                        {this.state.vendorEquipment.map(item => (
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name} value={item.Name}>{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.</div>
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
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}>{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.</div>
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
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}>{item.Name} | Cost: {item.Cost} {item.Currency} | Carry Weight: {item.CarryingCapacity} | Walking Speed: {item.Speed}</div>
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
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}>{item.Name} | Cost: {item.Cost} {item.Currency} | Weight: {item.Weight}</div>
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
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}>{item.Name} | Cost: {item.Cost} {item.Currency} | Swimming Speed: {item.Speed} Mph</div>
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
                                            <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}>{item.Name} | Cost: {item.Cost} {item.Currency} | Swimming Speed: {item.Speed} Mph</div>
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
                        ? <Sounds/>
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
                        ? <CharacterCreation/>
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