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
  this.toggleButton = this.toggleButton.bind(this);
  this.drawCards = this.drawCards.bind(this);
  }

  componentDidMount(){
    axios
    .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(resp => {
      this.drawCards(resp.data.deck_id)
      this.setState({
        deckId: resp.data.deck_id
      });
    })
  }

  toggleButton() {
    this.setState({
      button: 'false'
    }
    )
  }


  drawCards() {
    const { allQueens, deckId, spades, clubs, hearts, diamonds } = this.state;
    let spadesArr = [...spades];
    let clubsArr = [...clubs];
    let heartsArr = [...hearts];
    let diamondsArr = [...diamonds];
    // console.log(deckId)
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then(resp => {
        console.log(resp.data)

        const card1Suit = resp.data.cards[0].suit;
        const card2Suit = resp.data.cards[1].suit;
        const card1Val = resp.data.cards[0].value;
        const card2Val = resp.data.cards[1].value;
     
        console.log(spadesArr, clubsArr, heartsArr, diamondsArr);
        if (card1Suit === 'SPADES') {
          spadesArr = [...spadesArr, card1Val]
        }
        else if (card1Suit === 'DIAMONDS') {
          diamondsArr = [...diamondsArr, card1Val]
        }
        else if (card1Suit === 'CLUBS') {
          clubsArr = [...clubsArr, card1Val]
        }
        else if (card1Suit === 'HEARTS') {
          heartsArr = [...heartsArr, card1Val]
        }
        else null;
        if (card2Suit === 'SPADES') {
          spadesArr = [...spadesArr, card2Val]
        }
        else if (card2Suit === 'DIAMONDS') {
          diamondsArr.push(card2Val)
        }
        else if (card2Suit === 'CLUBS') {
          clubsArr.push(card2Val)
        }
        else if (card2Suit === 'HEARTS') {
          heartsArr.push(card2Val)
        }
        else null;

        this.setState({
          card1Img: resp.data.cards[0].image,
          card2Img: resp.data.cards[1].image,
          spades: spadesArr,
          clubs: clubsArr,
          hearts: heartsArr,
          diamonds: diamondsArr,
          allQueens: queenCount
        })
    
        let sQueen = false;
        spadesArr.map(x => x === 'QUEEN' ? sQueen = true : null);
        let cQueen = false;
        clubsArr.map(x => x === 'QUEEN' ? cQueen = true : null);
        let hQueen = false;
        heartsArr.map(x => x === 'QUEEN' ? hQueen = true : null);
        let dQueen = false;
        diamondsArr.map(x => x === 'QUEEN' ? dQueen = true : null);
        
        console.log(sQueen, cQueen, hQueen, dQueen);

        let queenCount = (sQueen === true && cQueen === true && hQueen === true && dQueen === true) ? true : false;

        console.log(queenCount);
        (queenCount === false) ? this.drawCards() : Swal('DONE!');

      })
      
    

  };




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
        {/* <button onClick={() => Swal('hi')}>Swal</button> */}
      </div>
    );
  }
}

export default App;