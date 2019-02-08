import React, { Component } from 'react';
import WeaponsList from '../assets/Json/WeaponsList';
import Equipment from '../assets/Json/Equipment';
import EquipmentPacks from '../assets/Json/EquipmentPacks';
import TradeGoods from '../assets/Json/TradeGoods';
import Mounts from '../assets/Json/Mounts';
import TackHarnessVehicle from '../assets/Json/Tack-Harness-Vehicle';
import Ships from '../assets/Json/Ships';

class Merchant extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            vendorEquipment: Equipment,
            vendorWeapons: WeaponsList,
            vendorTradeGoods: TradeGoods,
            vendorMounts: Mounts,
            vendorTackHarnessVehicle: TackHarnessVehicle,
            vendorShips: Ships,
            // vendorEquipment: [],
            // vendorWeapons: [],
            // vendorTradeGoods: [],
            // vendorMounts: [],
            // vendorTackHarnessVehicle: [],
            // vendorShips: [],
        }
        this.handleMerchantEquipment = this.handleMerchantEquipment.bind(this);
        this.handleRemoveFromPending = this.handleRemoveFromPending.bind(this);
        this.handleMerchantPurchase = this.handleMerchantPurchase.bind(this);
        this.handleVendorSections = this.handleVendorSections.bind(this);
    }

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

    render() {
        return (
            <div className={this.props.display}>
                <div className="merchantOptions">
                    {(this.state.vendorSections[0] === true)
                        ?
                        <div>
                            <h2 onClick={this.handleVendorSections} className="woodSign">Items</h2>
                            {this.state.vendorEquipment.map(item => (
                                <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name} value={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/box-full.svg')} alt="item" />{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.</div>
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
                                <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/balance-scale-left.svg')} alt="item" />{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | {item.Weight} lbs.</div>
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
                                <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/horse.svg')} alt="item" />{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | Carry Weight: {item.CarryingCapacity} | Walking Speed: {item.Speed}</div>
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
                                <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/horse-head.svg')} alt="item" />{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | Weight: {item.Weight}</div>
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
                                <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/ship.svg')} alt="item" />{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | Swimming Speed: {item.Speed} Mph</div>
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
                                <div onClick={() => this.handleMerchantEquipment(item)} className="merchantItem" key={item.Name}><img height="20px" width="20px" src={require('../assets/fontawesome-pro-5.6.3-web/svgs/light/axe-battle.svg')} alt="item" />{" "}{item.Name} | Cost: {item.Cost} {item.Currency} | DMG: {item.Damage} | {item.Damage_Type}</div>
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
        )
    }
}

export default Merchant;