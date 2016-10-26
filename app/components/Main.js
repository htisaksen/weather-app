import React from 'react';
import { Link } from 'react-router'

const styles = {
	nav: {
		background: "linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)",
	},
	fontColor: {
		color: "white",
	},
  logo: {
		paddingLeft: "15px",
	  color: "white",
	  fontWeight: "1.5em",
	  fontSize: "1.5em"
	},
	back: {
		color: "white",
	  fontWeight: "1.5em",
	  fontSize: "1.5em"
	}
};

const Main = React.createClass({
	render(){
		return (
			<div>
				<nav>
				  <div
				  	className="nav-wrapper"
				  	style = {styles.nav}>
            <Link
				  		to='/'
				  		style={styles.logo}>
              Digital Meteorologist
				  	</Link>
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li>
								<Link
									to='/'
									style={styles.back}>
									Back
								</Link>
							</li>
						</ul>
				  </div>
				</nav>
				{React.cloneElement(this.props.children, this.props)}
			</div>
		)
	}
});

export default Main;
