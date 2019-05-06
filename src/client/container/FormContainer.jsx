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
      genres:[],
      releaseYear:[],
      languages: [],

      //states for selected movie
      movieInfo:{
        title:"Don't you know what to watch? ",
        overview:"Write your criteria and we select some movie for you"
      }

    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
   }

    componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(data => {
        this.setState({
          releaseYear:data.yearsList,
          languages:data.languagesList,
          genres:data.genresList
        });
      });
    }


    handleFormSubmit(e) {
      e.preventDefault();
      let criteria = this.state.criteria;

      fetch("/api", {
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
	        type="text"
	        title={"Choose the people"}
	        name={"people"}
	        value={this.state.criteria.people}
	        onChange={this.handleInput}
	        />{" "}
          {/*Choosing the genres*/}
         <Select
            title={"Choose genre"}
            name={"genres"}
            options={this.state.genres}
            value={this.state.criteria.genres}
            onChange={this.handleInput}
          />{" "}

	    {/*Choosing the year of release*/}
	       <Select
	          title={"Choose year of release"}
	          name={"release"}
	          options={this.state.releaseYear}
	          value={this.state.criteria.release}
	          onChange={this.handleInput}
	        />{" "}
	    {/*Choosing the year of language*/}
	        <Select
	          title={"Choose a language"}
	          name={"language"}
	          options={this.state.languages}
	          value={this.state.criteria.language}
	          onChange={this.handleInput}
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