import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Swal from 'sweetalert2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
      deckId: '',
      card1Img: '',
      card2Img: '',
      spades: [],
      clubs: [],
      hearts: [],
      diamonds: []
    }
  }

  toggleButton(){
    this.setState({
      button: 'false'}
    )
  }
  drawCards() {
    const { deckId } = this.state;
    
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(resp => {
        axios
        .get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=2`)
        .then(resp => {
          console.log(resp.data)
          this.setState({
            card1Img: resp.data.cards[0].image,
            card2Img: resp.data.cards[1].image
          })
        })
      });
  }

  render() {
    console.log(this.state);
    const {card1Img, card2Img, button} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Find the Queens</h1>
        </header>
        {card1Img ? <img src={card1Img} alt='no img'/> : null}
        {card2Img ? <img src={card1Img} alt='no img'/> : null}
        < br/>
        {button === true ? <button onClick={() => {this.drawCards(); this.toggleButton()}}>Click button to start</button> : null}
      </div>
    );
  }
}

export default App;
