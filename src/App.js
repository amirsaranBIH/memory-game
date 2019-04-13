import React, { Component } from 'react';
import Card from './Card';
import WinModal from './WinModal'

class App extends Component {
  state = {
    numberOfCards: 36,
    cards: [],
    currentFlippedCards: [],
    clickable: true,
    hasWon: false
  }

  // Creates all cards and shuffles them randomly
  createCards = () => {
    let numOfCards = this.state.numberOfCards;
    let cards = [];

    for (let i = 0; i < numOfCards; i++) {
      let imgId = i % (numOfCards / 2);

      cards.push({
        id: i,
        img: 'card' + imgId,
        state: 'hidden'
      });
    }

    // Shuffles the cards
    for (let i = 0; i < numOfCards * 2; i++) {
      let rand = Math.floor(Math.random() * numOfCards);
      let card = cards[rand];

      cards.splice(rand, 1);
      cards.unshift(card);
    }

    this.setState({
      cards
    });
  }

  componentDidMount = () => {
    this.createCards();
  }

  // Handles click event on card
  handleClick = (e, card) => {
    if (this.state.clickable && card.state !== 'found' && card.state !== 'flipped') {
      this.changeCardState(card, 'flipped');

      // Disables the click to prevent spam
      this.setState({ clickable: false });

      // Adds flipped card to list of flipped cards
      let currentFlippedCards = this.state.currentFlippedCards;
      currentFlippedCards.push(card);
      this.setState({ currentFlippedCards });

      if (this.state.currentFlippedCards.length > 1) {
        let cardsMatch = this.state.currentFlippedCards[0].img === this.state.currentFlippedCards[1].img;
        // Determines if cards match and changes card state accordingly
        this.state.currentFlippedCards.forEach(card => {
          setTimeout(() => {
            this.changeCardState(card, (cardsMatch ? 'found' : 'hidden'));

            this.setState({
              currentFlippedCards: [],
              clickable: true
            });

            if (cardsMatch) this.checkIfWon();
          }, 800);
        });
      } else {
        setTimeout(() => {
          this.setState({ clickable: true });
        }, 300);
      }

    }
  }

  // Changes the state in which the card is displayed (hidden, flipped, found)
  changeCardState = (clickedCard, newState) => {
    let cards;
    cards = this.state.cards.map(card => {
      if (card.id === clickedCard.id) {
        card.state = newState;
      }
      return card;
    });

    this.setState({
      cards
    });
  }

  // Check if all cards have status 'found'
  checkIfWon = () => {
    if (this.state.cards.every(card => card.state === 'found')) {
      this.setState({ hasWon: true });
    }
  }

  // Restarts the state (starts new game)
  startNewgame = () => {
    this.setState({
      cards: [],
      currentFlippedCards: [],
      clickable: true,
      hasWon: false
    });

    this.createCards();
  }

  render() {
    return (
      <div>
        <div className="game">
          {this.state.cards.map(card => <Card key={card.id} card={card} onClick={this.handleClick} />)}
        </div>
        {this.state.hasWon ? <WinModal startNewGame={this.startNewgame} /> : null}
      </div>
    );
  }
}

export default App;
