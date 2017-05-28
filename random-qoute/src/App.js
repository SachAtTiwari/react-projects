import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'


class App extends Component {
  constructor(props) {
    super(props);
    console.log("in const");
    this.newQuote = this.newQuote.bind(this);
    this.state = {data : [{quote:" ", author:" " }]};
    this.results = [];
    var self = this;
    $.ajax({                                                                                                                                                                               
      url: "http://quotes.stormconsultancy.co.uk/quotes/random.json?callback=callbackjsonp",
      jsonp: "callback",
      jsonpCallback: "callbackjsonp",
      method: 'GET',
      dataType: "jsonp",
      success: function( response ) {
         self.results = [];
         self.results.push({quote:response.quote, author:response.author});
         self.setState({data:self.results}); 
         $('#tweet-it').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + response.quote + '" ' + response.author));
      }
    });

  }

  callbackjsonp = (data) => {
     console.log("data is", data);
  };
  
  newQuote = (event) => {
     console.log("in new quote");
     var self = this;
     $.ajax({
       url: "http://quotes.stormconsultancy.co.uk/quotes/random.json?callback=callbackjsonp",
       jsonp: "callback",
       jsonpCallback: "callbackjsonp",
       method: 'GET',
       dataType: "jsonp",
       success: function( response ) {
          self.results = [];
          self.results.push({quote:response.quote, author:response.author});
          self.setState({data:self.results}); 
          $('#tweet-it').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + response.quote + '" ' + response.author));
       }
     });
  };
  
  render() {
    return (
      <div className="main-quote-box">
        <div className="quote-box">
          <i className="fa fa-quote-left fa-1x quote" aria-hidden="true"></i>
          <p className="quote-text" >{this.state.data[0].quote}</p>
        </div>
         <p className="author-text" >{this.state.data[0].author}</p>
          <a href="#" className="button" id="tweet-it" title="Tweet it!" target="_blank">
              <i className="fa fa-twitter-square fa-3x icon" aria-hidden="true"></i></a>
          <button className="buttonText" onClick={this.newQuote}> New quote </button>
      </div>
    );
  }
}

export default App;
