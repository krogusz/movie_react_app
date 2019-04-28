import React from 'react';
import ReactDOM from 'react-dom';
import MainContainer from "./container/mainContainer";
import Navbar from "./components/navbar";

import './app.css';


ReactDOM.render(<MainContainer />, document.getElementById('root'));
ReactDOM.render(<Navbar />, document.getElementById('navbar'));
