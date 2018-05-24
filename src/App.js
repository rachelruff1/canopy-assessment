import React, { Component } from 'react';
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
    this.newDeck = this.newDeck.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.drawCards = this.drawCards.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    this.newDeck()
  }

  newDeck() {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(resp => {
        this.setState({
          deckId: resp.data.deck_id
        });
      })
  }
  toggleButton() {
    this.setState({
      button: (!this.state.button)
    }
    )
  }


  drawCards() {
    const { deckId, spades, clubs, hearts, diamonds } = this.state;
    let spadesArr = [...spades];
    let clubsArr = [...clubs];
    let heartsArr = [...hearts];
    let diamondsArr = [...diamonds];

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
          diamonds: diamondsArr
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
        (queenCount === false) ? setTimeout(() => { this.drawCards() }, 1000) : Swal('Queens found!');
      })
  };

  shuffle() {
    this.newDeck();
    this.toggleButton();
    this.setState({
      card1Img: '',
      card2Img: '',
      spades: [],
      clubs: [],
      hearts: [],
      diamonds: []
    })
  }


  render() {
    console.log(this.state);
    const { card1Img, card2Img, button, spades, clubs, hearts, diamonds } = this.state;

    let spadesFinal = () => {
      let sSort = spades.sort();
      function sorter(a, b) {
        return a - b;
      }
      sSort.sort(sorter);
      let sCombo = sSort.filter(x => x !== 'ACE' && x !== 'KING');
      spades.map(x => { x === 'ACE' ? sCombo.unshift(x) : null; x === 'KING' ? sCombo.push(x) : null })
      return sCombo;
    }

    let clubsFinal = () => {
      let cSort = clubs.sort();
      function sorter(a, b) {
        return a - b;
      }
      cSort.sort(sorter);
      let cCombo = cSort.filter(x => x !== 'ACE' && x !== 'KING');
      clubs.map(x => { x === 'ACE' ? cCombo.unshift(x) : null; x === 'KING' ? cCombo.push(x) : null })
      return cCombo;
    }

    let heartsFinal = () => {
      let hSort = hearts.sort();
      function sorter(a, b) {
        return a - b;
      }
      hSort.sort(sorter);
      let hCombo = hSort.filter(x => x !== 'ACE' && x !== 'KING');
      hearts.map(x => { x === 'ACE' ? hCombo.unshift(x) : null; x === 'KING' ? hCombo.push(x) : null })
      return hCombo;
    }

    let diamondsFinal = () => {
      let dSort = diamonds.sort();
      function sorter(a, b) {
        return a - b;
      }
      dSort.sort(sorter);
      let dCombo = dSort.filter(x => x !== 'ACE' && x !== 'KING');
      diamonds.map(x => { x === 'ACE' ? dCombo.unshift(x) : null; x === 'KING' ? dCombo.push(x) : null })
      return dCombo;
    }

    return (
      <div className="App">
      <div className='content-container'>
        <h1 className="App-title">♣ ♦ FIND THE QUEENS ♥ ♠</h1>
        <div className='card-container'>
          {card1Img ? <img src={card1Img} alt='no img' /> : null}
          {card2Img ? <img src={card2Img} alt='no img' /> : null}
        </div>

        {button === true ? <div className='buttons'><button onClick={() => { this.drawCards(); this.toggleButton(); }}>Click button to start</button></div> :
          <ul className='suits-container'>
            <h3>Spades:</h3><p>{`[${spadesFinal()}]`}</p>
            <h3>Clubs:</h3><p>{`[${clubsFinal()}]`}</p>
            <h3>Hearts:</h3><p>{`[${heartsFinal()}]`}</p>
            <h3>Diamonds:</h3><p>{`[${diamondsFinal()}]`}</p>
          </ul>
        }
        <div className='buttons'>
          {(button) ? null : <button onClick={() => this.shuffle()}>Shuffle Deck</button>}</div>
      </div>
      </div>
    );
  }
}

export default App;