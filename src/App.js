import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import './App.css';

import PlayField from './PlayField/PlayField'
import Profile from './Profile/Profile'
import ControlPanel from './ControlPanel/ControlPanel'

import { newDeck, shuffle, drawOne } from './actions/deckActions'
import { play, nextPlayer, dealerTurn } from './actions/turnActions'
import { flipHand } from './actions/playerActions'
import { takeCard, dealerTakeCard, stand, winBet, loseBet, setInsured, reset } from './actions/playerActions'
import { clearCard } from './actions/deckActions'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    deck: state.deck,
    turn: state.turn,
    player: state.player,
    dealer: state.dealer,
  }
}

const dispatchAll = (dispatch, actions) => {
  actions.map((action) => { return dispatch(action()) })
}

const mapDispatchToProps = (dispatch) => {
  return {
    hitOnClick: () => {
      dispatch(drawOne())
    },
    standOnClick: () => {
      dispatch(stand())
    },
    splitOnClick: () => {
      // Not sure what to do here yet
    },
    doubleDownOnClick: () => {
      dispatch(drawOne())
      dispatch(flipHand())
      dispatch(dealerTurn())
    },
    buyInsuranceOnClick: () => {
      dispatch(setInsured())
    },

    winBet: (xBlackjack) => {
      dispatch(winBet(xBlackjack))
    },
    loseBet: () => {
      dispatch(loseBet())
    },
    dealerTurn: () => {
      dispatch(dealerTurn())
      dispatch(flipHand())
    },
    drawOne: () => {
      dispatch(drawOne())
    },
    nextPlayer: () => {
      dispatch(nextPlayer())
    },
    dealOnClick: () => {
      dispatchAll(dispatch, [reset, play, newDeck, shuffle])
    },
    keepDealing: () => {
      dispatchAll(dispatch, [drawOne, nextPlayer])
    },
    giveCard: (card) => {
      dispatch(takeCard(card))
    },
    giveDealerCard: (card) => {
      dispatch(dealerTakeCard(card))
    },
    clearCard: () => {
      dispatch(clearCard())
    },
    reset: () => {
      dispatch(reset())
    },
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><div className="App-logo"></div>React-Jack</h1>
        </header>
        <Container>
          <Row>
            <Col xs="2" lg="3">
              <Profile { ...this.props.player} />
            </Col>
            <Col xs="8" lg="6">
              <PlayField className { ...this.props} />
            </Col>
            <Col xs="2" lg="3">
              <ControlPanel { ...this.props} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
