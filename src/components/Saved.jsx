{(this.state.d20 === true)
    ?
    <div>
        <div onClick={this.handled20} className="hexagonBlack"><h2 className="hexagonBlack-text">Close</h2></div>
        <h1 className="header" id="fadeIn">Dungeons and Dragons Game Manager</h1>
    <div className="buttons" id="fadeIn">
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
        {" "}
        <img onClick={this.handleOpenClose} src={require('../assets/npc.png')} alt="sound" />
        {" "}
        <img onClick={this.handleOpenClose} src={require('../assets/town.png')} alt="settlement" />
        {" "}
        <img onClick={this.handleOpenClose} src={require('../assets/npc.png')} alt="character" />
    </div>
    </div>
    : 
    <div>
    <div onClick={this.handled20} className="hexagonBlack"><h2 className="hexagonBlack-text">Open</h2></div>
    <h1 className="header" id="fadeOut">Dungeons and Dragons Game Manager</h1>
    <div className="buttons" id="fadeOut">
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
        {" "}
        <img onClick={this.handleOpenClose} src={require('../assets/npc.png')} alt="sound" />
        {" "}
        <img onClick={this.handleOpenClose} src={require('../assets/town.png')} alt="settlement" />
        {" "}
        <img onClick={this.handleOpenClose} src={require('../assets/npc.png')} alt="character" />
    </div>
    </div>
    }