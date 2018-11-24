import React from 'react';
import '../App.css';


const Translation = props => {
    if (props.language === "Elvish") {
        return (<div className="Elvish">
            <p>{props.textToTranslate}</p>
        </div>
        )
    }
    else if (props.language === "Dwarven") {
        return (<div className="Dwarven">
            <p>{props.textToTranslate}</p>
        </div>
        )
    }
    else if (props.language === "Draconic") {
        return (<div className="Draconic">
            <p>{props.textToTranslate}</p>
        </div>
        )
    }
    else if (props.language === "Abyssal") {
        return (<div className="Abyssal">
            <p>{props.textToTranslate}</p>
        </div>
        )
    }
    else {
        return (<div>
            You dun broke it...
        </div>
        )
    }
};

export default Translation;