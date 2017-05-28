import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'

/* eslint-disable */

function SearchResult(props){
    var results = [];
    console.log("props ar", props);
    props.data.map(function(row, i){
       console.log("in row ", row);
       results.push(<li className="resultView" key={i} ><a href={row.page}>{row.title}</a><p>{row.body}</p></li>);
    });
    return (
      <div>
       {results}
      </div>
    );
    return null;
}


class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {data : []};
    this.page = 'https://en.wikipedia.org/?curid=';
    this.cb =  '&callback=callbackjsonp';
    this.results = [];
  }

  callbackjsonp = (data) => {
     console.log("data is", data); 
  };

  handleSearch = (event) => {
     if(event.key == 'Enter'){
       console.log('enter press here! ', event.target.value);
       var self = this;
       self.results = []; 
       $.ajax({
         url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + event.target.value + self.cb, 
         jsonp: "callback",
         jsonpCallback: "callbackjsonp",
         method: 'GET',
         dataType: "jsonp",
         success: function( response ) {
            console.log( response );
            Object.keys(response.query.pages).forEach(function(key) {
              self.results.push({title: response.query.pages[key].title, body: response.query.pages[key].extract, page: self.page +  response.query.pages[key].pageid});
              self.setState({data:self.results});
       
           });
         }
       });
     }
   
  };

  render() {
    return (
        <div className="mainwiki">
           <a className="link" href="https://en.wikipedia.org/wiki/Special:Random" >Click here for random article </a>
           <br/>
           <br/>
           <input type="text" name="search" placeholder="Search.." onKeyPress={this.handleSearch}></input>
           <SearchResult data={this.state.data} />
        </div>
     );
  }
}

export default App;
