import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import * as ReactBootstrap from 'react-bootstrap';
//import $ from 'jquery';
/* eslint-disable */



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};

    this.onChange = this.onChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.firstList = [];
    this.secondList = [];
    this.operationList = [];
    this.firstValue = '';
    this.secondValue = '';
    this.checkList = false;
    this.value = '';
    this.operation = '';
    this.multipleEqualTo = false;
    this.result = '';
  }

  handleButton = (event) => {
    //console.log("el is", event.target.value);
    this.value = event.target.value
    if (this.value === '=' && this.multipleEqualTo === false && this.firstList.length !== 0 && this.secondList.length !== 0){
        this.firstValue = this.firstList.join('');
        console.log("first val", this.firstValue);
        this.secondValue = this.secondList.join('');
        console.log("calculate result ", this.firstValue, this.operation, this.secondValue);
        this.result = parseFloat(this.firstValue, 10) + this.operation + parseFloat(this.secondValue, 10); 
        this.firstList = [];
        this.operationList = [];
        this.secondList = [];
        this.multipleEqualTo = true;
        this.firstList.push(eval(this.result));
        this.setState({value: eval(this.result)});
    }
    else if(this.value === 'AC'){
        this.firstList = [];
        this.operationList = [];
        this.secondList = [];
        this.multipleEqualTo = false;
        this.checkList = false;
        this.setState({value: 0});
    
    }else{
       if (this.value ===  '+' || this.value === '/' || this.value === '-' || this.value === '*') {
          if(this.operationList.length === 0 && this.firstList.length !== 0){
             this.operationList.push(this.value);
             this.checkList = true;
             this.operation = this.value;
             this.multipleEqualTo = false;
             this.setState({value: this.value});
          }
       }else{
          if (this.checkList === true && this.value !== '='){
              console.log("second list ", this.secondList.join(''));
              this.secondList.push(this.value);
              this.multipleEqualTo = false;
              if (this.secondList.join('').length < 8 ){
                 this.setState({value: this.secondList.join('')});
              }
          }else{
              if (this.value !== '='){
                 this.firstList.push(this.value);
                 this.multipleEqualTo = false;
                 if (this.firstList.join('').length < 8 ){
                    console.log("first list ", this.firstList.join(''));
                    this.setState({value: this.firstList.join('')});
                 }
              }
          }
       }
     }
  };


  render() {
    return (
      <div className="calcMain">
        <div className="title">
          <h6><strong>ELECTRONIC CALCUATOR</strong></h6>
        </div>
        <div className="text">
           <input type="text" size="28" value={this.state.value} width="28" readOnly/>
        </div>
        <div className="buttons" onClick={this.handleButton}>
          <button className="red" type="button" value='AC'>AC</button>
          <button value='/'>&divide;</button>
          <button value='*'>x</button>

          <button value='7'>7</button>
          <button value='8'>8</button>
          <button value='9'>9</button>
          <button value='-'>-</button>

          <button value='4'>4</button>
          <button value='5'>5</button>
          <button value='6'>6</button>
          <button value='+'>+</button>


          <button value='1'>1</button>
          <button value='2'>2</button>
          <button value='3'>3</button>
          <button className='invisible'>N</button>

          <button id='zeroButton' value='0' >0</button>
          <button value='.'>.</button>
          <button id='equalButton' value='='>=</button>
        </div>
      </div>
    );
  }
}

export default App;
