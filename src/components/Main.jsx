import React, { Component } from 'react';
import axios from 'axios';
import Draggable, { DraggableCore } from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CharacterCreation from './CharacterCreation';
import Sounds from './Sounds';
import Grid from './Grid';
import QuestTracker from './QuestTracker';
import Loot from './Loot';
// import Treasure from './Treasure';
import NPCGenerator from './NPCGenerator';
import BigEvent from './BigEvent';
import Creature from './Creature';
import TransDiv from './TransDiv';
import Merchant from './Merchant';
import Settlement from './Settlement';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			user: null,
			sessionData: null,
			arrow: [ true, '150px' ],
			selected: [],
			number: -1,
			current: null,
			worldShakingComponent: false,
			individualLootDiv: false,
			// treasureLootDiv: false,
			npcDiv: false,
			bigEventDiv: false,
			monsterDiv: false,
			soundDiv: false,
			settlementDiv: false,
			translationDiv: false,
			gridDiv: false,
			merchantDiv: false,
			characterDiv: false,
			questDiv: false,
			bigEvent: false,
			loot: false,
			// treasure: false,
			npc: false,
			creature: false,
			sound: false,
			settlement: false,
			translation: false,
			grid: false,
			merchant: false,
			quest: false
		};

		this.handleArrow = this.handleArrow.bind(this);
		this.handleOpenClose = this.handleOpenClose.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleFindIndex = this.handleFindIndex.bind(this);
	}

	componentDidMount() {
		let list = [];
		for (let i = 1; i <= 400; i++) {
			list.push({ id: i, Player: '' });
		}

		axios.get('/auth/user').then((response) => {
			console.log(response.data);
			if (!response.data.user) {
				console.log('THERE IS A USER');
				this.setState(
					{
						loggedIn: true,
						user: response.data.user
					},
					() => {
						let url = window.location.href;
						let sessionId = url.split('/').pop();
						console.log(sessionId);
						axios
							.get(`/session/load/${sessionId}/${this.state.user._id}`)
							.then((response) => {
								console.log('Find Session Response');
								console.log(response);
								this.setState({
									sessionData: response.data
								});
							})
							.catch((err) => console.log(err));
					}
				);
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	handleArrow() {
		if (this.state.arrow[0] === false) {
			this.setState({
				arrow: [ true, '150px' ]
			});
		} else if (this.state.arrow[0] === true) {
			this.setState({
				arrow: [ false, '0px' ]
			});
		}
	}

	handleFindIndex(section) {
		let array = this.state.selected;
		let i = array.indexOf(section);

		let l = array.length - 1;
		if (i === l) {
			return true;
		} else {
			return false;
		}
	}

	// ______                               _____                         _   _____  __  __                   _   _____            _ _
	// | ___ \                             |  _  |                       | | |  _  |/ _|/ _|                 | | /  __ \          | (_)
	// | |_/ / __ _ _ __  _ __   ___ _ __  | | | |_ __     __ _ _ __   __| | | | | | |_| |_    __ _ _ __   __| | | /  \/_   _  ___| |_ _ __   __ _
	// | ___ \/ _` | '_ \| '_ \ / _ \ '__| | | | | '_ \   / _` | '_ \ / _` | | | | |  _|  _|  / _` | '_ \ / _` | | |   | | | |/ __| | | '_ \ / _` |
	// | |_/ / (_| | | | | | | |  __/ |    \ \_/ / | | | | (_| | | | | (_| | \ \_/ / | | |   | (_| | | | | (_| | | \__/\ |_| | (__| | | | | | (_| |
	// \____/ \__,_|_| |_|_| |_|\___|_|     \___/|_| |_|  \__,_|_| |_|\__,_|  \___/|_| |_|    \__,_|_| |_|\__,_|  \____/\__, |\___|_|_|_| |_|\__, |
	//                                                                                                                   __/ |                __/ |
	//                                                                                                                  |___/                |___/

	handleOpenClose(div) {
		switch (div) {
			//  _____          _ _       _     _             _   _                 _     _____           _   _
			//  |_   _|        | (_)     (_)   | |           | | | |               | |   /  ___|         | | (_)
			//    | | _ __   __| |___   ___  __| |_   _  __ _| | | |     ___   ___ | |_  \ `--.  ___  ___| |_ _  ___  _ __
			//    | || '_ \ / _` | \ \ / / |/ _` | | | |/ _` | | | |    / _ \ / _ \| __|  `--. \/ _ \/ __| __| |/ _ \| '_ \
			//   _| || | | | (_| | |\ V /| | (_| | |_| | (_| | | | |___| (_) | (_) | |_  /\__/ /  __/ (__| |_| | (_) | | | |
			//   \___/_| |_|\__,_|_| \_/ |_|\__,_|\__,_|\__,_|_| \_____/\___/ \___/ \__| \____/ \___|\___|\__|_|\___/|_| |_|

			case 'loot':
				if (this.state.individualLootDiv === false && this.state.selected.length === 0) {
					console.log('Hitting If statement');
					this.setState(
						{
							individualLootDiv: true,
							selected: [ ...this.state.selected, 'loot' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.individualLootDiv === false) {
					console.log('Hitting First Else if');
					this.setState({
						individualLootDiv: true,
						selected: [ ...this.state.selected, 'loot' ]
					});
				} else if (this.state.individualLootDiv === true && this.state.current === 'loot') {
					console.log('Hitting second Else if');
					console.log(this.state.selected.length);
					if (this.state.selected.length === 1) {
						console.log('Hitting If statement inside of Else if');
						console.log(`Selected length ${this.state.selected.length}`);
						let selected = this.state.selected;
						let index = selected.findIndex((item) => item === 'loot');
						selected.splice(index, 1);
						this.setState(
							{
								individualLootDiv: false,
								selected: []
							},
							() => {
								this.handleBack();
							}
						);

						// Testing this else if to go to the next instead of the last
					} else if (this.handleFindIndex('loot') === true) {
						console.log('Hitting new else if statement');
						let selected = this.state.selected;
						let index = selected.findIndex((item) => item === 'loot');
						selected.splice(index, 1);
						this.setState(
							{
								individualLootDiv: false,
								selected: selected
							},
							() => {
								this.handleNext();
							}
						);
					} else {
						console.log('Hitting else statement');
						let selected = this.state.selected;
						let index = selected.findIndex((item) => item === 'loot');
						selected.splice(index, 1);
						this.setState(
							{
								individualLootDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.individualLootDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'loot');
					selected.splice(index, 1);
					this.setState({
						individualLootDiv: false,
						selected: selected
					});
				}
				break;

			//  _   _ ______  _____   _____                _   _               _____           _   _
			//  | \ | || ___ \/  __ \ /  __ \              | | (_)             /  ___|         | | (_)
			//  |  \| || |_/ /| /  \/ | /  \/_ __ ___  __ _| |_ _  ___  _ __   \ `--.  ___  ___| |_ _  ___  _ __
			//  | . ` ||  __/ | |     | |   | '__/ _ \/ _` | __| |/ _ \| '_ \   `--. \/ _ \/ __| __| |/ _ \| '_ \
			//  | |\  || |    | \__/\ | \__/\ | |  __/ (_| | |_| | (_) | | | | /\__/ /  __/ (__| |_| | (_) | | | |
			//  \_| \_/\_|     \____/  \____/_|  \___|\__,_|\__|_|\___/|_| |_| \____/ \___|\___|\__|_|\___/|_| |_|

			case 'npc':
				if (this.state.npcDiv === false && this.state.selected.length === 0) {
					this.setState(
						{
							npcDiv: true,
							selected: [ ...this.state.selected, 'npc' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.npcDiv === false) {
					this.setState({
						npcDiv: true,
						selected: [ ...this.state.selected, 'npc' ]
					});
				} else if (this.state.npcDiv === true && this.state.current === 'npc') {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'npc');
					selected.splice(index, 1);
					if (this.state.length === 1) {
						this.setState(
							{
								npcDiv: false,
								selected: []
							},
							() => {
								this.handleBack();
							}
						);
					} else {
						this.setState(
							{
								npcDiv: false,
								selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.npcDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'npc');
					selected.splice(index, 1);
					this.setState({
						npcDiv: false,
						selected
					});
				}
				break;

			// ______ _         _____                _     _____           _   _
			// | ___ (_)       |  ___|              | |   /  ___|         | | (_)
			// | |_/ /_  __ _  | |____   _____ _ __ | |_  \ `--.  ___  ___| |_ _  ___  _ __
			// | ___ \ |/ _` | |  __\ \ / / _ \ '_ \| __|  `--. \/ _ \/ __| __| |/ _ \| '_ \
			// | |_/ / | (_| | | |___\ V /  __/ | | | |_  /\__/ /  __/ (__| |_| | (_) | | | |
			// \____/|_|\__, | \____/ \_/ \___|_| |_|\__| \____/ \___|\___|\__|_|\___/|_| |_|
			//           __/ |
			//          |___/

			case 'bigEvent':
				if (this.state.bigEventDiv === false && this.state.selected.length === 0) {
					this.setState(
						{
							bigEventDiv: true,
							selected: [ ...this.state.selected, 'bigEvent' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.bigEventDiv === false) {
					this.setState({
						bigEventDiv: true,
						selected: [ ...this.state.selected, 'bigEvent' ]
					});
				} else if (this.state.bigEventDiv === true && this.state.current === 'bigEvent') {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'bigEvent');
					selected.splice(index, 1);
					if (this.state.selected.length === 1) {
						this.setState(
							{
								bigEventDiv: false,
								selected: []
							},
							() => {
								this.handleBack();
							}
						);
					} else {
						this.setState(
							{
								bigEventDiv: false,
								selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.bigEventDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'bigEvent');
					selected.splice(index, 1);
					this.setState({
						bigEventDiv: false,
						selected
					});
				}
				break;

			//  _____                _                    _____           _   _
			//  /  __ \              | |                  /  ___|         | | (_)
			//  | /  \/_ __ ___  __ _| |_ _   _ _ __ ___  \ `--.  ___  ___| |_ _  ___  _ __
			//  | |   | '__/ _ \/ _` | __| | | | '__/ _ \  `--. \/ _ \/ __| __| |/ _ \| '_ \
			//  | \__/\ | |  __/ (_| | |_| |_| | | |  __/ /\__/ /  __/ (__| |_| | (_) | | | |
			//   \____/_|  \___|\__,_|\__|\__,_|_|  \___| \____/ \___|\___|\__|_|\___/|_| |_|

			case 'enemy':
				if (this.state.monsterDiv === false && this.state.selected.length === 0) {
					this.setState(
						{
							monsterDiv: true,
							selected: [ ...this.state.selected, 'enemy' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.monsterDiv === false) {
					this.setState({
						monsterDiv: true,
						selected: [ ...this.state.selected, 'enemy' ]
					});
				} else if (this.state.monsterDiv === true && this.state.current === 'enemy') {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'enemy');
					selected.splice(index, 1);
					if (this.state.selected.length === 1) {
						this.setState(
							{
								monsterDiv: false,
								selected: []
							},
							() => {
								this.handleBack();
							}
						);
					} else {
						this.setState(
							{
								monsterDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.monsterDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'enemy');
					selected.splice(index, 1);
					this.setState({
						monsterDiv: false,
						selected: selected
					});
				}
				break;

			//  _____                   _       _   _               _____           _   _
			//  |_   _|                 | |     | | (_)             /  ___|         | | (_)
			//    | |_ __ __ _ _ __  ___| | __ _| |_ _  ___  _ __   \ `--.  ___  ___| |_ _  ___  _ __
			//    | | '__/ _` | '_ \/ __| |/ _` | __| |/ _ \| '_ \   `--. \/ _ \/ __| __| |/ _ \| '_ \
			//    | | | | (_| | | | \__ \ | (_| | |_| | (_) | | | | /\__/ /  __/ (__| |_| | (_) | | | |
			//    \_/_|  \__,_|_| |_|___/_|\__,_|\__|_|\___/|_| |_| \____/ \___|\___|\__|_|\___/|_| |_|

			case 'translation':
				if (this.state.translationDiv === false && this.state.selected.length === 0) {
					this.setState(
						{
							translationDiv: true,
							selected: [ ...this.state.selected, 'translation' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.translationDiv === false) {
					this.setState({
						translationDiv: true,
						selected: [ ...this.state.selected, 'translation' ]
					});
				} else if (this.state.translationDiv === true && this.state.current === 'translation') {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'translation');
					selected.splice(index, 1);
					if (this.state.selected.length === 1) {
						this.setState(
							{
								translationDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					} else {
						this.setState(
							{
								translationDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.translationDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'translation');
					selected.splice(index, 1);
					this.setState({
						translationDiv: false,
						selected: selected
					});
				}
				break;

			//  _____      _     _   _____           _   _
			//  |  __ \    (_)   | | /  ___|         | | (_)
			//  | |  \/_ __ _  __| | \ `--.  ___  ___| |_ _  ___  _ __
			//  | | __| '__| |/ _` |  `--. \/ _ \/ __| __| |/ _ \| '_ \
			//  | |_\ \ |  | | (_| | /\__/ /  __/ (__| |_| | (_) | | | |
			//   \____/_|  |_|\__,_| \____/ \___|\___|\__|_|\___/|_| |_|

			case 'gridMap':
				if (this.state.gridDiv === false && this.state.selected.length === 0) {
					this.setState(
						{
							gridDiv: true,
							selected: [ ...this.state.selected, 'gridMap' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.gridDiv === false) {
					this.setState({
						gridDiv: true,
						selected: [ ...this.state.selected, 'gridMap' ]
					});
				} else if (this.state.gridDiv === true && this.state.current === 'gridMap') {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'gridMap');
					selected.splice(index, 1);
					if (this.state.selected.length === 1) {
						this.setState(
							{
								gridDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					} else {
						this.setState(
							{
								gridDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.gridDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'gridMap');
					selected.splice(index, 1);
					this.setState({
						gridDiv: false,
						selected: selected
					});
				}
				break;

			// ___  ___              _                 _     _____           _   _
			// |  \/  |             | |               | |   /  ___|         | | (_)
			// | .  . | ___ _ __ ___| |__   __ _ _ __ | |_  \ `--.  ___  ___| |_ _  ___  _ __
			// | |\/| |/ _ \ '__/ __| '_ \ / _` | '_ \| __|  `--. \/ _ \/ __| __| |/ _ \| '_ \
			// | |  | |  __/ | | (__| | | | (_| | | | | |_  /\__/ /  __/ (__| |_| | (_) | | | |
			// \_|  |_/\___|_|  \___|_| |_|\__,_|_| |_|\__| \____/ \___|\___|\__|_|\___/|_| |_|

			case 'merchant':
				if (this.state.merchantDiv === false && this.state.selected.length === 0) {
					this.setState(
						{
							merchantDiv: true,
							selected: [ ...this.state.selected, 'merchant' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.merchantDiv === false) {
					this.setState({
						merchantDiv: true,
						selected: [ ...this.state.selected, 'merchant' ]
					});
				} else if (this.state.merchantDiv === true && this.state.current === 'merchant') {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'merchant');
					selected.splice(index, 1);
					if (this.state.selected.length === 1) {
						this.setState(
							{
								merchantDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					} else {
						this.setState(
							{
								merchantDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.merchantDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'merchant');
					selected.splice(index, 1);
					this.setState({
						merchantDiv: false,
						selected: selected
					});
				}
				break;

			//   _____                       _   _____ __  __          _     _____           _   _
			//  /  ___|                     | | |  ___/ _|/ _|        | |   /  ___|         | | (_)
			//  \ `--.  ___  _   _ _ __   __| | | |__| |_| |_ ___  ___| |_  \ `--.  ___  ___| |_ _  ___  _ __
			//   `--. \/ _ \| | | | '_ \ / _` | |  __|  _|  _/ _ \/ __| __|  `--. \/ _ \/ __| __| |/ _ \| '_ \
			//  /\__/ / (_) | |_| | | | | (_| | | |__| | | ||  __/ (__| |_  /\__/ /  __/ (__| |_| | (_) | | | |
			//  \____/ \___/ \__,_|_| |_|\__,_| \____/_| |_| \___|\___|\__| \____/ \___|\___|\__|_|\___/|_| |_|

			case 'sound':
				if (this.state.soundDiv === false && this.state.selected.length === 0) {
					this.setState(
						{
							soundDiv: true,
							selected: [ ...this.state.selected, 'sound' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.soundDiv === false) {
					this.setState({
						soundDiv: true,
						selected: [ ...this.state.selected, 'sound' ]
					});
				} else if (this.state.soundDiv === true && this.state.current === 'sound') {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'sound');
					selected.splice(index, 1);
					if (this.state.selected.length === 1) {
						this.setState(
							{
								soundDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					} else {
						this.setState(
							{
								soundDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.soundDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'sound');
					selected.splice(index, 1);
					this.setState({
						soundDiv: false,
						selected: selected
					});
				}
				break;

			//   _____      _   _   _                           _     _____           _   _
			//  /  ___|    | | | | | |                         | |   /  ___|         | | (_)
			//  \ `--.  ___| |_| |_| | ___ _ __ ___   ___ _ __ | |_  \ `--.  ___  ___| |_ _  ___  _ __
			//   `--. \/ _ \ __| __| |/ _ \ '_ ` _ \ / _ \ '_ \| __|  `--. \/ _ \/ __| __| |/ _ \| '_ \
			//  /\__/ /  __/ |_| |_| |  __/ | | | | |  __/ | | | |_  /\__/ /  __/ (__| |_| | (_) | | | |
			//  \____/ \___|\__|\__|_|\___|_| |_| |_|\___|_| |_|\__| \____/ \___|\___|\__|_|\___/|_| |_|

			case 'settlement':
				if (this.state.settlementDiv === false && this.state.selected.length === 0) {
					this.setState(
						{
							settlementDiv: true,
							selected: [ ...this.state.selected, 'settlement' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.settlementDiv === false) {
					this.setState({
						settlementDiv: true,
						selected: [ ...this.state.selected, 'settlement' ]
					});
				} else if (this.state.settlementDiv === true && this.state.current === 'settlement') {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'settlement');
					selected.splice(index, 1);
					if (this.state.selected === 1) {
						this.setState(
							{
								settlementDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					} else {
						this.setState(
							{
								settlementDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.settlementDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'settlement');
					selected.splice(index, 1);
					this.setState({
						settlementDiv: false,
						selected: selected
					});
				}
				break;

			//   _____                 _     _____           _   _
			//  |  _  |               | |   /  ___|         | | (_)
			//  | | | |_   _  ___  ___| |_  \ `--.  ___  ___| |_ _  ___  _ __
			//  | | | | | | |/ _ \/ __| __|  `--. \/ _ \/ __| __| |/ _ \| '_ \
			//  \ \/' / |_| |  __/\__ \ |_  /\__/ /  __/ (__| |_| | (_) | | | |
			//   \_/\_\\__,_|\___||___/\__| \____/ \___|\___|\__|_|\___/|_| |_|

			case 'quest':
				if (this.state.questDiv === false && this.state.selected.length === 0) {
					this.setState(
						{
							questDiv: true,
							selected: [ ...this.state.selected, 'quest' ]
						},
						() => {
							this.handleNext();
						}
					);
				} else if (this.state.questDiv === false) {
					this.setState({
						questDiv: true,
						selected: [ ...this.state.selected, 'quest' ]
					});
				} else if (this.state.questDiv === true && this.state.current === 'quest') {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'quest');
					selected.splice(index, 1);
					if (this.state.selected.length === 1) {
						this.setState(
							{
								questDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					} else {
						this.setState(
							{
								questDiv: false,
								selected: selected
							},
							() => {
								this.handleBack();
							}
						);
					}
				} else if (this.state.questDiv === true) {
					let selected = this.state.selected;
					let index = selected.findIndex((item) => item === 'quest');
					selected.splice(index, 1);
					this.setState({
						questDiv: false,
						selected: selected
					});
				}
				break;
		}
	}

	handleNext() {
		console.log('Next');
		let selected = this.state.selected;
		let i = this.state.number;
		i = i + 1;
		i = i % selected.length;
		let current = selected[i];
		this.setState({
			current: current,
			number: i
		});
	}

	handleBack() {
		console.log('Back');
		let selected = this.state.selected;
		let i = this.state.number;
		if (i === 0) {
			i = selected.length;
		}
		i = i - 1;
		let current = selected[i];
		this.setState({
			current: current,
			number: i
		});
	}

	render() {
		return (
			<div>
				<div className="upArrow" style={{ height: this.state.arrow[1] }}>
					<div className="bannerContainer">
						<div
							className={this.state.individualLootDiv === true ? 'bannerOpen' : 'bannerBlack'}
							id="bannerFifthInner"
							onClick={() => this.handleOpenClose('loot')}
						>
							<FontAwesomeIcon icon="coins" className="bannerIcon" />
						</div>
						{/* <div className={(this.state.treasureLootDiv === true) ? "bannerOpen" : "bannerGrey"} id="bannerFourthInner" onClick={() => this.handleOpenClose("treasure")}><FontAwesomeIcon icon="dice-d20" className="bannerIcon" /></div> */}
						<div
							className={this.state.npcDiv === true ? 'bannerOpen' : 'bannerRed'}
							id="bannerThirdInner"
							onClick={() => this.handleOpenClose('npc')}
						>
							<FontAwesomeIcon icon="address-card" className="bannerIcon" />
						</div>
						<div
							className={this.state.bigEventDiv === true ? 'bannerOpen' : 'bannerBlack'}
							id="bannerSecondInner"
							onClick={() => this.handleOpenClose('bigEvent')}
						>
							<FontAwesomeIcon icon="cloud-moon" className="bannerIcon" />
						</div>
						<div
							className={this.state.monsterDiv === true ? 'bannerOpen' : 'bannerGrey'}
							id="bannerInner"
							onClick={() => this.handleOpenClose('enemy')}
						>
							<FontAwesomeIcon icon="dragon" className="bannerIcon" />
						</div>
						<div
							className={this.state.translationDiv === true ? 'bannerOpen' : 'bannerRed'}
							id="bannerMiddle"
							onClick={() => this.handleOpenClose('translation')}
						>
							<FontAwesomeIcon icon="map-signs" className="bannerIcon" />
						</div>
						<div
							className={this.state.gridDiv === true ? 'bannerOpen' : 'bannerGrey'}
							id="bannerInner"
							onClick={() => this.handleOpenClose('gridMap')}
						>
							<FontAwesomeIcon icon="chess-board" className="bannerIcon" />
						</div>
						<div
							className={this.state.merchantDiv === true ? 'bannerOpen' : 'bannerBlack'}
							id="bannerSecondInner"
							onClick={() => this.handleOpenClose('merchant')}
						>
							<FontAwesomeIcon icon="hands-helping" className="bannerIcon" />
						</div>
						<div
							className={this.state.soundDiv === true ? 'bannerOpen' : 'bannerRed'}
							id="bannerThirdInner"
							onClick={() => this.handleOpenClose('sound')}
						>
							<FontAwesomeIcon icon="drum" className="bannerIcon" />
						</div>
						<div
							className={this.state.settlementDiv === true ? 'bannerOpen' : 'bannerGrey'}
							id="bannerFourthInner"
							onClick={() => this.handleOpenClose('settlement')}
						>
							<FontAwesomeIcon icon="landmark" className="bannerIcon" />
						</div>
						<div
							className={this.state.questDiv === true ? 'bannerOpen' : 'bannerBlack'}
							id="bannerFifthInner"
							onClick={() => this.handleOpenClose('quest')}
						>
							<FontAwesomeIcon icon="exclamation" className="bannerIcon" />
						</div>
					</div>
				</div>
				{this.state.arrow[0] === false ? (
					<div>
						<FontAwesomeIcon onClick={this.handleArrow} icon="caret-down" className="arrowIcon" />
					</div>
				) : (
					<div className="UpArrow">
						<FontAwesomeIcon onClick={this.handleArrow} icon="caret-up" className="arrowIcon" />
					</div>
				)}

				{/* Left and Right Arrows */}
				{this.state.selected.length === 0 ? null : (
					<span onClick={this.handleBack} className="leftArrow">
						<img
							src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/angle-left.svg')}
							alt="leftArrow"
						/>
					</span>
				)}
				{this.state.selected.length === 0 ? null : (
					<span onClick={this.handleNext} className="rightArrow">
						<img
							src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/angle-right.svg')}
							alt="rightArrow"
						/>
					</span>
				)}

				{/* Individual Loot Div */}
				{this.state.current === 'loot' ? <Loot display={'visible'} /> : <Loot display={'invisible'} />}
				{/* Treasure Loot Div */}
				{/* {this.state.current === 'treasure' ? (
					<Treasure display={'visible'} />
				) : (
					<Treasure display={'invisible'} />
				)} */}
				{/* NPC Div */}
				{this.state.current === 'npc' ? (
					<NPCGenerator display={'visible'} />
				) : (
					<NPCGenerator display={'invisible'} />
				)}
				{/* World Shaking Event Div */}
				{this.state.current === 'bigEvent' ? (
					<BigEvent display={'visible'} />
				) : (
					<BigEvent display={'invisible'} />
				)}
				{/* Monster Generator Div */}
				{this.state.current === 'enemy' ? <Creature display={'visible'} /> : <Creature display={'invisible'} />}
				{/* Translation Div  */}
				{this.state.current === 'translation' ? (
					<TransDiv display={'visible'} />
				) : (
					<TransDiv display={'invisible'} />
				)}
				{/* Grid Div */}
				{this.state.current === 'gridMap' ? (
					<Grid display={'visible'} secondary={'gridMap'} />
				) : (
					<Grid display={'invisible'} />
				)}

				{/* Merchant Div */}
				{this.state.current === 'merchant' ? (
					<Merchant display={'visible'} />
				) : (
					<Merchant display={'invisible'} />
				)}
				{/* Sound Div */}
				{this.state.current === 'sound' ? <Sounds display={'visible'} /> : <Sounds display={'invisible'} />}
				{/* Generate Settlement Div */}
				{this.state.current === 'settlement' ? (
					<Settlement display={'visible'} />
				) : (
					<Settlement display={'invisible'} />
				)}
				{/* Quest Tracker Div */}
				{this.state.current === 'quest' ? (
					<QuestTracker display={'visible'} />
				) : (
					<QuestTracker display={'invisible'} />
				)}
			</div>
		);
	}
}

export default Main;
