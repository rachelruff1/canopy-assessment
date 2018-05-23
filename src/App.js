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
      diamonds: [],
      allQueens: false
    }
  }

  toggleButton() {
    this.setState({
      button: 'false'
    }
    )
  }
  drawCards() {
    const { allQueens, spades, clubs, hearts, diamonds } = this.state;
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(resp => {
        // while (allQueens === false) {
        axios
          .get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=2`)
          .then(resp => {
            console.log(resp.data)

            const card1Suit = resp.data.cards[0].suit;
            const card2Suit = resp.data.cards[1].suit;
            const card1Val = resp.data.cards[0].value;
            const card2Val = resp.data.cards[1].value;
            let spadesArr = [...spades];
            let clubsArr = [...clubs];
            let heartsArr = [...hearts];
            let diamondsArr = [...diamonds];
            console.log(spadesArr, clubsArr, heartsArr, diamondsArr);
            if (card1Suit === 'SPADES') {
              spadesArr.push(card1Val)
            }
            else if (card1Suit === 'CLUBS') {
              clubsArr.push(card1Val)
            }
            else if (card1Suit === 'HEARTS') {
              heartsArr.push(card1Val)            }
            else {
              diamonds.push(card1Val)
            };
            if (card2Suit === 'SPADES') {
              spadesArr.push(card2Val)
            }
            else if (card2Suit === 'CLUBS') {
              clubsArr.push(card2Val)
            }
            else if (card2Suit === 'HEARTS') {
              heartsArr.push(card2Val)            }
            else {
              diamonds.push(card2Val)
            };
            // console.log(diamondsArr, heartsArr, spadesArr);

            this.setState({
              card1Img: resp.data.cards[0].image,
              card2Img: resp.data.cards[1].image,
              spades: spadesArr,
              clubs: clubsArr,
              hearts: heartsArr,
              diamonds: diamondsArr
            })
          })
        // }
      });
  }

  render() {
    console.log(this.state);
    const { card1Img, card2Img, button, spades, clubs, hearts, diamonds } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Find the Queens</h1>
        </header>
        {card1Img ? <img src={card1Img} alt='no img' /> : null}
        {card2Img ? <img src={card2Img} alt='no img' /> : null}
        < br />
        {button === true ? <button onClick={() => { this.drawCards(); this.toggleButton() }}>Click button to start</button> :
          <ul>
            <h3>Spades:</h3><p>{({ spades }) ? spades.sort() : null}</p>
            <h3>Clubs:</h3><p>{({ clubs }) ? clubs.sort() : null}</p>
            <h3>Hearts:</h3><p>{({ hearts }) ? hearts.sort() : null}</p>
            <h3>Diamonds:</h3><p>{({ diamonds }) ? diamonds.sort() : null}</p>
          </ul>
        }
      </div>
    );
  }
}

export default App;
