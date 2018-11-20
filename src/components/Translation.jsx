import React from 'react';
import '../App.css';


const Translation = props => {
    if (props.language === "Elvish") {
        return (<div className="Elvish">
            {props.textToTranslate}
        </div>
        )
    }
    else if (props.language === "Dwarven") {
        return (<div className="Dwarven">
            {props.textToTranslate}
        </div>
        )
    }
    else if (props.language === "Draconic") {
        return (<div className="Draconic">
            {props.textToTranslate}
        </div>
        )
    }
    else if (props.language === "Abyssal") {
        return (<div className="Abyssal">
            {props.textToTranslate}
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