import React from 'react'

const Home = props => {
	if (props.user) {
		return (
			<div className="Home">
			<br/>
				Welcome to DnD Game Manager!
			</div>
		)
	} else {
		return (
			<div className="Home">
			<br/>
				Welcome to DnD Game Manager!
			</div>
		)
	}
}

export default Home;
