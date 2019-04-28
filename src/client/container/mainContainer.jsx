import React, { Component } from "react";
import FormContainer from "./FormContainer";

class MainContainer extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
				<div className="container">
					<FormContainer />
				</div>
		);
	};
};

export default MainContainer;

