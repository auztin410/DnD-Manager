import React, { Component } from 'react';
import MagicItems from '../assets/Json/MagicItems.json';
import Equipment from '../assets/Json/Equipment';
import WeaponsList from '../assets/Json/WeaponsList';
import TradeGoods from '../assets/Json/TradeGoods';
import Mounts from '../assets/Json/Mounts';
import TackHarnessVehicle from '../assets/Json/Tack-Harness-Vehicle';
import Ships from '../assets/Json/Ships';
import Autocomplete from 'react-autocomplete';

class ItemSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemSelected: null
		};
	}
	render() {
		return (
			<div>
				<h1>Item Search</h1>
			</div>
		);
	}
}

export default ItemSearch;
