import React, { Component } from 'react';
import Translation from './Translation';

class TransDiv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            language: "Elvish",
            displayTranslation: false,
            textToTranslate: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTranslate = this.handleTranslate.bind(this);
        this.handleTranslateClose = this.handleTranslateClose.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
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
    };

    render() {
        return(
            <div className={this.props.display} id="translation">
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
        )
    }
}

export default TransDiv;