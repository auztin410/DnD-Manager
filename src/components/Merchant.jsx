import React, { Component } from 'react';
import WeaponsList from '../assets/Json/WeaponsList';
import Equipment from '../assets/Json/Equipment';
import EquipmentPacks from '../assets/Json/EquipmentPacks';
import TradeGoods from '../assets/Json/TradeGoods';
import Mounts from '../assets/Json/Mounts';
import TackHarnessVehicle from '../assets/Json/Tack-Harness-Vehicle';
import Ships from '../assets/Json/Ships';
import Armor from '../assets/Json/Armor';
import Food from '../assets/Json/Food';

class Merchant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			merchantPending: [],
			vendorSections: [ false, false, false, false, false, false, false, false ],
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
			vendorEquipment: Equipment,
			vendorWeapons: WeaponsList,
			vendorArmor: Armor,
			vendorTradeGoods: TradeGoods,
			vendorMounts: Mounts,
			vendorTackHarnessVehicle: TackHarnessVehicle,
			vendorShips: Ships,
			vendorFood: Food,
			merchantModal: false,
			item: null
			// vendorEquipment: [],
			// vendorWeapons: [],
			// vendorTradeGoods: [],
			// vendorMounts: [],
			// vendorTackHarnessVehicle: [],
			// vendorShips: [],
		};
		this.handleMerchantEquipment = this.handleMerchantEquipment.bind(this);
		this.handleRemoveFromPending = this.handleRemoveFromPending.bind(this);
		this.handleMerchantPurchase = this.handleMerchantPurchase.bind(this);
		this.handleVendorSections = this.handleVendorSections.bind(this);
		this.handleConversion = this.handleConversion.bind(this);
	}

	getSum(total, num) {
		return total + num;
	}

	handleMerchantEquipment(item) {
		this.setState({
			item,
			merchantModal: true
		});
		console.log(item);
		this.handleConversion(item);
	}

	// handleMerchantEquipment(item) {
	// 	console.log(item);
	// 	let pending = [ ...this.state.merchantPending.map((obj) => ({ ...obj })) ];
	// 	let thing = item;
	// 	let check = pending.find((el) => el.Name === thing.Name);
	// 	if (!check) {
	// 		thing.Count = 1;
	// 		pending.push(thing);
	// 	} else {
	// 		var foundIndex = pending.findIndex((el) => el.Name === check.Name);
	// 		item.Count += 1;
	// 		pending[foundIndex] = item;
	// 	}
	// 	let CP = [ 0 ];
	// 	let SP = [ 0 ];
	// 	let GP = [ 0 ];
	// 	let PP = [ 0 ];
	// 	pending.forEach((item) => {
	// 		let cost = item.Cost * item.Count;
	// 		if (item.Currency === 'CP') {
	// 			CP.push(cost);
	// 		} else if (item.Currency === 'SP') {
	// 			SP.push(cost);
	// 		} else if (item.Currency === 'GP') {
	// 			GP.push(cost);
	// 		} else if (item.Currency === 'PP') {
	// 			PP.push(cost);
	// 		}
	// 	});
	// 	let totalCP = CP.reduce(this.getSum);
	// 	let totalSP = SP.reduce(this.getSum);
	// 	let totalGP = GP.reduce(this.getSum);
	// 	let totalPP = PP.reduce(this.getSum);
	// 	this.setState({
	// 		merchantPending: pending,
	// 		pendingCP: totalCP,
	// 		pendingSP: totalSP,
	// 		pendingGP: totalGP,
	// 		pendingPP: totalPP
	// 	});
	// }

	handleRemoveFromPending(item) {
		console.log(item);
		let pending = [ ...this.state.merchantPending ];
		console.log(pending);

		let check = pending.find((el) => el.Name === item && el.Count > 1);
		console.log(check);
		if (!check) {
			let foundIndex = pending.findIndex((el) => el.Name === item);
			pending.splice(foundIndex, 1);
		} else {
			var foundIndex = pending.findIndex((el) => el.Name === check.Name);
			check.Count -= 1;
			pending[foundIndex] = check;
		}
		let CP = [ 0 ];
		let SP = [ 0 ];
		let EP = [ 0 ];
		let GP = [ 0 ];
		let PP = [ 0 ];
		pending.map((item) => {
			let cost = item.Cost * item.Count;
			if (item.Currency === 'CP') {
				CP.push(cost);
			} else if (item.Currency === 'SP') {
				SP.push(cost);
			} else if (item.Currency === 'EP') {
				EP.push(cost);
			} else if (item.Currency === 'GP') {
				GP.push(cost);
			} else if (item.Currency === 'PP') {
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
			pendingPP: totalPP
		});
	}

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
			let purchased = [ ...this.state.purchased ];
			let pending = [ ...this.state.merchantPending ];

			pending.forEach((item) => {
				let resObj = purchased.find((resObj) => resObj.Name === item.Name);
				resObj
					? (resObj.Count = resObj.Count + item.Count)
					: purchased.push({
							Name: item.Name,
							Cost: item.Cost,
							Count: item.Count,
							Description: item.Description,
							Weight: item.Weight,
							Currency: item.Currency
						});
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
				merchantPending: []
			});
		} else if (yourCP <= costCP && yourSP > costSP && yourEP > costEP && yourGP >= costGP && yourPP >= costPP) {
			while (yourCP < costCP) {
				console.log(`Your SP: ${yourSP} Your CP: ${yourCP}`);
				yourSP -= 1;
				yourCP += 10;
				console.log(`Your SP: ${yourSP} Your CP: ${yourCP}`);
			}
			while (yourSP < costSP) {
				console.log(`Your SP: ${yourSP} Your CP: ${yourCP}`);
				yourGP -= 1;
				yourSP += 10;
				console.log(`Your SP: ${yourSP} Your CP: ${yourCP}`);
			}
		}
	}

	handleVendorSections(event) {
		console.log(event.target.innerHTML);
		let array0True = [ ...this.state.vendorSections ];
		let array0False = [ ...this.state.vendorSections ];
		let array1True = [ ...this.state.vendorSections ];
		let array1False = [ ...this.state.vendorSections ];
		let array2True = [ ...this.state.vendorSections ];
		let array2False = [ ...this.state.vendorSections ];
		let array3True = [ ...this.state.vendorSections ];
		let array3False = [ ...this.state.vendorSections ];
		let array4True = [ ...this.state.vendorSections ];
		let array4False = [ ...this.state.vendorSections ];
		let array5True = [ ...this.state.vendorSections ];
		let array5False = [ ...this.state.vendorSections ];
		let array6True = [ ...this.state.vendorSections ];
		let array6False = [ ...this.state.vendorSections ];
		let array7True = [ ...this.state.vendorSections ];
		let array7False = [ ...this.state.vendorSections ];
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
		array6True[6] = true;
		array6False[6] = false;
		array7True[7] = true;
		array7False[7] = false;
		switch (event.target.innerHTML) {
			case 'Items':
				if (this.state.vendorSections[0] === false) {
					this.setState({
						vendorSections: array0True
					});
				} else if (this.state.vendorSections[0] === true) {
					this.setState({
						vendorSections: array0False
					});
				}
				break;
			case 'Trade Goods':
				if (this.state.vendorSections[1] === false) {
					this.setState({
						vendorSections: array1True
					});
				} else if (this.state.vendorSections[1] === true) {
					this.setState({
						vendorSections: array1False
					});
				}
				break;
			case 'Mounts':
				if (this.state.vendorSections[2] === false) {
					this.setState({
						vendorSections: array2True
					});
				} else if (this.state.vendorSections[2] === true) {
					this.setState({
						vendorSections: array2False
					});
				}
				break;
			case 'Tack, Hardness, and Vehicles':
				if (this.state.vendorSections[3] === false) {
					this.setState({
						vendorSections: array3True
					});
				} else if (this.state.vendorSections[3] === true) {
					this.setState({
						vendorSections: array3False
					});
				}
				break;
			case 'Ships':
				if (this.state.vendorSections[4] === false) {
					this.setState({
						vendorSections: array4True
					});
				} else if (this.state.vendorSections[4] === true) {
					this.setState({
						vendorSections: array4False
					});
				}
				break;
			case 'Weapons':
				if (this.state.vendorSections[5] === false) {
					this.setState({
						vendorSections: array5True
					});
				} else if (this.state.vendorSections[5] === true) {
					this.setState({
						vendorSections: array5False
					});
				}
				break;
			case 'Armor':
				if (this.state.vendorSections[6] === false) {
					this.setState({
						vendorSections: array6True
					});
				} else if (this.state.vendorSections[6] === true) {
					this.setState({
						vendorSections: array6False
					});
				}
				break;
			case 'Food':
				if (this.state.vendorSections[7] === false) {
					this.setState({
						vendorSections: array7True
					});
				} else if (this.state.vendorSections[7] === true) {
					this.setState({
						vendorSections: array7False
					});
				}
				break;
		}
	}

	CheckIfEven(copper, silver, electrum, gold, platinum) {
		if (Number.isInteger(copper) === true) {
			console.log(`Copper: ${copper}`);
		}
		if (Number.isInteger(silver) === true) {
			console.log(`Silver: ${silver}`);
		}
		if (Number.isInteger(electrum) === true) {
			console.log(`Electrum: ${electrum}`);
		}
		if (Number.isInteger(gold) === true) {
			console.log(`Gold: ${gold}`);
		}
		if (Number.isInteger(platinum) === true) {
			console.log(`Platinum: ${platinum}`);
		}
	}

	handleConversion(item) {
		let cost = item.Cost;
		let currency = item.Currency;

		// let cost = 3;
		// let currency = 'platinum';

		let copper;
		let silver;
		let electrum;
		let gold;
		let platinum;

		switch (currency) {
			case 'CP':
				copper = cost;
				silver = cost / 10;
				electrum = cost / 50;
				gold = cost / 100;
				platinum = cost / 1000;
				this.CheckIfEven(copper, silver, electrum, gold, platinum);
				break;
			case 'SP':
				copper = cost * 10;
				silver = cost;
				electrum = cost / 5;
				gold = cost / 10;
				platinum = cost / 100;
				this.CheckIfEven(copper, silver, electrum, gold, platinum);
				break;
			case 'EP':
				copper = cost * 50;
				silver = cost * 5;
				electrum = cost;
				gold = cost / 2;
				platinum = cost / 20;
				this.CheckIfEven(copper, silver, electrum, gold, platinum);
				break;
			case 'GP':
				copper = cost * 100;
				silver = cost * 10;
				electrum = cost * 2;
				gold = cost;
				platinum = cost / 10;
				this.CheckIfEven(copper, silver, electrum, gold, platinum);
				break;
			case 'PP':
				copper = cost * 1000;
				silver = cost * 100;
				electrum = cost * 20;
				gold = cost * 10;
				platinum = cost;
				this.CheckIfEven(copper, silver, electrum, gold, platinum);
				break;
		}
	}

	render() {
		return (
			<div className={this.props.display}>
				<div className="merchantOptions">
					{this.state.vendorSections[0] === true ? (
						<div>
							<h2 onClick={this.handleVendorSections} className="woodSign">
								Items
							</h2>
							{this.state.vendorEquipment.map((item) => {
								if (!item.Keyword) {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/box-full.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Artisan') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/hammer.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Gaming') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/solid/dice.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Musical') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/mandolin.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Ammunition') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/bow-arrow.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Vial') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/solid/flask-potion.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Arcane Focus') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/solid/hand-holding-magic.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Bag') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/solid/backpack.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Clothes') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/solid/tshirt.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Kit') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/solid/toolbox.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Paper') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/scroll-old.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Fire') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/fire-alt.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Food') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
											value={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/apple-crate.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								}
							})}
						</div>
					) : (
						<div>
							{this.state.vendorEquipment.length > 0 ? (
								<h2 onClick={this.handleVendorSections} className="woodSign">
									Items
								</h2>
							) : null}
						</div>
					)}
					{this.state.vendorSections[1] === true ? (
						<div>
							<h2 onClick={this.handleVendorSections} className="woodSign">
								Trade Goods
							</h2>
							{this.state.vendorTradeGoods.map((item) => {
								if (item.Keyword === 'Farm') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/wheat.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Livestock') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/cow.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Spice') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/mortar-pestle.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Ore') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/solid/dice-d12.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								} else if (item.Keyword === 'Cloth') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/scarf.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.
										</div>
									);
								}
							})}
						</div>
					) : (
						<div>
							{this.state.vendorTradeGoods.length > 0 ? (
								<h2 onClick={this.handleVendorSections} className="woodSign">
									Trade Goods
								</h2>
							) : null}
						</div>
					)}
					{this.state.vendorSections[2] === true ? (
						<div>
							<h2 onClick={this.handleVendorSections} className="woodSign">
								Mounts
							</h2>
							{this.state.vendorMounts.map((item) => (
								<div
									onClick={() => this.handleMerchantEquipment(item)}
									className="merchantItem"
									key={item.Name}
								>
									<img
										height="20px"
										width="20px"
										src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/horse.svg')}
										alt="item"
									/>{' '}
									{item.Name} | Cost: {item.Cost} {item.Currency} | Carry Weight:{' '}
									{item.CarryingCapacity} | Walking Speed: {item.Speed}
								</div>
							))}
						</div>
					) : (
						<div>
							{this.state.vendorMounts.length > 0 ? (
								<h2 onClick={this.handleVendorSections} className="woodSign">
									Mounts
								</h2>
							) : null}
						</div>
					)}
					{this.state.vendorSections[3] === true ? (
						<div>
							<h2 onClick={this.handleVendorSections} className="woodSign">
								Tack, Hardness, and Vehicles
							</h2>
							{this.state.vendorTackHarnessVehicle.map((item) => (
								<div
									onClick={() => this.handleMerchantEquipment(item)}
									className="merchantItem"
									key={item.Name}
								>
									<img
										height="20px"
										width="20px"
										src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/horse-head.svg')}
										alt="item"
									/>{' '}
									{item.Name} | Cost: {item.Cost} {item.Currency} | Weight: {item.Weight}
								</div>
							))}
						</div>
					) : (
						<div>
							{this.state.vendorTackHarnessVehicle.length > 0 ? (
								<h2 onClick={this.handleVendorSections} className="woodSign">
									Tack, Hardness, and Vehicles
								</h2>
							) : null}
						</div>
					)}
					{this.state.vendorSections[4] === true ? (
						<div>
							<h2 onClick={this.handleVendorSections} className="woodSign">
								Ships
							</h2>
							{this.state.vendorShips.map((item) => (
								<div
									onClick={() => this.handleMerchantEquipment(item)}
									className="merchantItem"
									key={item.Name}
								>
									<img
										height="20px"
										width="20px"
										src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/ship.svg')}
										alt="item"
									/>{' '}
									{item.Name} | Cost: {item.Cost} {item.Currency} | Swimming Speed: {item.Speed} Mph
								</div>
							))}
						</div>
					) : (
						<div>
							{this.state.vendorShips.length > 0 ? (
								<h2 onClick={this.handleVendorSections} className="woodSign">
									Ships
								</h2>
							) : null}
						</div>
					)}
					{this.state.vendorSections[5] === true ? (
						<div>
							<h2 onClick={this.handleVendorSections} className="woodSign">
								Weapons
							</h2>
							{this.state.vendorWeapons.map((item) => {
								if (item.Type === 'Simple Melee') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/sword.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | DMG: {item.Damage} |{' '}
											{item.Damage_Type}
										</div>
									);
								} else if (item.Type === 'Simple Ranged') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/bow-arrow.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | DMG: {item.Damage} |{' '}
											{item.Damage_Type}
										</div>
									);
								} else if (item.Type === 'Martial Melee') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/axe-battle.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | DMG: {item.Damage} |{' '}
											{item.Damage_Type}
										</div>
									);
								} else if (item.Type === 'Martial Ranged') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/solid/bow-arrow.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency} | DMG: {item.Damage} |{' '}
											{item.Damage_Type}
										</div>
									);
								}
							})}
						</div>
					) : (
						<div>
							{this.state.vendorWeapons.length > 0 ? (
								<h2 onClick={this.handleVendorSections} className="woodSign">
									Weapons
								</h2>
							) : null}
						</div>
					)}
					{this.state.vendorSections[6] === true ? (
						<div>
							<h2 onClick={this.handleVendorSections} className="woodSign">
								Armor
							</h2>
							{this.state.vendorArmor.map((item) => {
								if (item.Category === 'Light Armor') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/hat-wizard.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency}
										</div>
									);
								} else if (item.Category === 'Medium Armor') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/hood-cloak.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency}
										</div>
									);
								} else if (item.Category === 'Heavy Armor') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/regular/helmet-battle.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency}
										</div>
									);
								} else if (item.Category === 'Shield') {
									return (
										<div
											onClick={() => this.handleMerchantEquipment(item)}
											className="merchantItem"
											key={item.Name}
										>
											<img
												height="20px"
												width="20px"
												src={require('../assets/fontawesome-pro-5.6.3-web/svgs/solid/shield-cross.svg')}
												alt="item"
											/>{' '}
											{item.Name} | Cost: {item.Cost} {item.Currency}
										</div>
									);
								}
							})}
						</div>
					) : (
						<div>
							{this.state.vendorArmor.length > 0 ? (
								<h2 onClick={this.handleVendorSections} className="woodSign">
									Armor
								</h2>
							) : null}
						</div>
					)}
					{this.state.vendorSections[7] === true ? (
						<div>
							<h2 onClick={this.handleVendorSections} className="woodSign">
								Food
							</h2>
							{this.state.vendorFood.map((item) => (
								<div
									onClick={() => this.handleMerchantEquipment(item)}
									className="merchantItem"
									key={item.Name}
								>
									<img
										height="20px"
										width="20px"
										src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/utensils.svg')}
										alt="item"
									/>{' '}
									{item.Name} | Cost: {item.Cost} {item.Currency}
								</div>
							))}
						</div>
					) : (
						<div>
							{this.state.vendorFood.length > 0 ? (
								<h2 onClick={this.handleVendorSections} className="woodSign">
									Food
								</h2>
							) : null}
						</div>
					)}
				</div>

				{this.state.merchantModal === true ? (
					<div className="displayItem">
						<h2>{this.state.item.Name}</h2>
						<p>
							Count: {this.state.item.Count} | Weight: {this.state.item.Weight}
						</p>
						<p>
							Cost: {this.state.item.Cost} {this.state.item.Currency}
						</p>
					</div>
				) : null}
				{/* <div className="merchantPending">
					<h2 className="woodSign">Pending</h2>
					{this.state.merchantPending.map((item) => (
						<div
							onClick={() => this.handleRemoveFromPending(item.Name)}
							className="merchantItem"
							key={item.Name}
						>
							{item.Name} | Quantity: {item.Count}
						</div>
					))}
					<h3 className="woodSign">
						Total:
						{this.state.pendingCP > this.state.yourCP ? (
							<span className="red">CP: {this.state.pendingCP} </span>
						) : (
							<span>CP: {this.state.pendingCP} </span>
						)}
						|
						{this.state.pendingSP > this.state.yourSP ? (
							<span className="red"> SP: {this.state.pendingSP} </span>
						) : (
							<span> SP: {this.state.pendingSP} </span>
						)}
						|
						{this.state.pendingEP > this.state.yourEP ? (
							<span className="red"> EP: {this.state.pendingEP} </span>
						) : (
							<span> EP: {this.state.pendingEP} </span>
						)}
						|
						{this.state.pendingGP > this.state.yourGP ? (
							<span className="red"> GP: {this.state.pendingGP} </span>
						) : (
							<span> GP: {this.state.pendingGP} </span>
						)}
						|
						{this.state.pendingPP > this.state.yourPP ? (
							<span className="red"> PP: {this.state.pendingPP}</span>
						) : (
							<span> PP: {this.state.pendingPP}</span>
						)}
					</h3>
					{this.state.merchantPending.length > 0 &&
					this.state.pendingCP <= this.state.yourCP &&
					this.state.pendingSP <= this.state.yourSP &&
					this.state.pendingEP <= this.state.yourEP &&
					this.state.pendingGP <= this.state.yourGP &&
					this.state.pendingPP <= this.state.yourPP ? (
						<div onClick={this.handleMerchantPurchase} className="merchantItem">
							Buy
						</div>
					) : null}
                </div> */}

				{/* <div className="merchantPending">
					<h2 className="woodSign">Purchased</h2>
					<h3 className="woodSign">
						Your: CP: {this.state.yourCP} | SP: {this.state.yourSP} | EP: {this.state.yourEP} | GP:{' '}
						{this.state.yourGP} | PP: {this.state.yourPP}
					</h3>
					{this.state.purchased.map((item) => (
						<div className="merchantItem" key={item.Name}>
							{item.Name} | Quantity: {item.Count}
						</div>
					))}
				</div> */}
			</div>
		);
	}
}

export default Merchant;
