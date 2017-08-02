import React, { Component } from 'react';
import Report from './Report';
import './App.css';

const data = "\r<br /><span class=\"mark\"><span data-show-mark-popup=\"1\"\n id=\"wr-mark-0\"\n class=\"wr-mark-code\"\n>1</span><span class=\"wr-mark-text\">Oline</span></span> Bike-Sharing\r<br />Recently, online bike-sharing emerges all of a sudden. Bikes in yellow, white and green can be seen almost everywhere on the street. As we all know, it is normal that a new thing appears always with advantages and <span class=\"mark\"><span data-show-mark-popup=\"1\"\n id=\"wr-mark-1\"\n class=\"wr-mark-code\"\n>2</span><span class=\"wr-mark-text\">disadvantage</span></span><span>.Therefore, people have their own opinions on this phenomenon. As far as I am concerned, what is the most important is that we should keep its</span><span class=\"mark\"><span data-show-mark-popup=\"2\"\n id=\"wr-mark-2\"\n class=\"wr-mark-code\"\n>3</span><span class=\"wr-mark-text\">merits </span></span>and improve its demerits.Indeed, online bike-sharing brings some advantages to our lives. First, it brings green and healthy life. With the shared bikes appearing, more and more people are willing to ride bikes rather than driving their cars if the</span>";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id, text, editType) {
    this.setState({
      id: id,
      text: text,
      editType: editType,
    })
  }

  render() {
    return (
      <div className="App">
        <Report
          html={data}
          cb={this.handleChange}
        />
      </div>
    );
  }
}

export default App;
