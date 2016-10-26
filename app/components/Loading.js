import React from 'react';

const styles = {
  myContainer: {
    minHeight: "100vh",
  }
};

function Loading(props){
	return(
		<div
			style={styles.myContainer}
			className="container">
					<div className="row">
						<h1 className="col s12 center">
							Loading
						</h1>
					</div>
					<div className="row">
						<div className="progress col s12 m6 offset-m3">
		      		<div className="indeterminate">
		      		</div>
		  			</div>
					</div>
		</div>
	)
}

module.exports = Loading;
