import React, { Component } from "react";
import Input from "../components/input";
import Button from "../components/button";
import Select from "../components/select";
import ResultCard from "../components/resultCard";



class FormContainer extends Component {
	constructor(props) {
    super(props);

    this.state = {

      //states for criteria 
      criteria: {
        people: "",
        genres: "",
        release: "",
        language: "",
      },

      //states for selectin year of release and language
      releaseYear:["2019", "2018", "2017", "2016", "2015"],
      languages: ["en", "pl"],

      //states for selected movie
      movieInfo:{
        title:"Don't you know what to watch? ",
        overview:"Write your criteria and we select some movie for you"
      }

    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
   }

    handleFormSubmit(e) {
      e.preventDefault();
      let criteria = this.state.criteria;

      fetch("/api/getUsername", {
        method: "POST",
        body: JSON.stringify(criteria),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        response.json().then(data => {
          this.setState({
            movieInfo:{
              title:data.title,
              overview:data.overview
            }
          });
        });
      });
    }

    handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        criteria: {
          ...prevState.criteria,
          [name]: value
        }
      }),
      () => console.log(this.state.criteria)
    );
  }

  render() {
    return (
      <div >
      	<form action="/" method ="post" className="container-fluid FormContainer" onSubmit={this.handleFormSubmit}>
	    {/*choosing people: actors, director rtc.*/}
	      <Input
			id={"people_container"} 	
	        inputType={"text"}
	        title={"Choose the people"}
	        name={"people"}
	        value={this.state.criteria.people}
	        handleChange={this.handleInput}
	        />{" "}
		{/*Choosing the genres*/}
		  <Input
			id={"genres_container"} 	
	        inputType={"text"}
	        title={"Choose genre"}
	        name={"genres"}
	        value={this.state.criteria.genres}
	        handleChange={this.handleInput}
	        />{" "}

	    {/*Choosing the year of release*/}
	       <Select
	          title={"Choose year of release"}
	          name={"release"}
	          options={this.state.releaseYear}
	          value={this.state.criteria.release}
	          handleChange={this.handleInput}
	        />{" "}
	    {/*Choosing the year of language*/}
	        <Select
	          title={"Choose a language"}
	          name={"language"}
	          options={this.state.languages}
	          value={this.state.criteria.language}
	          handleChange={this.handleInput}
	        />{" "}
	    {/*Sending criteria*/}
	         <Button
	          action={this.handleFormSubmit}
	          type={"btn btn-dark"}
	          title={"Look for the movie!"}
	        />{" "}
    	</form>
      {/*Showing a result*/}
        <ResultCard 
          title={this.state.movieInfo.title}
          text={this.state.movieInfo.overview}
        />

      </div>
    );
  };
};

export default FormContainer;