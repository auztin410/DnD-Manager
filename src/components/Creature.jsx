import React, { Component } from 'react';
import Monsters from '../assets/Json/5e-SRD-Monsters';
import MonsterDetails from './MonsterDetails';
import Autocomplete from 'react-autocomplete';
import CreatureNames from '../assets/Json/CreatureNames';
import CreatureTypes from '../assets/Json/CreatureTypes';

class Creature extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            creatureNamesAutoComplete: ["Aboleth", "Acolyte", "Adult Black Dragon", "Adult Blue Dracolich", "Adult Blue Dragon", "Adult Brass Dragon", "Adult Bronze Dragon", "Adult Copper Dragon", "Adult Gold Dragon", "Adult Green Dragon", "Adult Red Dragon", "Adult Silver Dragon", "Adult White Dragon", "Air Elemental", "Ancient Black Dragon", "Ancient Blue Dragon", "Ancient Brass Dragon", "Ancient Bronze Dragon", "Ancient Copper Dragon", "Ancient Gold Dragon", "Ancient Green Dragon", "Ancient Red Dragon", "Ancient Silver Dragon", "Ancient White Dragon", "Androsphinx", "Animated Armor", "Ankheg", "Ape", "Archmage", "Assassin", "Awakened Shrub", "Awakened Tree", "Axe Beak", "Azer", "Baboon", "Badger", "Balor", "Bandit", "Bandit Captain", "Barbed Devil", "Basilisk", "Bat", "Bearded Devil", "Behir", "Berserker", "Black Bear", "Black Dragon Wyrmling", "Black Pudding", "Blink Dog", "Blood Hawk", "Blue Dragon Wyrmling", "Boar", "Bone Devil", "Brass Dragon Wyrmling", "Bronze Dragon Wyrmling", "Brown Bear", "Bugbear", "Bulette", "Camel", "Carrion Crawler", "Cat", "Cave Bear", "Centaur", "Chain Devil", "Chimera", "Chuul", "Clay Golem", "Cloaker", "Cloud Giant", "Cockatrice", "Commoner", "Constrictor Snake", "Copper Dragon Wyrmling", "Couatl", "Crab", "Crocodile", "Cult Fanatic", "Cultist", "Darkmantle", "Death Dog", "Deep Gnome (Svirfneblin)", "Deer", "Deva", "Dire Wolf", "Djinni", "Doppelganger", "Draft Horse", "Dragon Turtle", "Dretch", "Drider", "Drow", "Druid", "Dryad", "Duergar", "Dust Mephit", "Eagle", "Earth Elemental", "Efreeti", "Elephant", "Elk", "Erinyes", "Ettercap", "Ettin", "Fire Elemental", "Fire Giant", "Flesh Golem", "Flying Snake", "Flying Sword", "Frog", "Frost Giant", "Gargoyle", "Gelatinous Cube", "Ghast", "Ghost", "Ghoul", "Giant Ape", "Giant Badger", "Giant Bat", "Giant Boar", "Giant Centipede", "Giant Constrictor Snake", "Giant Crab", "Giant Crocodile", "Giant Eagle", "Giant Elk", "Giant Fire Beetle", "Giant Frog", "Giant Goat", "Giant Hyena", "Giant Lizard", "Giant Octopus", "Giant Owl", "Giant Poisonous Snake", "Giant Rat", "Giant Rat (Diseased)", "Giant Scorpion", "Giant Sea Horse", "Giant Shark", "Giant Spider", "Giant Toad", "Giant Vulture", "Giant Wasp", "Giant Weasel", "Giant Wolf Spider", "Gibbering Mouther", "Glabrezu", "Gladiator", "Gnoll", "Goat", "Goblin", "Gold Dragon Wyrmling", "Gorgon", "Gray Ooze", "Green Dragon Wyrmling", "Green Hag", "Grick", "Griffon", "Grimlock", "Guard", "Guardian Naga", "Gynosphinx", "Half-Red Dragon Veteran", "Harpy", "Hawk", "Hell Hound", "Hezrou", "Hill Giant", "Hippogriff", "Hobgoblin", "Homunculus", "Horned Devil", "Hunter Shark", "Hydra", "Hyena", "Ice Devil", "Ice Mephit", "Imp", "Invisible Stalker", "Iron Golem", "Jackal", "Killer Whale", "Knight", "Kobold", "Kraken", "Lamia", "Lemure", "Lich", "Lion", "Lizard", "Lizardfolk", "Mage", "Magma Mephit", "Magmin", "Mammoth", "Manticore", "Marilith", "Mastiff", "Medusa", "Merfolk", "Merrow", "Mimic", "Minotaur", "Minotaur Skeleton", "Mule", "Mummy", "Mummy Lord", "Nalfeshnee", "Night Hag", "Nightmare", "Noble", "Ochre Jelly", "Octopus", "Ogre", "Ogre Zombie", "Oni", "Orc", "Otyugh", "Owl", "Owlbear", "Panther", "Pegasus", "Phase Spider", "Pit Fiend", "Planetar", "Plesiosaurus", "Poisonous Snake", "Polar Bear", "Pony", "Priest", "Pseudodragon", "Purple Worm", "Quasit", "Quipper", "Rakshasa", "Rat", "Raven", "Red Dragon Wyrmling", "Reef Shark", "Remorhaz", "Rhinoceros", "Riding Horse", "Roc", "Roper", "Rug of Smothering", "Rust Monster", "Saber-Toothed Tiger", "Sahuagin", "Salamander", "Satyr", "Scorpion", "Scout", "Sea Hag", "Sea Horse", "Shadow", "Shambling Mound", "Shield Guardian", "Shrieker", "Silver Dragon Wyrmling", "Skeleton", "Solar", "Specter", "Spider", "Spirit Naga", "Sprite", "Spy", "Steam Mephit", "Stirge", "Stone Giant", "Stone Golem", "Storm Giant", "Succubus/Incubus", "Swarm of Bats", "Swarm of Beetles", "Swarm of Centipedes", "Swarm of Insects", "Swarm of Poisonous Snakes", "Swarm of Quippers", "Swarm of Rats", "Swarm of Ravens", "Swarm of Spiders", "Swarm of Wasps", "Tarrasque", "Thug", "Tiger", "Treant", "Tribal Warrior", "Triceratops", "Troll", "Tyrannosaurus Rex", "Unicorn", "Vampire", "Vampire Spawn", "Veteran", "Violet Fungus", "Vrock", "Vulture", "Warhorse", "Warhorse Skeleton", "Water Elemental", "Weasel", "Werebear", "Wereboar", "Wererat", "Weretiger", "Werewolf", "White Dragon Wyrmling", "Wight", "Will-o'-Wisp", "Winter Wolf", "Wolf", "Worg", "Wraith", "Wyvern", "Xorn", "Young Black Dragon", "Young Blue Dragon", "Young Brass Dragon", "Young Bronze Dragon", "Young Copper Dragon", "Young Gold Dragon", "Young Green Dragon", "Young Red Dragon", "Young Silver Dragon", "Young White Dragon", "Zombie"],
            creatureChallengeRatings: ["", "0", "1/2", "1/4", "1/8", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "19", "20", "21", "22", "23", "24", "30"],
            creatureTypes: ["", "aberration", "humanoid", "dragon", "undead", "elemental", "monstrosity", "construct", "beast", "plant", "fiend", "ooze", "fey", "giant", "celestial", "swarm of Tiny beasts"],
            searchByChallengeRating: "",
            searchByType: "",
            enemy: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGenerateMonster = this.handleGenerateMonster.bind(this);
        this.handleSearchCreature = this.handleSearchCreature.bind(this);
        this.handleSelectCreature = this.handleSelectCreature.bind(this);
        this.handleMonsterActions = this.handleMonsterActions.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
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

    render() {
        return (
            <div className={this.props.display} id="monster">
                <div className="buttonSpacer">
                    <Autocomplete
                        items={CreatureNames}
                        inputProps={{ style: { fontSize: "18px" } }}
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
        )
    }
}

export default Creature;