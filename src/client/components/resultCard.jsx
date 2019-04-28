import React from "react";

const ResultCard = props => {
	return(
		<div className="card card-body">
			<h5 className="card-title">{props.title}</h5>
			<div className="card-text">{props.text}</div>
		</div>
	)
};

export default ResultCard;